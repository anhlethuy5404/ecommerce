from django.db import models


class CartItem(models.Model):
    user_id = models.CharField(max_length=128)
    product_id = models.CharField(max_length=128)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user_id", "product_id")
        ordering = ["-updated_at"]

    def to_dict(self):
        return {
            "id": self.pk,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
