# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-04-02 03:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0002_auto_20170401_1800'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='section_number',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
