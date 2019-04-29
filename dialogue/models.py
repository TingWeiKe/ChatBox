from django.db import models

# Create your models here.
class Dialogue(models.Model):
    text = models.TextField()
    user_id = models.TextField(max_length=10)
    mode = models.TextField(max_length=7)
    result = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
