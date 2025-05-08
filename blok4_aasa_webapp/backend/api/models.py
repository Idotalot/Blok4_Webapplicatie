from django.db import models

# Create your models here.
class Berichten(models.Model):
    berichtID = models.AutoField(primary_key=True)
    verstuurder = models.CharField(max_length=100, null=False)
    verstuurDatum = models.DateField(null=False)
    verstuurTijd = models.TimeField(null=False)
    tekst = models.TextField(null=False, blank=False)

    def __str__(self):
        return f"Bericht from {self.verstuurder} on {self.verstuurDatum} at {self.verstuurTijd} : {self.tekst}"
    
class Metingen(models.Model):
    metingID = models.AutoField(primary_key=True)
    afstand = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    meetDatum = models.DateField(null=False)
    meetTijd = models.TimeField(null=False)

    def __str__(self):
        return f"{self.metingID} - {self.afstand} - {self.meetDatum} {self.meetTijd}"