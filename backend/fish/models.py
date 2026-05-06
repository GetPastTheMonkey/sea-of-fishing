import uuid

from django.db import models


class Fish(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=20)
    sot_campaign_key = models.CharField(max_length=20, unique=True)
    sot_index = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"

    @property
    def variants(self):
        return self.variant_manager.order_by("sot_index")


class FishVariant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=20)
    fish = models.ForeignKey(to=Fish, on_delete=models.PROTECT, related_name="variant_manager")
    limit = models.PositiveSmallIntegerField()
    sot_index = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = [("fish", "sot_index")]

    def __str__(self):
        return f"{self.fish.name}/{self.name}"
