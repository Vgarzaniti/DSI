from rest_framework import serializers
from .models import Servicio,Localidad,Cliente,Domicilio,Conexion

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
        fields = ['idcliente','dni', 'nombre', 'apellido', 'numtel']

class LocalidadNomSerializer(serializers.Serializer):
    nombre = serializers.CharField()

    def create(self, validated_data):
        nombre = validated_data.get('nombre')
        # Buscamos o creamos la localidad por su nombre
        localidad, created = Localidad.objects.get_or_create(nombre=nombre)
        return localidad.idlocalidad



class DomicilioSerializer(serializers.ModelSerializer):
    localidad = serializers.PrimaryKeyRelatedField(queryset=Localidad.objects.all(), source='idlocalidad')

    class Meta:
        model = Domicilio
        fields = ['iddomicilio', 'calle', 'departamento', 'numero', 'piso', 'localidad']

    def create(self, validated_data):
        # Aquí la localidad ya viene asociada como un ID, no necesitamos hacer más
        localidad = validated_data.pop('idlocalidad')
        domicilio = Domicilio.objects.create(idlocalidad=localidad, **validated_data)
        return domicilio
    

class ConexionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conexion
        fields = ['idconexion', 'fechaalta', 'numero', 'idcliente', 'idservicio', 'iddomicilio']




