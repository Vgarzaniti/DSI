from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import OperacionForm
from .models import Operacion

# Create your views here.

@login_required
def alta_operacion(request):
    if request.method == 'POST':
        form = OperacionForm(request.POST)
        if form.is_valid():
            operacion = form.save(commit=False)
            operacion.operador = request.user
            operacion.save()
            return redirect('lista_operaciones')
    else:
        form = OperacionForm()
    return render(request, 'alta_operacion.html', {'form', form})



@login_required
def lista_operaciones(request):
    operaciones = Operacion.objects.all().order_by('-fecha_hora')
    return render(request, 'lista_operaciones.html', {'operaciones': operaciones})