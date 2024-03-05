# from django.core.management.base import BaseCommand
# from django.db import connection
# import os
# import subprocess
# from datetime import datetime
#
#
# class Command(BaseCommand):
#     help = 'Backup the database'
#
#     def handle(self, *args, **kwargs):
#         # Specify the directory where backups should be stored (in the same level as management dir)
#         backup_directory = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backups')
#
#         # Create the backup directory if it doesn't exist
#         os.makedirs(backup_directory, exist_ok=True)
#
#         # Get database settings from settings.py
#         database_settings = connection.settings_dict
#
#         # Generate a timestamp for the backup file
#         timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
#
#         # Create a backup file name with timestamp
#         backup_file = os.path.join(backup_directory, f"backup_{timestamp}.sql")
#
#         # Run the mysqldump command to create a backup
#         try:
#             subprocess.run(
#                 [
#                     'mysqldump',
#                     '--user=' + database_settings['USER'],
#                     '--password=' + database_settings['PASSWORD'],
#                     '--host=' + database_settings['HOST'],
#                     '--port=' + database_settings['PORT'],
#                     database_settings['NAME'],
#                 ],
#                 stdout=open(backup_file, 'w'),
#             )
#
#             self.stdout.write(self.style.SUCCESS(f"Database backup created: {backup_file}"))
#         except Exception as e:
#             self.stderr.write(self.style.ERROR(f"Error creating database backup: {e}"))
#
#         # You can add additional logic here, such as uploading the backup to a cloud storage service.
