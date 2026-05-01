import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Category


def build_category_tree():
    def node(category):
        return {
            "id": category.id,
            "name": category.name,
            "parent_id": category.parent_id,
            "children": [node(child) for child in category.subcategories.all()],
        }

    roots = Category.objects.filter(parent__isnull=True).order_by("name")
    return [node(category) for category in roots]


def category_list(request):
    if request.method == "GET":
        data = build_category_tree()
        return JsonResponse({"categories": data})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        name = payload.get("name")
        parent_id = payload.get("parent_id")
        if not name:
            return HttpResponseBadRequest("Field 'name' is required")

        parent = None
        if parent_id is not None:
            try:
                parent = Category.objects.get(pk=parent_id)
            except Category.DoesNotExist:
                return HttpResponseBadRequest("Invalid parent_id")

        category = Category.objects.create(name=name, parent=parent)
        return JsonResponse(category.to_dict(), status=201)

    return HttpResponseNotAllowed(["GET", "POST"])


def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return JsonResponse({"detail": "Category not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(category.to_dict())

    return HttpResponseNotAllowed(["GET"])


@csrf_exempt
def categories_root(request):
    return category_list(request)
