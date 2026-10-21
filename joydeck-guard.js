/* JoyDeck guard : limite le texte a la page (coupe + bloque la saisie) */
(function () {
  var MARGIN = 24;
  var css = '.jd-clip{max-height:var(--jd-mh)!important;overflow:hidden!important;overflow:clip!important}' +
    '.page.jd-overflow,.page.jd-limit{outline:3px dashed #D64545!important;outline-offset:-3px}' +
    '.jd-badge{display:none;position:absolute;top:14px;right:14px;z-index:9999;background:#D64545;color:#fff;font:600 14px Inter,Arial,sans-serif;padding:6px 12px;border-radius:6px;pointer-events:none}' +
    '.page.jd-overflow>.jd-badge,.page.jd-limit>.jd-badge{display:block}' +
    '@media print{.jd-badge{display:none!important}.page.jd-overflow,.page.jd-limit{outline:none!important}}';
  if (/[?&]embed=/.test(location.search)) css += '.jd-badge{display:none!important}.page.jd-overflow,.page.jd-limit{outline:none!important}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function run() {
    var page = document.querySelector('.page');
    if (!page) return;
    var ph = page.offsetHeight, pr = page.getBoundingClientRect();
    var k = (ph && pr.height / ph) || 1;
    var limit = pr.top + (ph - MARGIN) * k;
    var els = [];
    page.querySelectorAll('[contenteditable="true"]').forEach(function (el) {
      if (el.closest('.content-clip') || el.querySelector('.content-clip')) return;
      el.classList.remove('jd-clip'); el.style.removeProperty('--jd-mh');
      els.push(el);
    });
    var topLimit = pr.top + MARGIN * k;
    function excessOf(el) {
      if (el.classList.contains('jd-clip')) {
        var r = el.getBoundingClientRect();
        return Math.max(r.bottom - limit, topLimit - r.top);
      }
      var rg = document.createRange(); rg.selectNodeContents(el);
      var c = rg.getBoundingClientRect();
      return c.height > 0 ? c.bottom - limit : 0;
    }
    var over = false, done = [];
    for (var pass = 0; pass < 60; pass++) {
      var worst = null, we = 1;
      for (var i = 0; i < els.length; i++) {
        if (done.indexOf(els[i]) >= 0) continue;
        var ex = excessOf(els[i]);
        if (ex > we) { we = ex; worst = els[i]; }
      }
      if (!worst) break;
      var act = document.activeElement, target = worst;
      for (var j = 0; j < els.length; j++) {
        if (done.indexOf(els[j]) < 0 && act && (els[j] === act || els[j].contains(act))) { target = els[j]; break; }
      }
      var r2 = target.getBoundingClientRect();
      var cur;
      if (target.classList.contains('jd-clip')) cur = r2.height / k;
      else { var rg2 = document.createRange(); rg2.selectNodeContents(target); cur = (rg2.getBoundingClientRect().bottom - r2.top) / k; }
      var nh = Math.max(0, cur - we / k);
      target.style.setProperty('--jd-mh', nh + 'px');
      target.classList.add('jd-clip');
      target.scrollTop = 0;
      over = true;
      if (nh === 0) done.push(target);
    }
    page.classList.toggle('jd-overflow', over);
    var b = page.querySelector(':scope>.jd-badge');
    if (!b) { b = document.createElement('div'); b.className = 'jd-badge'; b.textContent = 'Contenu trop long'; page.appendChild(b); }
    if (snap) {
      var s0 = snap; snap = null;
      if (isOver(page) && !s0.wasOver && s0.el.isConnected) {
        s0.el.innerHTML = s0.html;
        if (s0.caret != null) setCaret(s0.el, s0.caret);
        flash(page);
        run();
      }
    }
  }

  var snap = null, flashT = null;
  function isOver(page) { return page.classList.contains('jd-overflow') || page.classList.contains('content-overflow'); }
  function flash(page) {
    page.classList.add('jd-limit');
    clearTimeout(flashT);
    flashT = setTimeout(function () { page.classList.remove('jd-limit'); }, 2500);
  }
  function caretOffset(el) {
    var sel = getSelection();
    if (!sel.rangeCount) return null;
    var r = sel.getRangeAt(0);
    if (!el.contains(r.startContainer)) return null;
    var pre = document.createRange(); pre.selectNodeContents(el); pre.setEnd(r.startContainer, r.startOffset);
    return pre.toString().length;
  }
  function setCaret(el, off) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n, c = 0, sel = getSelection(), r = document.createRange();
    while ((n = w.nextNode())) {
      var l = n.nodeValue.length;
      if (c + l >= off) { r.setStart(n, off - c); r.collapse(true); sel.removeAllRanges(); sel.addRange(r); return; }
      c += l;
    }
    r.selectNodeContents(el); r.collapse(false); sel.removeAllRanges(); sel.addRange(r);
  }

  var t = null;
  function soon() { if (t) return; t = setTimeout(function () { t = null; run(); }, 30); }
  function start() {
    var page = document.querySelector('.page');
    if (!page) return;
    document.addEventListener('beforeinput', function (e) {
      if (!e.inputType || e.inputType.indexOf('insert') !== 0) return;
      var el = e.target && e.target.closest ? e.target.closest('[contenteditable="true"]') : null;
      if (!el || !page.contains(el)) return;
      if (isOver(page)) { e.preventDefault(); flash(page); return; }
      if (!snap) snap = { el: el, html: el.innerHTML, caret: caretOffset(el), wasOver: false };
    }, true);
    document.addEventListener('input', soon, true);
    new MutationObserver(soon).observe(page, { childList: true, subtree: true, characterData: true });
    window.addEventListener('load', function () { soon(); setTimeout(run, 600); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(soon);
    setTimeout(run, 50); setTimeout(run, 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
