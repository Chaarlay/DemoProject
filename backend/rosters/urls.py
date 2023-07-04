from django.urls import path, include 
from rosters import views
from rest_framework import routers

'''
URL configure by router 
'''
router = routers.DefaultRouter()
router.register(r'learners', views.LearnerViewSet)
router.register(r'classbatches', views.ClassBatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('learner/<int:pk>/', views.LearnerView.as_view(), name='LearnerView'),
    path('classbatch/<int:pk>/', views.ClassBatchView.as_view(), name='ClassBatchView'),


]
