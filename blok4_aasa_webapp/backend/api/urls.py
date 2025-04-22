from django.urls import path
from .views import hello_world, test_1

urlpatterns = [
    path('hello/', hello_world),
    path('test1/', test_1)
]