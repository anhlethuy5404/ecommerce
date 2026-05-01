import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Product


@csrf_exempt
def product_list(request):
    if request.method == "GET":
        products = Product.objects.all().order_by("name")
        return JsonResponse({"products": [product.to_dict() for product in products]})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        name = payload.get("name")
        if not name:
            return HttpResponseBadRequest("Field 'name' is required")

        product = Product.objects.create(
            external_id=payload.get("external_id"),
            name=name,
            category_id=payload.get("category_id"),
            image_url=payload.get("image_url", ""),
            link=payload.get("link", ""),
            ratings=payload.get("ratings", 0),
            no_of_ratings=payload.get("no_of_ratings", 0),
            discount_price=payload.get("discount_price"),
            actual_price=payload.get("actual_price"),
            stock=payload.get("stock", 0),
            short_description=payload.get("short_description", ""),
            description=payload.get("description", ""),
        )
        return JsonResponse(product.to_dict(), status=201)

    return HttpResponseNotAllowed(["GET", "POST"])


def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return JsonResponse({"detail": "Product not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(product.to_dict())

    return HttpResponseNotAllowed(["GET"])
