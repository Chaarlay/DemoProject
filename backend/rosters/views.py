from django.shortcuts import render
from rest_framework import generics

from rosters.models import ClassBatch, Learner
from rosters.serializers import (
        ClassBatchViewSerializer, LearnerViewSerializer
)


class ClassBatchView(generics.RetrieveAPIView):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()

class LearnerView(generics.RetrieveAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()
