# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cliente(models.Model):
    idcliente = models.AutoField(db_column='idCliente', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField() 
    apellido = models.TextField()                              
    dni = models.IntegerField(unique=True)
    numtel = models.IntegerField(db_column='numTel')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Cliente'


class Conexion(models.Model):
    idconexion = models.AutoField(db_column='idConexion', primary_key=True)  # Field name made lowercase.
    fechaalta = models.DateTimeField(db_column='fechaAlta')  # Cambiado a DateTimeField
    numero = models.IntegerField(unique=True)
    idcliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='idCliente')  # Cambiado a ForeignKey
    idservicio = models.ForeignKey('Servicio', on_delete=models.CASCADE, db_column='idServicio')  # Cambiado a ForeignKey
    iddireccion = models.ForeignKey('Domicilio', on_delete=models.CASCADE, db_column='idDireccion')  # Cambiado a ForeignKey

    class Meta:
        managed = False
        db_table = 'Conexion'


class Domicilio(models.Model):
    iddomicilio = models.AutoField(db_column='idDomicilio', primary_key=True)  # Field name made lowercase.
    calle = models.TextField()
    departamento = models.TextField(blank=True, null=False)
    numero = models.IntegerField()
    piso = models.IntegerField(blank=True, null=False)
    idlocalidad = models.ForeignKey('Localidad', on_delete=models.CASCADE, db_column='idLocalidad')  # Cambiado a ForeignKey

    class Meta:
        managed = False
        db_table = 'Domicilio'


class Localidad(models.Model):
    idlocalidad = models.AutoField(db_column='idLocalidad', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()

    class Meta:
        managed = False
        db_table = 'Localidad'


class Operacion(models.Model):
    idoperacion = models.AutoField(db_column='idOperacion', primary_key=True)  # Field name made lowercase.
    fechahora = models.DateTimeField(db_column='fechaHora')  # Cambiado a DateTimeField
    motivo = models.TextField()
    numero = models.IntegerField(unique=True)
    idpersona = models.ForeignKey('Persona', on_delete=models.CASCADE, db_column='idPersona')  # Cambiado a ForeignKey
    idconexion = models.ForeignKey(Conexion, on_delete=models.CASCADE, db_column='idConexion')  # Cambiado a ForeignKey

    class Meta:
        managed = False
        db_table = 'Operacion'


class Persona(models.Model):
    idpersona = models.AutoField(db_column='idPersona', primary_key=True)  # Field name made lowercase.
    apellido = models.TextField()
    nombre = models.TextField()
    dni = models.IntegerField(unique=True)

    class Meta:
        managed = False
        db_table = 'Persona'


class Servicio(models.Model):
    idservicio = models.AutoField(db_column='idServicio', primary_key=True)  # Field name made lowercase.
    cantidadmegas = models.IntegerField(db_column='cantidadMegas')  # Field name made lowercase.
    precio = models.FloatField()

    class Meta:
        managed = False
        db_table = 'Servicio'


class Visita(models.Model):
    ESTADO_CHOICES = [
        ('Programada', 'Programada'),
        ('Re programada', 'Re programada'),
        ('Resuelta', 'Resuelta'),
        ('No resuelta', 'No resuelta'),
    ]
    idvisita = models.AutoField(db_column='idVisita', primary_key=True)  # Field name made lowercase.
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='Programada')
    fechahora = models.IntegerField(db_column='fechaHora')  # Field name made lowercase.
    observacion = models.TextField()
    idpersona = models.IntegerField(db_column='idPersona')  # Field name made lowercase.
    idconecxion = models.IntegerField(db_column='idConecxion')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Visita'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    first_name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    action_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
