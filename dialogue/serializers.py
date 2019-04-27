from rest_framework import serializers
from .models import Dialogue


class DialogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialogue
        # fields = '__all__'
        fields = ('id', 'text', 'mode', 'result', 'created')
