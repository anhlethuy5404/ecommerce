from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ShippingMethod",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("code", models.CharField(max_length=64, unique=True)),
                ("name", models.CharField(max_length=128)),
                ("price", models.PositiveIntegerField(default=0)),
                ("estimated_days", models.CharField(max_length=64, default="2-3")),
                ("description", models.TextField(blank=True)),
                ("active", models.BooleanField(default=True)),
            ],
            options={
                "ordering": ["price", "name"],
            },
        ),
    ]
