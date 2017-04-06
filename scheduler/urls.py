from django.conf.urls import url
from . import views

app_name = 'scheduler'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addcourse/(?P<subjectname>[A-Z]{4})(?P<coursenum>[0-9]{4})/'\
         r'(?P<title>[^/]+)/(?P<hours>[0-9]+)/(?P<description>[^/]*)/$', views.addcourse, name='addcourse')
]
