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

@api_view(['POST'])
def DialogueViewSet(request):
    serializer = DialogueSerializer(data=request.data)
    if serializer.is_valid():
        result = bot.generate_answer(convert(request.data["text"], 't2s'), request.data["mode"],request.data["user_id"])
        serializer.save(result=result)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


