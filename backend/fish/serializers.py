from rest_framework import serializers

from fish.models import Fish, FishVariant


class FishVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishVariant
        fields = [
            "id",
            "name",
            "limit",
        ]


class FishSerializer(serializers.ModelSerializer):
    variants = serializers.ListSerializer(child=FishVariantSerializer())

    class Meta:
        model = Fish
        fields = [
            "id",
            "name",
            "variants",
        ]
