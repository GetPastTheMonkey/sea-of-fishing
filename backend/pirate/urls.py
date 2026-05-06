from django.urls import path

from pirate import views

urlpatterns = [
    path("register", views.register_pirate),
    path("by-name/<slug:name>", views.get_pirate_by_name),
]
