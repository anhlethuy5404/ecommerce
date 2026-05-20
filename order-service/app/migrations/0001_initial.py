from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order_id", models.CharField(max_length=64, unique=True)),
                ("user_id", models.CharField(max_length=128)),
                ("items", models.JSONField()),
                ("subtotal", models.PositiveIntegerField()),
                ("shipping_method", models.CharField(max_length=64)),
                ("shipping_price", models.PositiveIntegerField()),
                ("payment_method", models.CharField(max_length=32)),
                ("total", models.PositiveIntegerField()),
                ("status", models.CharField(default="pending", max_length=32)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
