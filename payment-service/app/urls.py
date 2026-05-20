from django.urls import path

from . import views

urlpatterns = [
    path("", views.payment_list, name="payment-list"),
    path("methods/", views.payment_methods, name="payment-methods"),
    path("<int:pk>/", views.payment_detail, name="payment-detail"),
]
