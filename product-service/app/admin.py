from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category_id", "external_id", "stock")
    search_fields = ("name", "external_id")
    list_filter = ("category_id",)
