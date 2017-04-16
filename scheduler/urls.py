from django.conf.urls import url
from . import views

app_name = 'scheduler'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addcourse/$', views.addcourse, name='addcourse')
    url(r'^addsection/$', views.addsection, name='addsection')
]
