from django.db import models


class ShippingMethod(models.Model):
    code = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=128)
    price = models.PositiveIntegerField(default=0)
    estimated_days = models.CharField(max_length=64, default="2-3")
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["price", "name"]

    def __str__(self):
        return f"{self.name} ({self.code})"

    def to_dict(self):
        return {
            "code": self.code,
            "name": self.name,
            "price": self.price,
            "estimated_days": self.estimated_days,
            "description": self.description,
            "active": self.active,
        }
