from django.db import models


class Order(models.Model):
    order_id = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=128)
    items = models.JSONField()
    subtotal = models.PositiveIntegerField()
    shipping_method = models.CharField(max_length=64)
    shipping_price = models.PositiveIntegerField()
    payment_method = models.CharField(max_length=32)
    total = models.PositiveIntegerField()
    status = models.CharField(max_length=32, default="pending")
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def to_dict(self):
        return {
            "id": self.pk,
            "order_id": self.order_id,
            "user_id": self.user_id,
            "items": self.items,
            "subtotal": self.subtotal,
            "shipping_method": self.shipping_method,
            "shipping_price": self.shipping_price,
            "payment_method": self.payment_method,
            "total": self.total,
            "status": self.status,
            "notes": self.notes,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
