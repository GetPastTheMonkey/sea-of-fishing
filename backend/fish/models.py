import uuid

from django.db import models


class Fish(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=20)
    sot_campaign_key = models.CharField(max_length=20, unique=True)
    sot_index = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"


class FishVariant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=20)
    fish = models.ForeignKey(to=Fish, on_delete=models.PROTECT)
    limit = models.PositiveSmallIntegerField()
    sot_index = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = [("fish", "sot_index")]

    def __str__(self):
        return f"{self.fish.name}/{self.name}"


class Pirate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    sot_rat = models.TextField()
    last_sync = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"{self.name}"


class Progress(models.Model):
    pirate = models.ForeignKey(to=Pirate, on_delete=models.CASCADE, related_name="progress_manager")
    fish_variant = models.ForeignKey(to=FishVariant, on_delete=models.CASCADE, related_name="progress_manager")
    sold = models.PositiveIntegerField()

    class Meta:
        unique_together = [("pirate", "fish_variant")]

    def __str__(self):
        return f"{self.pirate} <-- {self.sold}/{self.fish_variant.limit} --> {self.fish_variant}"
