# Generated by Django 2.0.9 on 2018-11-03 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmc', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
