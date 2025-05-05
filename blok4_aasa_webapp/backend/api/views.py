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
    print(request.data)

    # Clean up old berichten before creating new one
    # cutoff = timezone.now() - timedelta(hours=1)
    # # Delete messages where the datetime is older than the cutoff
    # Berichten.objects.filter(verstuurDatum__lt=cutoff).delete()

    serializer = BerichtenSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BerichtenListView(generics.ListAPIView):
    serializer_class = BerichtenSerializer

    def get_queryset(self):

        # Cutoff tijd instellen naar 1 uur geleden
        cutoff = timezone.localtime(timezone.now()) - timedelta(hours=1)
        print(f"cutoff: {cutoff}")

        deleted_count, _ = Berichten.objects.filter(verstuurTijd__lt=cutoff).delete()
        print(f"Deleted {deleted_count} old berichten.")
        return Berichten.objects.all().order_by('-berichtID')
