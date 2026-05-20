from django.contrib import admin

from .models import ShippingMethod


@admin.register(ShippingMethod)
class ShippingMethodAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "price", "estimated_days", "active")
    list_filter = ("active",)
    search_fields = ("code", "name")
