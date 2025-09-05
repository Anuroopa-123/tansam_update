from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import JobApplication, ApplicationStatusHistory

@receiver(post_save, sender=JobApplication)
def create_status_history(sender, instance, created, **kwargs):
    if not created:
        ApplicationStatusHistory.objects.create(
            job_application=instance,
            job=instance.job,
            full_name=instance.full_name,
            contact=instance.contact,
            email=instance.email,
            status=instance.status,
        )
