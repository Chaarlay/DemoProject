from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets


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
    
'''
implementing CRUD for Learner and ClassBatch
'''
class LearnerViewSet(viewsets.ModelViewSet):
    queryset = Learner.objects.all()
    serializer_class = LearnerViewSerializer

class ClassBatchViewSet(viewsets.ModelViewSet):
    queryset = ClassBatch.objects.all()
    serializer_class = ClassBatchViewSerializer


