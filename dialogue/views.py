from django.shortcuts import render
from .serializers import DialogueSerializer
from .models import Dialogue
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import *
from .dialogue_manager import DialogueManager
from .main_bot import BotHandler
# Create your views here.


dialogue_manager = DialogueManager(RESOURCE_PATH)
bot = BotHandler(dialogue_manager)


@api_view(['POST'])
def DialogueViewSet(request):
    serializer = DialogueSerializer(data=request.data)
    if serializer.is_valid():
        result = bot.get_message(request.data["text"])
        serializer.save(result=result)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
