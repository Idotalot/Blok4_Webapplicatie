from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('test1/', views.test_1),
    path('create_bericht/', views.create_bericht, name="create_bericht"),
    path('berichten/', views.BerichtenListView.as_view(), name='berichten-list')
]