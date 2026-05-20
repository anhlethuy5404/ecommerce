import json

from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import ShippingMethod


def shipping_options(request):
    if request.method != "GET":
        return HttpResponseNotAllowed(["GET"])

    methods = ShippingMethod.objects.filter(active=True)
    return JsonResponse({"options": [method.to_dict() for method in methods]})


def shipping_method_detail(request, code):
    try:
        method = ShippingMethod.objects.get(code=code, active=True)
    except ShippingMethod.DoesNotExist:
        return JsonResponse({"detail": "Shipping method not found"}, status=404)

    if request.method != "GET":
        return HttpResponseNotAllowed(["GET"])

    return JsonResponse(method.to_dict())


@csrf_exempt
def shipping_cost(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")

    code = payload.get("code")
    if not code:
        return HttpResponseBadRequest("Field 'code' is required")

    try:
        method = ShippingMethod.objects.get(code=code, active=True)
    except ShippingMethod.DoesNotExist:
        return JsonResponse({"detail": "Shipping method not found"}, status=404)

    return JsonResponse({
        "code": method.code,
        "price": method.price,
        "estimated_days": method.estimated_days,
        "total": method.price,
    })
