from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Payment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("invoice_id", models.CharField(max_length=64, unique=True)),
                ("user_id", models.CharField(max_length=128)),
                ("order_id", models.CharField(max_length=128)),
                ("amount", models.PositiveIntegerField()),
                ("currency", models.CharField(default="VND", max_length=16)),
                ("method", models.CharField(max_length=32)),
                ("status", models.CharField(default="pending", max_length=32)),
                ("metadata", models.JSONField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
