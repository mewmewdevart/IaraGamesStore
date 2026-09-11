(function () {
  'use strict';

  let toastAtual = null;
  let timerAtual = null;

  function mostrarToast(mensagem) {
    if (toastAtual) {
      toastAtual.remove();
      clearTimeout(timerAtual);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-em-breve';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<i class="fa-solid fa-hammer toast-em-breve__icone" aria-hidden="true"></i>' +
      '<span>' + mensagem + '</span>';

    document.body.appendChild(toast);
    toastAtual = toast;

    requestAnimationFrame(function () {
      toast.classList.add('toast-em-breve--visivel');
    });

    timerAtual = setTimeout(function () {
      toast.classList.remove('toast-em-breve--visivel');
      setTimeout(function () {
        toast.remove();
        if (toastAtual === toast) toastAtual = null;
      }, 300);
    }, 2600);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const linksEmBreve = document.querySelectorAll('.footer-link[data-em-breve]');
    linksEmBreve.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const nome = link.textContent.trim();
        mostrarToast('"' + nome + '" ainda está em construção. Em breve por aqui!');
      });
    });
  });
})();
