from django import forms
from .models import Operacion

class OperacionForm(forms.ModelForm):
    class Meta:
        model = Operacion
        fields = ['conexion', 'motivo']
