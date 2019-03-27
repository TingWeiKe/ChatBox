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
# Create your views here.


def is_unicode(text):
    return len(text) == len(text.encode())


class BotHandler:

    def __init__(self, dialogue_manager):
        self.dialogue_manager = dialogue_manager
        self.answer = ''

    def get_answer(self, question):
        return self.dialogue_manager.generate_answer(question)

    def get_message(self, text):
        if is_unicode(text):
            self.answer = self.get_answer(text)
        else:
            self.answer = "Hmm, you are sending some weird characters to me..."
        return self.answer


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
