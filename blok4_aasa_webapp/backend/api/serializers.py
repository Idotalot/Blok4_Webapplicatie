# api/serializers.py
from rest_framework import serializers
from .models import Berichten, Metingen

class BerichtenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Berichten
        fields = ['berichtID', 'verstuurder', 'verstuurDatum', 'verstuurTijd', 'tekst']

class MetingenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metingen
        fields = ['metingID', 'meetDatum', 'meetTijd', 'afstand']
