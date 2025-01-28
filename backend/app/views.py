from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Servicio,Conexion, Localidad,Cliente
from .serializers import ServicioSerializer,LocalidadSerializer,ClienteSerializer

class ServicioListView(APIView):
    def get(self, request, format=None):
        servicios = Servicio.objects.all()  # Obtener todos los servicios
        serializer = ServicioSerializer(servicios, many=True)  # Serializar los servicios
        return Response(serializer.data, status=status.HTTP_200_OK)

class UltimoNumeroConexionAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener el último número de conexión registrado
        ultimo_numero = Conexion.objects.all().order_by('-numero').first()

        # Si hay conexiones, sumamos 1 al último número
        if ultimo_numero:
            numero_nueva_conexion = ultimo_numero.numero + 1
        else:
            # Si no hay ninguna conexión, el primer número será 1
            numero_nueva_conexion = 1

        return Response({'numero': numero_nueva_conexion})
    
class LocalidadListView(APIView):
    def get(self, request):
        localidades = Localidad.objects.all()  # Obtener todas las localidades
        serializer = LocalidadSerializer(localidades, many=True)  # Serializamos las localidades
        return Response(serializer.data)  # Devolvemos la respuesta con los datos serializados
    
class ClienteSearchView(APIView):
    def get(self, request):
        dni = request.query_params.get('dni', '')  # Obtener el DNI del query string
        clientes = Cliente.objects.filter(dni__icontains=dni)  # Filtrar por DNI (con 'icontains' para buscar coincidencias parciales)
        serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)