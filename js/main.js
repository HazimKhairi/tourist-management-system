/* =========================================================================
   Jelajah Malaysia — shared interactions
   Vanilla JS, no dependencies. Works on every page.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Sticky navbar shadow on scroll ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on link click (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var answer = item.querySelector('.faq__a');
      var isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Gallery filter (chips) ---------- */
  var filterChips = document.querySelectorAll('[data-filter]');
  if (filterChips.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.getAttribute('data-filter');
        document.querySelectorAll('[data-cat]').forEach(function (item) {
          var show = cat === 'all' || item.getAttribute('data-cat') === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var phoneRe = /^[+]?[0-9\s\-()]{7,15}$/;

    function setError(field, msg) {
      var wrap = field.closest('.field');
      var err = wrap.querySelector('.error');
      if (msg) { wrap.classList.add('invalid'); if (err) err.textContent = msg; }
      else { wrap.classList.remove('invalid'); if (err) err.textContent = ''; }
      return !msg;
    }

    function validateField(field) {
      var v = (field.value || '').trim();
      var name = field.getAttribute('name');
      if (field.hasAttribute('required') && !v) return setError(field, 'This field is required.');
      if (name === 'email' && v && !emailRe.test(v)) return setError(field, 'Please enter a valid email address.');
      if (name === 'phone' && v && !phoneRe.test(v)) return setError(field, 'Please enter a valid phone number.');
      if (name === 'name' && v && v.length < 2) return setError(field, 'Please enter your full name.');
      if (name === 'message' && v && v.length < 10) return setError(field, 'Message should be at least 10 characters.');
      return setError(field, '');
    }

    var fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { validateField(f); });
      f.addEventListener('input', function () {
        if (f.closest('.field').classList.contains('invalid')) validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      fields.forEach(function (f) { if (!validateField(f)) ok = false; });
      if (!ok) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }
      var note = form.querySelector('.form-note');
      if (note) { note.classList.add('success'); note.textContent = 'Terima kasih! Your message has been received — our team will reply within 24 hours.'; }
      form.reset();
      if (note) note.scrollIntoView({ behavior: 'smooth', block: 'center' });
      /* To make this send real emails, the client can point the form at a free
         endpoint (e.g. Formspree / Web3Forms) — see README. */
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

})();
