import uuid

from django.db import models
from django.db.models import Sum, Value, Q
from django.db.models.functions import Coalesce

from fish.models import FishVariant


class Pirate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    sot_rat = models.TextField()
    last_sync = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return f"{self.name}"

    @property
    def progress(self):
        all_variants = (
            FishVariant.objects
            .annotate(sold=Coalesce(
                Sum("progress_manager__sold", filter=Q(progress_manager__pirate=self)),
                Value(0),
            ))
            .values("id", "sold")
        )

        return {str(v["id"]): v["sold"] for v in all_variants}


class Progress(models.Model):
    pirate = models.ForeignKey(to=Pirate, on_delete=models.CASCADE, related_name="progress_manager")
    fish_variant = models.ForeignKey(to=FishVariant, on_delete=models.CASCADE, related_name="progress_manager")
    sold = models.PositiveIntegerField()

    class Meta:
        unique_together = [("pirate", "fish_variant")]

    def __str__(self):
        return f"{self.pirate} <-- {self.sold}/{self.fish_variant.limit} --> {self.fish_variant}"
