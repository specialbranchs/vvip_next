# Generated by Django 4.2 on 2024-06-30 05:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vvip', '0017_color_template'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='color_template',
            name='location',
        ),
        migrations.AddField(
            model_name='color_template',
            name='requisition',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.requisition'),
        ),
    ]
