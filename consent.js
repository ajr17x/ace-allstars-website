(function () {
  var CONSENT_KEY = 'adsConsent';
  var AW_ID = 'AW-18361145631';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function clearConsent() {
    try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
  }

  function loadAdsTag() {
    if (window.__adsTagLoaded) return;
    window.__adsTagLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', AW_ID);
  }

  var stored = getConsent();
  if (stored === 'granted') {
    loadAdsTag();
  }

  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');

  if (!stored && banner) {
    banner.hidden = false;
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('granted');
      loadAdsTag();
      if (banner) banner.hidden = true;
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      setConsent('denied');
      if (banner) banner.hidden = true;
    });
  }

  var prefsLink = document.getElementById('cookie-prefs-link');
  if (prefsLink) {
    prefsLink.addEventListener('click', function (e) {
      e.preventDefault();
      clearConsent();
      if (banner) banner.hidden = false;
    });
  }
})();
