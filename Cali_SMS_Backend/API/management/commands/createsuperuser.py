from django.contrib.auth.management.commands import createsuperuser
from California_sms.API.models import CustomUser


class Command(createsuperuser.Command):
    def handle(self, *args, **options):
        options['email'] = options['username']  # Use email as username
        options['is_staff'] = True
        options['is_superuser'] = True
        user_data = {
            CustomUser.USERNAME_FIELD: options['username'],
            'password': options['password'],
            'userType': 'superuser',  # Set user type for superuser
        }
        CustomUser.objects.create_superuser(**user_data)
