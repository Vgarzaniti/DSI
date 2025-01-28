from django.urls import path
from .views import alta_operacion

urlpatterns = [
    path('alta_operacion/', alta_operacion, name='alta_operacion'),
]
