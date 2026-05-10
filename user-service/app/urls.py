from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("login/admin/", views.login_view, {"role": "admin"}, name="admin_login"),
    path("login/user/", views.login_view, {"role": "user"}, name="user_login"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("logout/", views.logout_view, name="logout"),
    path("api/auth/login/", views.api_login, name="api_login"),
    path("api/auth/logout/", views.api_logout, name="api_logout"),
    path("api/auth/me/", views.api_me, name="api_me"),
    path("api/auth/signup/", views.api_signup, name="api_signup"),
]
