from django.db import models

# Create your models here.


class Product(models.Model):
    external_id = models.BigIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=500)
    category_id = models.BigIntegerField(null=True, blank=True)
    image_url = models.TextField(blank=True, default="")
    link = models.TextField(blank=True, default="")
    ratings = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    no_of_ratings = models.IntegerField(default=0)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    actual_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.IntegerField(default=0)
    short_description = models.TextField(blank=True, default="")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["name"]), models.Index(fields=["category_id"])]

    def __str__(self):
        return f"{self.id} - {self.name}"

    def to_dict(self):
        return {
            "id": self.id,
            "external_id": self.external_id,
            "name": self.name,
            "category_id": self.category_id,
            "image_url": self.image_url,
            "link": self.link,
            "ratings": float(self.ratings),
            "no_of_ratings": self.no_of_ratings,
            "discount_price": float(self.discount_price) if self.discount_price is not None else None,
            "actual_price": float(self.actual_price) if self.actual_price is not None else None,
            "stock": self.stock,
            "short_description": self.short_description,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
        }
