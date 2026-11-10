import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener('DOMContentLoaded', () => {
  const expresionRegular = document.getElementById('expresionRegular');
  const textoEvaluar = document.getElementById('textoEvaluar');
  const btnComparar = document.getElementById('btnComparar');
  const btnBorrar = document.getElementById('btnBorrar');
  
  const seccionResultado = document.getElementById('seccionResultado');
  const alerta = document.getElementById('alerta');
  const resultado = document.getElementById('resultado');

  if (!btnComparar) return;

  btnComparar.addEventListener('click', () => {
    const patron = expresionRegular.value;
    const texto = textoEvaluar.value;

    if (!patron) {
      alert('Por favor ingresa una expresión regular.');
      return;
    }

    if (!texto.trim()) {
      alert('El campo de texto a evaluar no puede estar vacío.');
      textoEvaluar.focus();
      return;
    }

    try {
      const regex = new RegExp(patron, 'g');
      const cumple = regex.test(texto);

      seccionResultado.classList.remove('d-none');

      if (cumple) {
        alerta.className = 'alert alert-success';
        alerta.textContent = '¡El texto SÍ cumple con la expresión regular!';
        
        const textoResaltado = texto.replace(new RegExp(patron, 'g'), match => `<mark>${match}</mark>`);
        resultado.innerHTML = textoResaltado;
      } else {
        alerta.className = 'alert alert-danger';
        alerta.textContent = 'El texto NO cumple con la expresión regular.';
        resultado.textContent = texto;
      }

    } catch (e) {
      alert('Error en la Expresión Regular: ' + e.message);
    }
  });

  btnBorrar.addEventListener('click', () => {
    expresionRegular.value = '';
    textoEvaluar.value = '';
    seccionResultado.classList.add('d-none');
    resultado.innerHTML = '';
  });
});