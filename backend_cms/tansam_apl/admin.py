from django.contrib import admin
from .models import *
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe



admin.site.register(News)
admin.site.register(Entrepreneurship)
admin.site.register(slider)
admin.site.register(workshop)
admin.site.register(MediaCategory)
admin.site.register( MediaItem)
admin.site.register(Event)
@admin.register(HackathonEvent)
class HackathonEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'published')
    list_filter = ('published',)
    search_fields = ('title', 'description')
    
@admin.register(Job)

class JobAdmin(admin.ModelAdmin):
    list_display = ('role', 'type', 'posted_on', 'published')
    list_filter = ('type', 'published')
    search_fields = ('role',)
    

    

from .models import Job, JobApplication, ApplicationStatusHistory

class ApplicationStatusHistoryInline(admin.TabularInline):
    model = ApplicationStatusHistory
    fk_name = 'job_application'   # explicitly tell Django which FK field links back to JobApplication
    extra = 0
    readonly_fields = ('job', 'full_name', 'contact', 'email', 'colored_status', 'updated_on')
    can_delete = False

    def colored_status(self, obj):
        color_map = {
            'applied': 'orange',
            'shortlisted': 'green',
            'rejected': 'red',
            'waiting': 'gold',
        }
        color = color_map.get(obj.status, 'gray')
        return format_html('<b style="color:{};">{}</b>', color, obj.get_status_display())
    colored_status.short_description = 'Status'



    
@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'job',
        'contact',
        'email',
        'resume_link',
        'applied_on',
        'status',
        'colored_status',
    )
    list_filter = ('status',)
    search_fields = ('full_name', 'email', 'status')
    list_editable = ('status',)
    list_per_page = 10
    readonly_fields = ('job', 'full_name', 'contact', 'email', 'resume', 'applied_on')
    inlines = [ApplicationStatusHistoryInline]

    def has_add_permission(self, request):
        return False  

    def colored_status(self, obj):
        color_map = {
            'applied': 'orange',
            'shortlisted': 'green',
            'rejected': 'red',
            'waiting': 'gold',
        }
        color = color_map.get(obj.status, 'gray')
        return format_html(
            '<span style="font-weight:bold; color:{};">{}</span>',
            color,
            obj.get_status_display()
        )
    colored_status.short_description = 'Colored Status'

    def resume_link(self, obj):
        if obj.resume:
            return format_html('<a href="{}" target="_blank">Download</a>', obj.resume.url)
        return '-'
    resume_link.short_description = 'Resume'
    def view_history_link(self, obj):
        url = reverse('admin:tansam_apl_applicationstatushistory_changelist') + f'?job_application__id__exact={obj.id}'
        return mark_safe(f'<a href="{url}" target="_blank">View Status History</a>')

    view_history_link.short_description = 'Status History'






# Register your models here.
