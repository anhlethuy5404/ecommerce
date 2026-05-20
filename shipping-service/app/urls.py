from django.urls import path

from . import views

urlpatterns = [
    path("", views.shipping_options, name="shipping-options"),
    path("options/", views.shipping_options, name="shipping-options"),
    path("<slug:code>/", views.shipping_method_detail, name="shipping-method-detail"),
    path("cost/", views.shipping_cost, name="shipping-cost"),
]
