# Generated by Django 4.2 on 2024-06-30 05:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vvip', '0016_sb_attendent_print_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='color_template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=255)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('father', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.fathertemplate')),
                ('grandfather', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.grandfathertemplate')),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.location')),
                ('son', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vvip.sontemplate')),
            ],
        ),
    ]
