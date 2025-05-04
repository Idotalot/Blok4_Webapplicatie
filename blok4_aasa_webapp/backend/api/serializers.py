# api/serializers.py
from rest_framework import serializers
from .models import Berichten

class BerichtenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Berichten
        fields = ['berichtID', 'verstuurder', 'verstuurDatum', 'verstuurTijd', 'tekst']
