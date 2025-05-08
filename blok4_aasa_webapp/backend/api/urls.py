from django.urls import path
from . import views

urlpatterns = [
    path('create_bericht/', views.create_bericht, name="create_bericht"),
    path('berichten/', views.BerichtenListView.as_view(), name='berichten-list'),
    path('create_meting/', views.create_meting, name="create_meting"),
    path('metingen/', views.MetingenListView.as_view(), name='metingen-list'),
]