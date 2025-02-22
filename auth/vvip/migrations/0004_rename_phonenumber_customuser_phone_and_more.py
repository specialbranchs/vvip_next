# Generated by Django 4.2 on 2024-06-18 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vvip', '0003_eventuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='phoneNumber',
            new_name='phone',
        ),
        migrations.AddField(
            model_name='customuser',
            name='upload',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='picture-gallary-upload/%Y/%m/%d/'),
        ),
    ]
