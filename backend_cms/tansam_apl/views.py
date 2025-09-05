from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .models import JobApplication
from .serializers import *


class NewsListAPIView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    def get_queryset(self):
        return News.objects.filter(published=True)

class EntrepreneurshipListAPIView(generics.ListAPIView):
    queryset = Entrepreneurship.objects.all()
    serializer_class = EntrepreneurshipSerializer
    def get_queryset(self):
        return Entrepreneurship.objects.filter(published=True)
    
class SliderListAPIView(generics.ListAPIView):
    queryset = slider.objects.all()
    serializer_class = SliderSerializer
    def get_queryset(self):
        return slider.objects.filter(published=True)
    
class workshopAPIView(generics.ListAPIView):
    queryset = workshop.objects.all()
    serializer_class = workshopSerializer
    def get_queryset(self):
        return workshop.objects.filter(published=True)
    
class CourseRegistrationListCreateAPIView(generics.ListCreateAPIView):
    queryset = CourseRegistration.objects.all()
    serializer_class = CourseRegistrationSerializer
    
class MediaCategoryListAPIView(generics.ListAPIView):
    queryset = MediaCategory.objects.filter(published=True)
    serializer_class = MediaCategorySerializer
    
    
class MediaItemByCategoryIdAPIView(generics.ListAPIView):
    serializer_class = MediaItemSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return MediaItem.objects.filter(category__id=category_id, published=True)

class EventListAPIView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        return Event.objects.filter(category=category, published=True)
    
class HackathonEventListAPIView(generics.ListAPIView):
    serializer_class = HackathonEventSerializer

    def get_queryset(self):
        return HackathonEvent.objects.filter(published=True)
    
    
class JobListAPIView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(published=True).order_by('-posted_on')
    
    
class JobApplicationCreateAPIView(generics.CreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]  
    
class JobApplicationListAPIView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = JobApplication.objects.all()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset