import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import CartItem


@csrf_exempt
def cart_list(request):
    if request.method == "GET":
        user_id = request.GET.get("user_id")
        if not user_id:
            return HttpResponseBadRequest("Query param 'user_id' is required")

        items = CartItem.objects.filter(user_id=user_id)
        return JsonResponse({"items": [item.to_dict() for item in items]})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        user_id = payload.get("user_id")
        product_id = payload.get("product_id")
        quantity = payload.get("quantity", 1)

        if not user_id or not product_id:
            return HttpResponseBadRequest("Fields 'user_id' and 'product_id' are required")

        try:
            quantity = int(quantity)
            if quantity < 1:
                raise ValueError
        except (TypeError, ValueError):
            return HttpResponseBadRequest("Field 'quantity' must be a positive integer")

        item, created = CartItem.objects.get_or_create(
            user_id=user_id,
            product_id=product_id,
            defaults={"quantity": quantity},
        )
        if not created:
            item.quantity += quantity
            item.save()

        return JsonResponse(item.to_dict(), status=201)

    return HttpResponseNotAllowed(["GET", "POST"])


@csrf_exempt
def cart_detail(request, pk):
    try:
        item = CartItem.objects.get(pk=pk)
    except CartItem.DoesNotExist:
        return JsonResponse({"detail": "Cart item not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(item.to_dict())

    if request.method in ["PUT", "PATCH"]:
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        quantity = payload.get("quantity")
        if quantity is None:
            return HttpResponseBadRequest("Field 'quantity' is required")

        try:
            quantity = int(quantity)
            if quantity < 1:
                raise ValueError
        except (TypeError, ValueError):
            return HttpResponseBadRequest("Field 'quantity' must be a positive integer")

        item.quantity = quantity
        item.save()
        return JsonResponse(item.to_dict())

    if request.method == "DELETE":
        item.delete()
        return JsonResponse({"detail": "Cart item removed"}, status=204)

    return HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE"])
