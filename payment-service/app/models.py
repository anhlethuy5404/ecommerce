from django.db import models


class Payment(models.Model):
    invoice_id = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=128)
    order_id = models.CharField(max_length=128)
    amount = models.PositiveIntegerField()
    currency = models.CharField(max_length=16, default="VND")
    method = models.CharField(max_length=32)
    status = models.CharField(max_length=32, default="pending")
    metadata = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def to_dict(self):
        return {
            "id": self.pk,
            "invoice_id": self.invoice_id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "amount": self.amount,
            "currency": self.currency,
            "method": self.method,
            "status": self.status,
            "metadata": self.metadata or {},
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
