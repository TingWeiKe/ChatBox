from django.db import models

# Create your models here.
class Dialogue(models.Model):
    text = models.TextField()
    mode = models.TextField(max_length=7)
    result = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
