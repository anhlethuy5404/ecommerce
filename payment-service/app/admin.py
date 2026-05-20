from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("invoice_id", "user_id", "order_id", "amount", "method", "status", "created_at")
    list_filter = ("method", "status")
    search_fields = ("invoice_id", "user_id", "order_id")
