from django.db import models

# Create your models here.
class Berichten(models.Model):
    berichtID = models.AutoField(primary_key=True)  # Automatically increments and is the primary key
    verstuurder = models.CharField(max_length=100, null=False)    # Corresponds to VARCHAR(100)
    verstuurDatum = models.DateField(null=False)                 # Corresponds to DATE
    verstuurTijd = models.TimeField(null=False)                  # Corresponds to TIME
    tekst = models.TextField(null=False, blank=False)  # Corresponds to TEXT (allowing null and blank)

    def __str__(self):
        return f"Bericht from {self.verstuurder} on {self.verstuurDatum} at {self.verstuurTijd} : {self.tekst}"
    
class Meting(models.Model):
    metingID = models.AutoField(primary_key=True)    # MetingID
    afstand = models.DecimalField(max_digits=10, decimal_places=2, null=False)  # Afstand
    meetDatum = models.DateField(null=False)  # MeetDatum
    meetTijd = models.TimeField(null=False)   # MeetTijd

    def __str__(self):
        return f"{self.metingID} - {self.afstand} - {self.meetDatum} {self.meetTijd}"