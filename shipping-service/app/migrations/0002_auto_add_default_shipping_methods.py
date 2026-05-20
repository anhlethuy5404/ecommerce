from django.db import migrations


def create_default_shipping_methods(apps, schema_editor):
    ShippingMethod = apps.get_model("app", "ShippingMethod")
    ShippingMethod.objects.bulk_create([
        ShippingMethod(
            code="standard",
            name="Giao tiêu chuẩn",
            price=0,
            estimated_days="2-3",
            description="Giao hàng tiết kiệm trong 2-3 ngày làm việc.",
            active=True,
        ),
        ShippingMethod(
            code="express",
            name="Giao nhanh",
            price=50000,
            estimated_days="1",
            description="Giao hàng trong 1 ngày làm việc.",
            active=True,
        ),
    ])


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_shipping_methods),
    ]
