/* Аналитика сайта optometrist.rs: просмотры и клики «Записаться» → Supabase (site_events).
   Без cookies, без персональных данных. Связь с онлайн-записью — через ?src=<страница>&vid=<посетитель>. */
(function () {
  try {
    if (navigator.webdriver || /[?&]test=1/.test(location.search) || /bot|crawl|spider|preview|headless/i.test(navigator.userAgent)) return;
    var SB = 'https://ncfqiznpilikwmpqhapb.supabase.co/rest/v1/site_events';
    var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZnFpem5waWxpa3dtcHFoYXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTE1MDQsImV4cCI6MjA5NDE4NzUwNH0.hAr40xwNbxHnuozUhIiH1QkHFqi44YUGFI410VWH8B4';
    function uid() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + '-' + Math.random().toString(36).slice(2)); }
    function store(st, k) { try { var v = st.getItem(k); if (!v) { v = uid(); st.setItem(k, v); } return v; } catch (e) { return null; } }
    var VID = store(localStorage, 'site_visitor_id');
    var SID = store(sessionStorage, 'site_session_id');
    var q = new URLSearchParams(location.search);
    var page = (location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '') || '/').slice(0, 200);
    var ref = document.referrer && !/(^|\/\/)(www\.)?optometrist\.rs/.test(document.referrer) ? document.referrer.slice(0, 400) : '';

    function classify(r, utm) {
      if (utm) return utm.toLowerCase();
      if (!r) return 'direct';
      var h = ''; try { h = new URL(r).hostname.replace(/^www\./, ''); } catch (e) { return 'other'; }
      if (/(^|\.)google\./.test(h)) return 'google';
      if (/instagram\.com$/.test(h)) return 'instagram';
      if (/facebook\.com$|fb\.me$/.test(h)) return 'facebook';
      if (/(^|\.)t\.me$|telegram/.test(h)) return 'telegram';
      if (/bing\.com$|yandex\.|duckduckgo/.test(h)) return 'other_search';
      if (/optikaginter\.rs$/.test(h)) return 'optikaginter.rs';
      return h;
    }
    // Источник сессии запоминаем на первой странице визита
    var src;
    try {
      src = sessionStorage.getItem('site_source');
      if (!src) { src = classify(ref, q.get('utm_source')); sessionStorage.setItem('site_source', src); }
    } catch (e) { src = classify(ref, q.get('utm_source')); }

    var base = {
      visitor_id: VID, session_id: SID, page: page, source: src,
      lang: (document.documentElement.lang || navigator.language || '').slice(0, 5),
      device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : (/iPad|Tablet/i.test(navigator.userAgent) ? 'tablet' : 'desktop')
    };
    function send(ev, extra) {
      try {
        var body = Object.assign({}, base, { event: ev }, extra || {});
        fetch(SB, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY, Prefer: 'return=minimal' }, body: JSON.stringify(body) }).catch(function () {});
      } catch (e) {}
    }
    send('view', { referrer: ref || null, utm_source: q.get('utm_source'), utm_medium: q.get('utm_medium'), utm_campaign: q.get('utm_campaign') });

    var BOOK = /zapis\.optometrist\.rs|anna-novoselova-bot\/booking\.html/;
    function decorate() {
      document.querySelectorAll('a[href]').forEach(function (a) {
        if (!BOOK.test(a.href) || a.dataset.trk) return;
        try {
          var u = new URL(a.href);
          u.searchParams.set('src', page);
          if (VID) u.searchParams.set('vid', VID);
          a.href = u.toString(); a.dataset.trk = '1';
        } catch (e) {}
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate); else decorate();

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href') || '';
      var label = (a.textContent || '').trim().slice(0, 60);
      if (BOOK.test(a.href)) send('booking_click', { target: label });
      else if (/t\.me\//.test(h)) send('tg_click', { target: h.slice(0, 120) });
      else if (/^tel:/.test(h)) send('phone_click', { target: h.slice(0, 40) });
    }, true);
  } catch (e) {}
})();
