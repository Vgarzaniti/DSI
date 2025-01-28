from rest_framework import serializers
from .models import Servicio,Localidad,Cliente

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['idservicio','cantidadmegas','precio']  # Puedes agregar más campos si es necesario

class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = ['idlocalidad', 'nombre']

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['idcliente', 'dni', 'nombre', 'apellido', 'numtel']