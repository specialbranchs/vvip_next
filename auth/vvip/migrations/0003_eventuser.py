# Generated by Django 4.2 on 2024-06-18 16:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vvip', '0002_remove_event_guest_event_created_event_text_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload', models.ImageField(blank=True, max_length=255, null=True, upload_to='picture-gallary-upload/%Y/%m/%d/')),
                ('name', models.CharField(max_length=255, null=True)),
                ('validate_date', models.DateField(blank=True, null=True)),
                ('phone', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('number_of_pass', models.IntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('agency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.agency')),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.event')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
