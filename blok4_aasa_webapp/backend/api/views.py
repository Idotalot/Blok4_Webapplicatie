from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import generics
from .models import Berichten, Metingen
from .serializers import BerichtenSerializer, MetingenSerializer
from datetime import timedelta
from django.utils import timezone
import datetime

# Create your views here.
# api/views.py

@api_view(['POST'])
def create_bericht(request):
    serializer = BerichtenSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BerichtenListView(generics.ListAPIView):
    serializer_class = BerichtenSerializer

    def get_queryset(self):
        # Cutoff tijd instellen naar 1 uur geleden
        dateTime = datetime.datetime.now()

        cutoff = dateTime - datetime.timedelta(hours = 12)

        print(f"cutoffDate: {cutoff} ")

        deleted_count = 0

        for bericht in Berichten.objects.all():
            if bericht.verstuurDatum <= cutoff.date() and bericht.verstuurTijd <= cutoff.time():
                bericht.delete()
                deleted_count += 1


        print(f"Deleted {deleted_count} old berichten.")
        return Berichten.objects.all().order_by('-berichtID')

@api_view(['POST'])
def create_meting(request):
    serializer = MetingenSerializer(data=request.data)
    if serializer.is_valid():
        print("Serializer is valid!")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # If validation fails, print the errors
    print("Validation failed, errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetingenListView(generics.ListAPIView):
    serializer_class = MetingenSerializer

    def get_queryset(self):
        # Cutoff tijd instellen naar 1 uur geleden
        dateTime = datetime.datetime.now()

        cutoff = dateTime - datetime.timedelta(hours = 12)

        print(f"cutoffDate: {cutoff} ")

        deleted_count = 0

        for meting in Metingen.objects.all():
            if meting.meetDatum <= cutoff.date() and meting.meetTijd <= cutoff.time():
                meting.delete()
                deleted_count += 1


        print(f"Deleted {deleted_count} old metingen.")
        return Metingen.objects.all().order_by('-metingID')