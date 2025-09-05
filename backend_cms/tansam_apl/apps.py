from django.apps import AppConfig


class TansamAplConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tansam_apl'
    
    def ready(self):
        import tansam_apl.signals
    
