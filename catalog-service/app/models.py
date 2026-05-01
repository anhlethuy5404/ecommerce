from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="subcategories",
    )

    class Meta:
        unique_together = (("parent", "name"),)
        indexes = [models.Index(fields=["name"])]

    def __str__(self):
        return f"{self.parent.name} > {self.name}" if self.parent else self.name

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "parent_id": self.parent_id,
            "children": [child.id for child in self.subcategories.all()],
        }
