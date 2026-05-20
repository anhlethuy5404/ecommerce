import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Order


@csrf_exempt
def order_list(request):
    if request.method == "GET":
        user_id = request.GET.get("user_id")
        if not user_id:
            return HttpResponseBadRequest("Query param 'user_id' is required")

        orders = Order.objects.filter(user_id=user_id)
        return JsonResponse({"orders": [order.to_dict() for order in orders]})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        user_id = payload.get("user_id")
        items = payload.get("items")
        subtotal = payload.get("subtotal")
        shipping_method = payload.get("shipping_method")
        shipping_price = payload.get("shipping_price")
        payment_method = payload.get("payment_method")
        total = payload.get("total")
        notes = payload.get("notes", "")

        if not user_id or not items or subtotal is None or shipping_method is None or shipping_price is None or payment_method is None or total is None:
            return HttpResponseBadRequest(
                "Fields 'user_id', 'items', 'subtotal', 'shipping_method', 'shipping_price', 'payment_method', and 'total' are required"
            )

        try:
            subtotal = int(subtotal)
            shipping_price = int(shipping_price)
            total = int(total)
        except (TypeError, ValueError):
            return HttpResponseBadRequest("Fields 'subtotal', 'shipping_price', and 'total' must be integers")

        order_id = f"ORD-{Order.objects.count() + 1:06d}"
        order = Order.objects.create(
            order_id=order_id,
            user_id=user_id,
            items=items,
            subtotal=subtotal,
            shipping_method=shipping_method,
            shipping_price=shipping_price,
            payment_method=payment_method,
            total=total,
            notes=notes,
            status="pending",
        )
        return JsonResponse(order.to_dict(), status=201)

    return HttpResponseNotAllowed(["GET", "POST"])


@csrf_exempt
def order_detail(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return JsonResponse({"detail": "Order not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(order.to_dict())

    if request.method in ["PUT", "PATCH"]:
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        status = payload.get("status")
        if status:
            order.status = status
            order.save()

        return JsonResponse(order.to_dict())

    if request.method == "DELETE":
        order.delete()
        return JsonResponse({"detail": "Order deleted"}, status=204)

    return HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE"])
