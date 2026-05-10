from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render, redirect
from django.http import Http404

ROLE_TEMPLATES = {
    "admin": "app/login_admin.html",
    "user": "app/login_user.html",
}


def home(request):
    return render(request, "app/home.html")


def login_view(request, role):
    if role not in ROLE_TEMPLATES:
        raise Http404("Role not found")

    if request.user.is_authenticated:
        return redirect("dashboard")

    form = AuthenticationForm(request, data=request.POST or None)
    message = None

    if request.method == "POST" and form.is_valid():
        user = form.get_user()
        if role == "admin" and not user.is_staff:
            message = "Tài khoản này không có quyền admin."
        elif role == "user" and user.is_staff:
            message = "Tài khoản này không có quyền user."
        else:
            login(request, user)
            return redirect("dashboard")

    return render(
        request,
        ROLE_TEMPLATES[role],
        {"form": form, "role": role, "message": message},
    )


@login_required
def dashboard(request):
    role = "admin" if request.user.is_staff else "user"
    return render(request, "app/dashboard.html", {"role": role})


def logout_view(request):
    logout(request)
    return redirect("home")


@csrf_exempt
@require_http_methods(["POST"])
def api_login(request):
    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except ValueError:
        payload = {}

    role = payload.get("role")
    username = payload.get("username")
    password = payload.get("password")

    if role not in ROLE_TEMPLATES:
        return JsonResponse({"success": False, "message": "Role not found."}, status=400)

    form = AuthenticationForm(request, data={"username": username, "password": password})
    if form.is_valid():
        user = form.get_user()
        if role == "admin" and not user.is_staff:
            return JsonResponse({"success": False, "message": "This account is not an admin."}, status=403)
        if role == "user" and user.is_staff:
            return JsonResponse({"success": False, "message": "This account is not a regular user."}, status=403)
        login(request, user)
        return JsonResponse({"success": True, "role": role, "username": user.username})

    return JsonResponse({"success": False, "message": "Invalid username or password."}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def api_logout(request):
    logout(request)
    return JsonResponse({"success": True})


@login_required
def api_me(request):
    role = "admin" if request.user.is_staff else "user"
    return JsonResponse({"success": True, "username": request.user.username, "role": role})


@csrf_exempt
@require_http_methods(["POST"])
def api_signup(request):
    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except ValueError:
        payload = {}

    role = payload.get("role")
    username = payload.get("username")
    password = payload.get("password")

    if role not in ROLE_TEMPLATES:
        return JsonResponse({"success": False, "message": "Role not found."}, status=400)

    if not username or not password:
        return JsonResponse({"success": False, "message": "Username and password required."}, status=400)

    if len(password) < 6:
        return JsonResponse({"success": False, "message": "Password must be at least 6 characters."}, status=400)

    from django.contrib.auth.models import User

    if User.objects.filter(username=username).exists():
        return JsonResponse({"success": False, "message": "Username already taken."}, status=400)

    user = User.objects.create_user(username=username, password=password)

    if role == "admin":
        user.is_staff = True
        user.is_superuser = False
        user.save()

    login(request, user)
    return JsonResponse({"success": True, "role": role, "username": user.username})
