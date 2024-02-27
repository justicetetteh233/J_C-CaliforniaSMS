from django.core.management.base import BaseCommand, CommandError
from django.db import connection
import subprocess


class Command(BaseCommand):
    help = 'Restore the database from a backup file'

    def add_arguments(self, parser):
        parser.add_argument('backup_file', type=str, help='Path to the backup file to restore')

    def handle(self, *args, **kwargs):
        backup_file = kwargs['backup_file']

        # Get database settings from settings.py
        database_settings = connection.settings_dict

        try:
            # Run the mysql command to restore the database from the specified backup file
            subprocess.run(
                [
                    'mysql',
                    '--user=' + database_settings['USER'],
                    '--password=' + database_settings['PASSWORD'],
                    '--host=' + database_settings['HOST'],
                    '--port=' + database_settings['PORT'],
                    database_settings['NAME'],
                ],
                stdin=open(backup_file, 'rb'),
            )

            self.stdout.write(self.style.SUCCESS(f"Database restored from backup: {backup_file}"))
        except Exception as e:
            raise CommandError(f"Error restoring database from backup: {e}")
