from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path('api/newsletters/', NewsListAPIView.as_view(), name='newsletter-list'),
    path('api/entrepreneurships/', EntrepreneurshipListAPIView.as_view(), name='entrepreneurship-list'),
    path('api/sliders/', SliderListAPIView.as_view(), name='slider-list'),
    path('api/workshop_img/', workshopAPIView.as_view(), name='workshop_img'),
    path('api/register-course/', CourseRegistrationListCreateAPIView.as_view(), name='course-register'),
    path('api/media-categories/', MediaCategoryListAPIView.as_view(), name='media-category-list'),
   path('api/media-items/<int:category_id>/', MediaItemByCategoryIdAPIView.as_view()),
    path('api/events/<str:category>/', EventListAPIView.as_view(), name='event-list-by-category'),
    path('api/hackathon-events/', HackathonEventListAPIView.as_view(), name='hackathon-event-list'),
    path('api/careers/', JobListAPIView.as_view(), name='career-jobs-list'),
    path('api/job-application/', JobApplicationCreateAPIView.as_view(), name='job-application-create'),
    path('api/job-applications/', JobApplicationListAPIView.as_view(), name='job-application-list'),
    
    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
