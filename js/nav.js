document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');

  if (burger) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
    });
  }

  const links = document.querySelectorAll('.nav__links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
