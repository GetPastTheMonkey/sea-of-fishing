from django.db import transaction
from django.db.models.functions import Now
from django.utils.text import slugify
from rest_framework import serializers

from fish.models import FishVariant, Fish
from pirate.models import Pirate, Progress
from util.sot_api import load_fishes


class PirateRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pirate
        fields = [
            "name",
            "sot_rat",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fishes = None  # type: dict[str, list[dict[str, int]]] | None

    def validate_name(self, value):
        if Pirate.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"Pirate \"{value}\" already exists")

        return value

    def validate_sot_rat(self, value):
        self.fishes = load_fishes(value)
        return value

    def create(self, validated_data):
        assert self.fishes is not None

        with transaction.atomic():
            pirate = Pirate.objects.create(
                name=validated_data["name"],
                slug=slugify(validated_data["name"]),
                sot_rat=validated_data["sot_rat"],
                last_sync=Now(),
            )

            for key, variants in self.fishes.items():
                try:
                    fish = Fish.objects.get(sot_campaign_key=key)
                except Fish.DoesNotExist:
                    continue

                for var in variants:
                    try:
                        variant = FishVariant.objects.get(
                            fish=fish,
                            sot_index=var["idx"],
                        )
                    except FishVariant.DoesNotExist:
                        continue

                    Progress.objects.create(
                        pirate=pirate,
                        fish_variant=variant,
                        sold=var["val"],
                    )

        return pirate


class PirateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pirate
        fields = [
            "slug",
            "name",
            "last_sync",
            "progress",
        ]
