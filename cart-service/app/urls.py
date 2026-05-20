from django.urls import path

from . import views

urlpatterns = [
    path("", views.cart_list, name="cart-list"),
    path("<int:pk>/", views.cart_detail, name="cart-detail"),
]
