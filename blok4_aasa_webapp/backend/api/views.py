from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def hello_world(request):
    return Response({
        "message": "Hello from Django backend!"
    })

@api_view(['GET'])
def test_1(request):
    return Response({
        "message": "Ik ben hier veel te lang mee bezig geweest",
        "count": "kill me pls"
    })

# Create your views here.
