from django.urls import path
from .views import ServicioListView,UltimoNumeroConexionAPIView,LocalidadListView,ClienteSearchView

urlpatterns = [
    path('servicios/', ServicioListView.as_view(), name='servicios'),
    path('ultimo-numero/',UltimoNumeroConexionAPIView.as_view(),name='ultimo-numero'),
    path('localidad/',LocalidadListView.as_view(),name='localidad'),
    path('cliente/',ClienteSearchView.as_view(),name='cliente')
]
