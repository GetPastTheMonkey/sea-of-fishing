from django.urls import path

from fish import views

urlpatterns = [
    path("list", views.get_fishes_list),
]
