from django.shortcuts import render
from .serializers import DialogueSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .dialogue_manager import StackBoxer
from .utils import *
# Create your views here.

bot = StackBoxer(RESOURCE_PATH)

def job(text, mode, user_id):
    return bot.generate_answer(text, mode, user_id)


@api_view(['POST'])
def DialogueViewSet(request):
    serializer = DialogueSerializer(data=request.data)
    if serializer.is_valid():
        text = convert(request.data["text"], 't2s')
        mode = request.data["mode"]
        user_id = request.data["user_id"]
        result = job(text, mode, user_id)
        serializer.save(result=result)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


