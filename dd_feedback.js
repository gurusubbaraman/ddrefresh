/* ==================================================================
   DD — VISITOR FEEDBACK WIDGET                    (Session 2B.2)
   ------------------------------------------------------------------
   A floating bilingual comment box that captures which temple the
   visitor is looking at and sends it to the maintainer.

   Ported from the PPS widget, with three deliberate differences so
   that DD and PPS feedback can never be confused in one inbox:

       endpoint   its own Formspree form, not the PPS one
       site field every submission carries site: "DivyaDesams"
       subject    every submission is prefixed "[DD]"

   Any one of those would be enough on its own; all three together
   mean a misrouted submission is obvious rather than silent.

   ------------------------------------------------------------------
   THE PPS BUG THIS AVOIDS  (PPS Session 2C.3b)
   ------------------------------------------------------------------
   The PPS widget sent  email: "(not given)"  whenever a visitor left
   the email field blank. That is not a valid address, so Formspree
   rejected the whole submission with HTTP 400 and EVERY anonymous
   comment was silently lost. Nobody noticed for weeks, because the
   widget showed a success message regardless.

   Two rules here, both consequences of that:

     1. The email field is only included in the payload if it looks
        like an address. Blank means the key is omitted entirely.
     2. The success message is shown only after the POST actually
        resolves ok. A failure falls back to a working mailto: link
        rather than pretending to have sent.

   ------------------------------------------------------------------
   WHAT IS CAPTURED
   ------------------------------------------------------------------
     message      the visitor's comment, required, min 4 characters
     email        optional, and only sent when plausibly valid
     temple       whichever temple is open, resolved from
                  window.currentPopupSno or the selected marker
     site         always "DivyaDesams"
     _subject     "[DD] Feedback — <temple>" so the inbox self-sorts
     page         the URL, for reproducing a UI report
     lang         which language the visitor was reading in

   Spam protection is a hidden _gotcha honeypot plus a minimum-length
   check. Both are the Formspree conventions.

   ------------------------------------------------------------------
   CONFIGURATION
   ------------------------------------------------------------------
   To change the destination, edit the two constants below. Setting
   FEEDBACK_ENDPOINT to an empty string disables the AJAX path
   entirely and the widget works by mailto: alone.

   LOAD ORDER — last, after everything else. It touches no data and
   depends only on the DOM.
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_FEEDBACK_LOADED) return;
  window.DD_FEEDBACK_LOADED = true;

  var FEEDBACK_ENDPOINT = 'https://formspree.io/f/xbdnejda';
  var OWNER_EMAIL       = 'webmasterppsdd@gmail.com';
  var SITE_TAG          = 'DivyaDesams';
  var SUBJECT_PREFIX    = '[DD]';

  var TXT = {
    en: {
      tip: 'Send feedback',
      title: 'Corrections & feedback',
      intro: 'Spotted an error, or know something this page is missing? ' +
             'Corrections are genuinely welcome.',
      viewing: 'About',
      general: 'the site in general',
      ph: 'Your correction, question or comment\u2026',
      email: 'Your email (optional \u2014 only if you would like a reply)',
      send: 'Send',
      sending: 'Sending\u2026',
      thanks: 'Thank you \u2014 your note has reached the maintainer.',
      tooShort: 'Please write a little more first.',
      failed: 'Could not send from here. Opening your mail app instead\u2026',
      close: 'Close'
    },
    ta: {
      tip: '\u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BA4\u0BC6\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0B95',
      title: '\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD',
      intro: '\u0BA4\u0BB5\u0BB1\u0BC1 \u0B95\u0BA3\u0BCD\u0B9F\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE? \u0B87\u0BAA\u0BCD\u0BAA\u0B95\u0BCD\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BB5\u0BBF\u0B9F\u0BC1\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC8 \u0B85\u0BB1\u0BBF\u0BB5\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE? \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0BA4\u0BC6\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.',
      viewing: '\u0BA4\u0BB2\u0BAE\u0BCD',
      general: '\u0BAA\u0BCA\u0BA4\u0BC1\u0BB5\u0BBE\u0BA9 \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1',
      ph: '\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD, \u0B95\u0BC7\u0BB3\u0BCD\u0BB5\u0BBF \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u2026',
      email: '\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD (\u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD \u2014 \u0BAA\u0BA4\u0BBF\u0BB2\u0BCD \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBF\u0BA9\u0BCD \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD)',
      send: '\u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95',
      sending: '\u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1\u2026',
      thanks: '\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u2014 \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1.',
      tooShort: '\u0B9A\u0BBF\u0BB1\u0BBF\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB0\u0BBF\u0BB5\u0BBE\u0B95 \u0B8E\u0BB4\u0BC1\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.',
      failed: '\u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF \u0BA4\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1\u2026',
      close: '\u0BAE\u0BC2\u0B9F\u0BC1'
    }
  };

  function lang() { return window.currentLanguage === 'ta' ? 'ta' : 'en'; }
  function t(k) { return (TXT[lang()] || TXT.en)[k]; }

  /* Which temple is the visitor looking at? */
  function currentTemple() {
    var sno = window.currentPopupSno || window.selectedTempleSno || null;
    if (!sno) return null;
    var T = window.DIVYA_DESAMS || window.DD_TEMPLES || [];
    for (var i = 0; i < T.length; i++) {
      if (T[i].sno === sno) {
        var gfv = window.getFieldValue || function (x, f) { return x[f] || ''; };
        var name = gfv(T[i], 'temple_name_short') || T[i].temple_name_short ||
                   T[i].temple_name || '';
        return { sno: sno, name: name, town: T[i].town || '' };
      }
    }
    return { sno: sno, name: '', town: '' };
  }

  /* Only send an email key if it plausibly is one. See the header. */
  function validEmail(v) {
    return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  function css() {
    if (document.getElementById('dd-fb-css')) return;
    var s = document.createElement('style');
    s.id = 'dd-fb-css';
    s.textContent = [
      '#dd-fb-btn{position:fixed;right:18px;bottom:18px;z-index:1400;width:52px;height:52px;',
      'border-radius:50%;border:2px solid #D4AF37;background:#1E5AA0;color:#fff;font-size:1.4rem;',
      'cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;align-items:center;',
      'justify-content:center;transition:transform .15s,box-shadow .15s;font-family:inherit}',
      '#dd-fb-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.38)}',
      '#dd-fb-panel{position:fixed;right:18px;bottom:80px;z-index:1401;width:330px;max-width:calc(100vw - 36px);',
      'background:#FDF8F0;border:2px solid #D4AF37;border-radius:14px;padding:16px;',
      'box-shadow:0 12px 40px rgba(0,0,0,.3);display:none;font-family:Inter,-apple-system,sans-serif}',
      '#dd-fb-panel.dd-fb-open{display:block}',
      '.dd-fb-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px}',
      '.dd-fb-title{font-size:.95rem;font-weight:700;color:#1E5AA0;line-height:1.25}',
      '.dd-fb-x{background:none;border:none;font-size:1.35rem;line-height:1;cursor:pointer;',
      'color:#1E5AA0;padding:0 2px;font-family:inherit}',
      '.dd-fb-intro{font-size:.76rem;color:#2D2D50;margin-bottom:9px;line-height:1.45}',
      '.dd-fb-ctx{font-size:.72rem;background:#F5EDD9;border-left:3px solid #D4AF37;',
      'padding:6px 9px;border-radius:5px;margin-bottom:9px;color:#1A1A3A}',
      '#dd-fb-msg,#dd-fb-mail{width:100%;border:1.5px solid #EDE3CC;border-radius:8px;',
      'padding:8px 9px;font-family:inherit;font-size:.8rem;background:#fff;color:#1A1A3A;',
      'box-sizing:border-box}',
      '#dd-fb-msg{min-height:82px;resize:vertical;margin-bottom:7px}',
      '#dd-fb-mail{margin-bottom:9px}',
      '#dd-fb-msg:focus,#dd-fb-mail:focus{outline:none;border-color:#1E5AA0}',
      '.dd-fb-send{width:100%;padding:9px;background:#1E5AA0;color:#fff;border:none;',
      'border-radius:8px;font-weight:600;font-size:.83rem;cursor:pointer;font-family:inherit}',
      '.dd-fb-send:hover{background:#164574}',
      '.dd-fb-send:disabled{opacity:.6;cursor:default}',
      '.dd-fb-note{font-size:.72rem;margin-top:8px;line-height:1.45;display:none}',
      '.dd-fb-note.ok{display:block;color:#1B7A3D}',
      '.dd-fb-note.err{display:block;color:#B3261E}',
      '.dd-fb-hp{position:absolute;left:-9999px;opacity:0;height:0;width:0}',
      '@media(max-width:900px){#dd-fb-btn{right:12px;bottom:12px;width:46px;height:46px;font-size:1.2rem}',
      '#dd-fb-panel{right:12px;bottom:66px;width:calc(100vw - 24px)}}'
    ].join('');
    document.head.appendChild(s);
  }

  var panel, msgEl, mailEl, sendEl, noteEl, ctxEl, hpEl;

  function build() {
    css();

    var btn = document.createElement('button');
    btn.id = 'dd-fb-btn';
    btn.type = 'button';
    btn.innerHTML = '\uD83D\uDCAC';
    btn.title = t('tip');
    btn.setAttribute('aria-label', t('tip'));
    btn.onclick = toggle;
    document.body.appendChild(btn);

    panel = document.createElement('div');
    panel.id = 'dd-fb-panel';
    panel.setAttribute('role', 'dialog');
    panel.innerHTML =
      '<div class="dd-fb-head">' +
        '<div class="dd-fb-title" id="dd-fb-title"></div>' +
        '<button class="dd-fb-x" id="dd-fb-x" type="button" aria-label="Close">\u00D7</button>' +
      '</div>' +
      '<div class="dd-fb-intro" id="dd-fb-intro"></div>' +
      '<div class="dd-fb-ctx" id="dd-fb-ctx"></div>' +
      '<input class="dd-fb-hp" id="dd-fb-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off">' +
      '<textarea id="dd-fb-msg"></textarea>' +
      '<input id="dd-fb-mail" type="email" autocomplete="email">' +
      '<button class="dd-fb-send" id="dd-fb-send" type="button"></button>' +
      '<div class="dd-fb-note" id="dd-fb-note"></div>';
    document.body.appendChild(panel);

    msgEl  = document.getElementById('dd-fb-msg');
    mailEl = document.getElementById('dd-fb-mail');
    sendEl = document.getElementById('dd-fb-send');
    noteEl = document.getElementById('dd-fb-note');
    ctxEl  = document.getElementById('dd-fb-ctx');
    hpEl   = document.getElementById('dd-fb-hp');

    document.getElementById('dd-fb-x').onclick = close;
    sendEl.onclick = submit;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('dd-fb-open')) close();
    });
  }

  function paint() {
    document.getElementById('dd-fb-title').textContent = t('title');
    document.getElementById('dd-fb-intro').textContent = t('intro');
    msgEl.placeholder  = t('ph');
    mailEl.placeholder = t('email');
    sendEl.textContent = t('send');
    var btn = document.getElementById('dd-fb-btn');
    if (btn) { btn.title = t('tip'); btn.setAttribute('aria-label', t('tip')); }

    var temple = currentTemple();
    ctxEl.textContent = temple && temple.name
      ? t('viewing') + ': #' + temple.sno + ' ' + temple.name +
        (temple.town ? ' \u2014 ' + temple.town : '')
      : t('viewing') + ': ' + t('general');
  }

  function toggle() {
    panel.classList.contains('dd-fb-open') ? close() : open();
  }
  function open() {
    paint();
    noteEl.className = 'dd-fb-note';
    noteEl.textContent = '';
    panel.classList.add('dd-fb-open');
    setTimeout(function () { msgEl.focus(); }, 40);
  }
  function close() { panel.classList.remove('dd-fb-open'); }

  function mailtoFallback(body, subject) {
    var url = 'mailto:' + OWNER_EMAIL +
              '?subject=' + encodeURIComponent(subject) +
              '&body=' + encodeURIComponent(body);
    try { window.location.href = url; } catch (e) {}
  }

  function submit() {
    var message = (msgEl.value || '').trim();
    if (message.length < 4) {
      noteEl.className = 'dd-fb-note err';
      noteEl.textContent = t('tooShort');
      msgEl.focus();
      return;
    }
    if (hpEl && hpEl.value) { close(); return; }   /* honeypot tripped */

    var temple = currentTemple();
    var where = temple && temple.name
      ? '#' + temple.sno + ' ' + temple.name + (temple.town ? ', ' + temple.town : '')
      : 'general';
    var subject = SUBJECT_PREFIX + ' Feedback \u2014 ' + where;

    /* Build the payload. The email key is OMITTED unless valid --
       sending a placeholder is what broke the PPS widget. */
    var payload = {
      message: message,
      site: SITE_TAG,
      temple: where,
      temple_sno: temple ? temple.sno : '',
      page: (function () { try { return window.location.href; } catch (e) { return ''; } })(),
      lang: lang(),
      _subject: subject
    };
    var mail = (mailEl.value || '').trim();
    if (validEmail(mail)) payload.email = mail;

    var bodyText = message +
      '\n\n---\ntemple : ' + where +
      '\nsite   : ' + SITE_TAG +
      '\nlang   : ' + lang() +
      '\npage   : ' + payload.page +
      (payload.email ? '\nreply  : ' + payload.email : '');

    sendEl.disabled = true;
    sendEl.textContent = t('sending');
    noteEl.className = 'dd-fb-note';
    noteEl.textContent = '';

    function done(ok) {
      sendEl.disabled = false;
      sendEl.textContent = t('send');
      if (ok) {
        noteEl.className = 'dd-fb-note ok';
        noteEl.textContent = t('thanks');
        msgEl.value = '';
        setTimeout(close, 1900);
      } else {
        noteEl.className = 'dd-fb-note err';
        noteEl.textContent = t('failed');
        mailtoFallback(bodyText, subject);
      }
    }

    if (!FEEDBACK_ENDPOINT) { done(false); return; }

    try {
      fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) {
        /* Success only on a real ok. No optimistic messaging. */
        done(!!(r && r.ok));
      }).catch(function () { done(false); });
    } catch (e) { done(false); }
  }

  function boot(tries) {
    tries = tries || 0;
    if (!document.body) {
      if (tries > 100) return;
      return setTimeout(function () { boot(tries + 1); }, 60);
    }
    if (document.getElementById('dd-fb-btn')) return;
    build();
    paint();
    console.log('[dd_feedback] widget active \u2014 site "' + SITE_TAG + '", subject prefix "' +
                SUBJECT_PREFIX + '", endpoint ' +
                (FEEDBACK_ENDPOINT ? FEEDBACK_ENDPOINT.replace(/^https:\/\//, '') : 'mailto only'));
  }

  window.DDFeedback = {
    open: open,
    close: close,
    repaint: paint,
    config: function () {
      return { endpoint: FEEDBACK_ENDPOINT, owner: OWNER_EMAIL,
               site: SITE_TAG, subjectPrefix: SUBJECT_PREFIX };
    },
    /* Build the exact payload without sending, for inspection. */
    preview: function (sample) {
      var temple = currentTemple();
      var where = temple && temple.name
        ? '#' + temple.sno + ' ' + temple.name : 'general';
      return { message: sample || '(your message)', site: SITE_TAG, temple: where,
               temple_sno: temple ? temple.sno : '', lang: lang(),
               _subject: SUBJECT_PREFIX + ' Feedback \u2014 ' + where,
               note: 'email key is omitted unless a valid address is entered' };
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(0); });
  } else {
    boot(0);
  }
})();
