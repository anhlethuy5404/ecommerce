import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Payment


PAYMENT_METHODS = [
    {"id": "card", "name": "Thẻ tín dụng / thẻ ghi nợ"},
    {"id": "cod", "name": "Thanh toán khi nhận hàng (COD)"},
]


def payment_methods(request):
    if request.method != "GET":
        return HttpResponseNotAllowed(["GET"])
    return JsonResponse({"methods": PAYMENT_METHODS})


@csrf_exempt
def payment_list(request):
    if request.method == "GET":
        user_id = request.GET.get("user_id")
        if not user_id:
            return HttpResponseBadRequest("Query param 'user_id' is required")

        payments = Payment.objects.filter(user_id=user_id)
        return JsonResponse({"payments": [payment.to_dict() for payment in payments]})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        user_id = payload.get("user_id")
        order_id = payload.get("order_id")
        amount = payload.get("amount")
        method = payload.get("method")
        currency = payload.get("currency", "VND")
        metadata = payload.get("metadata", {})

        if not user_id or not order_id or amount is None or not method:
            return HttpResponseBadRequest("Fields 'user_id', 'order_id', 'amount', and 'method' are required")

        if method not in {"card", "cod"}:
            return HttpResponseBadRequest("Unsupported payment method")

        try:
            amount = int(amount)
            if amount < 0:
                raise ValueError
        except (TypeError, ValueError):
            return HttpResponseBadRequest("Field 'amount' must be a positive integer")

        invoice_id = f"PAY-{Payment.objects.count() + 1:06d}"
        status = "completed" if method == "cod" else "pending"

        payment = Payment.objects.create(
            invoice_id=invoice_id,
            user_id=user_id,
            order_id=order_id,
            amount=amount,
            currency=currency,
            method=method,
            status=status,
            metadata=metadata,
        )

        return JsonResponse(payment.to_dict(), status=201)

    return HttpResponseNotAllowed(["GET", "POST"])


@csrf_exempt
def payment_detail(request, pk):
    try:
        payment = Payment.objects.get(pk=pk)
    except Payment.DoesNotExist:
        return JsonResponse({"detail": "Payment not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(payment.to_dict())

    if request.method in ["PUT", "PATCH"]:
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

        status = payload.get("status")
        if status:
            payment.status = status
            payment.save()

        return JsonResponse(payment.to_dict())

    if request.method == "DELETE":
        payment.delete()
        return JsonResponse({"detail": "Payment deleted"}, status=204)

    return HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE"])
