from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import generics
from .models import Berichten
from .serializers import BerichtenSerializer
from datetime import timedelta
from django.utils import timezone

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
# api/views.py

@api_view(['POST'])
def create_bericht(request):
    if request.method == 'POST':
        print(request.data)
          # Clean up old berichten before creating new one
        cutoff = timezone.now() - timedelta(hours=24)
        # Delete messages where the date is older than the cutoff
        Berichten.objects.filter(verstuurDatum__lt=cutoff.date()).delete()

        serializer = BerichtenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BerichtenListView(generics.ListAPIView):
    queryset = Berichten.objects.all().order_by('-berichtID')  # latest first
    serializer_class = BerichtenSerializer
