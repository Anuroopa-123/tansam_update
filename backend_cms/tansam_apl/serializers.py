from rest_framework import serializers
from .models import *

class NewsSerializer(serializers.ModelSerializer):
    list_editable = ('published')
    class Meta:
        model = News
        fields = '__all__'

class EntrepreneurshipSerializer(serializers.ModelSerializer):
    list_editable = ('published')
    class Meta:
        model = Entrepreneurship
        fields = '__all__'

class SliderSerializer(serializers.ModelSerializer):
    list_editable = ('published')
    class Meta:
        model = slider 
        fields = '__all__'

class workshopSerializer(serializers.ModelSerializer):
    list_editable = ('published')
    class Meta:
        model = workshop 
        fields = '__all__'
        
class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = '__all__'
    

class MediaCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaCategory
        fields = ['id', 'name', 'description']  

        
class MediaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaItem
        fields = '__all__'
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, data):
        if data.get('category') == 'Hackathon':
            if not data.get('hackathon_options'):
                raise serializers.ValidationError({
                    'hackathon_options': 'This field is required for Hackathon events.'
                })
        else:
            data['hackathon_options'] = None
            data['hackathon_description_style'] = None
            data['hackathon_fontawesome_icons'] = None
        return data


class HackathonEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonEvent
        fields = '__all__'

    def validate(self, data):
        if not data.get('hackathon_options'):
            raise serializers.ValidationError({
                'hackathon_options': 'This field is required for Hackathon events.'
            })
        return data


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        
class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['job', 'full_name', 'contact', 'email', 'resume', 'applied_on', 'status']
        read_only_fields = ['applied_on']
