from django.contrib import admin

from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "user_id", "total", "payment_method", "shipping_method", "status", "created_at")
    list_filter = ("payment_method", "shipping_method", "status")
    search_fields = ("order_id", "user_id")
