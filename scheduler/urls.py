# === Configures the urls of the website. ===

from django.conf.urls import url
from . import views

app_name = 'scheduler'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addcourse/$', views.addcourse, name='addcourse'),
    url(r'^addsection/$', views.addsection, name='addsection'),
    

    url(r'^getsubjs/$', views.getsubjs, name='getsubjs'),
    url(r'^getsections/$', views.getsections, name='getsections')
]
