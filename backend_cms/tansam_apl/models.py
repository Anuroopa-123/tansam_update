from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class News(models.Model):
    news_image= models.ImageField(upload_to='news_images/')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    date= models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    
class slider(models.Model):
    slider_image = models.ImageField(upload_to='slider_images/')
    slider_title = models.CharField(max_length=255)
    published = models.BooleanField(default=False)



from django.db import models

class Entrepreneurship(models.Model):
    LAB_CHOICES = [
        ('Innovative Manufacturing', 'Innovative Manufacturing'),
        ('Smart Factory Center', 'Smart Factory Center'),
        ('AR | VR | MR Research Centre', 'AR | VR | MR Research Centre'),
        ('Research Centre For PLM', 'Research Centre For PLM'),
        ('Research Centre For Asset Performance', 'Research Centre For Asset Performance'),
        ('Product Innovation Center', 'Product Innovation Center'),
        ('Predictive Engineering', 'Predictive Engineering'),
    ]

    MODE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]

    course_image = models.ImageField(upload_to='course_images/') 
    course_title = models.CharField(max_length=255)
    course_lab = models.CharField(max_length=255, choices=LAB_CHOICES, blank=True, null=True)
    start_date = models.DateField()
    from_time = models.TimeField()
    to_time = models.TimeField()
    mode = models.CharField(max_length=7, choices=MODE_CHOICES, null=True, blank=True)
    contact_person = models.CharField(max_length=255, null=True, blank=True)
    contact_mail = models.EmailField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)


    
class workshop(models.Model):
    workshop_image=models.ImageField(upload_to='workeshop_images/')
    published = models.BooleanField(default=False)
    
class CourseRegistration(models.Model):
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField()
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    college_or_organization = models.CharField(max_length=255)
    department_or_domain = models.CharField(max_length=255)
    year_or_experience = models.CharField(max_length=50)
    course = models.ForeignKey(Entrepreneurship, on_delete=models.CASCADE, related_name='registrations', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class MediaCategory(models.Model):
    CATEGORY_CHOICES = [
        ('Events', 'Events'),
        ('Print_Media', 'Print Media'),
        ('Linkedin', 'LinkedIn'),
    ]
    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES, unique=True)
    description = models.TextField(blank=True, null=True)
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    
class MediaItem(models.Model):
    category = models.ForeignKey(MediaCategory, on_delete=models.CASCADE, related_name='items')
    image = models.ImageField(upload_to='media_items/')
    title = models.CharField(max_length=255, blank=True, null=True)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Media Item in {self.category.name}"



# models.py - Event
class Event(models.Model):
    CATEGORY_CHOICES = [
        ('MoU', 'MoU'),
        ('Official', 'Official'),
        ('Industrial Visit', 'Industrial Visit'),
        ('Naan Mudhalvan', 'Naan Mudhalvan'),
       
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    image = models.ImageField(upload_to='event_images/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
    
class HackathonEvent(models.Model):
    FONT_CHOICES = [
        ('Arial', 'Arial'),
        ('Verdana', 'Verdana'),
        ('Times New Roman', 'Times New Roman'),
        ('Courier New', 'Courier New'),
        ('Georgia', 'Georgia'),
        ('Tahoma', 'Tahoma'),
        ('Trebuchet MS', 'Trebuchet MS'),
        ('Comic Sans MS', 'Comic Sans MS'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    image = models.ImageField(upload_to='hackathon_images/')
    published = models.BooleanField(default=True)

    font_style = models.CharField(
        max_length=50, 
        choices=FONT_CHOICES, 
        default='Arial',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.title
    
    
class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('Full-Time', 'Full-Time'),
        ('Part-Time', 'Part-Time'),
        ('Contract', 'Contract'),
        ('Internship', 'Internship'),
    ]

    role = models.CharField(max_length=255)
    description = RichTextField()
    posted_on = models.DateField()
    type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.role
    
  
class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
         ('waiting', 'Waiting List'),  
    ]
    job = models.ForeignKey('Job', on_delete=models.CASCADE, related_name='applications')
    full_name = models.CharField(max_length=255)
    contact = models.CharField(max_length=10)
    email = models.EmailField()
    resume = models.FileField(upload_to='resumes/')
    applied_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')

    def __str__(self):
        return f"{self.full_name} - {self.job.role}"
    


class ApplicationStatusHistory(models.Model):
    STATUS_CHOICES = [
    ('applied', 'Applied'),
    ('shortlisted', 'Shortlisted'),
    ('rejected', 'Rejected'),
    ('waiting', 'Waiting'),
]
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name='status_history')
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    contact = models.CharField(max_length=50)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.get_status_display()}"

    def get_colored_status(self):
        color_map = {
            'applied': 'orange',
            'shortlisted': 'green',
            'rejected': 'red',
            'waiting': 'gold',
        }
        color = color_map.get(self.status, 'gray')
        return f'<b style="color:{color};">{self.get_status_display()}</b>'

    get_colored_status.allow_tags = True
    get_colored_status.short_description = 'Status'