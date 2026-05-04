import json
from pathlib import Path

from django.core.management import BaseCommand

from fish.models import Fish, FishVariant


class Command(BaseCommand):
    def handle(self, *args, **options):
        file = Path(__file__).parent / "fishes.json"

        with open(file) as f:
            fishes = json.load(f)

        for fish_name, fish_data in fishes.items():
            fish, _ = Fish.objects.update_or_create(
                sot_campaign_key=fish_name,
                defaults={
                    "name": fish_data["name"],
                    "sot_index": fish_data["order"],
                },
            )

            self.stdout.write(f"{fish}")

            for variant_data in fish_data["variants"]:
                variant, _ = FishVariant.objects.update_or_create(
                    fish=fish,
                    sot_index=variant_data["index"],
                    defaults={
                        "name": variant_data["name"],
                        "limit": variant_data["limit"],
                    },
                )

                self.stdout.write(f"> {variant}")
