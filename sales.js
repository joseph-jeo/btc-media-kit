(() => {
  'use strict';
  const recipient = 'info@jeopublishing.com';
  const placement = document.getElementById('campaign-package');
  const goal = document.getElementById('campaign-goal');
  const timing = document.getElementById('campaign-timing');
  const email = document.getElementById('email-brief');
  const status = document.getElementById('brief-status');
  const fallback = document.getElementById('brief-fallback');
  const subject = 'Between the Covers — advertising proposal';
  const brief = () => [
    'Hello BTC team,', '', 'I’d like a proposal for my business.', '',
    `Interest: ${placement.value}`, `Goal: ${goal.value}`, `Timing: ${timing.value}`, '',
    'Business name / website:', 'Location / target market:', 'Budget and currency:', '',
    'Please include suitable placements, dates, pricing, current audience figures and the available campaign measurement.', '',
    'Name and contact details:'
  ].join('\n');
  const update = () => {
    email.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief())}`;
    fallback.value = `To: ${recipient}\nSubject: ${subject}\n\n${brief()}`;
    status.textContent = '';
    fallback.hidden = true;
  };
  document.getElementById('campaign-brief').addEventListener('submit', event => event.preventDefault());
  [placement, goal, timing].forEach(field => field.addEventListener('change', update));
  document.querySelectorAll('[data-package]').forEach(link => {
    link.addEventListener('click', () => {
      const choice = link.dataset.package;
      if (Array.from(placement.options).some(option => option.value === choice)) placement.value = choice;
      update();
      track('media_kit_select_package', { placement: choice });
    });
  });
  document.getElementById('copy-brief').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(fallback.value);
      status.textContent = 'Brief copied. Paste it into an email to info@jeopublishing.com, add your details and send.';
    } catch (_) {
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = 'Select and copy the brief below, then email it to info@jeopublishing.com.';
    }
    track('media_kit_copy_brief');
  });

  // Existing BTC web property, verified in www.betweenthecoversmag.com HTML.
  // Optional analytics only loads after a visitor explicitly chooses Allow.
  // No free-text contact details, email contents or full URL queries are sent.
  const measurementId = 'G-SQG30Y89B6';
  const consentKey = 'btc_media_kit_analytics';
  const banner = document.getElementById('analytics-choice');
  let enabled = false;
  let loaded = false;
  let consent = null;
  const production = ['mediakit.betweenthecoversmag.com', 'joseph-jeo.github.io'].includes(location.hostname);
  try { consent = localStorage.getItem(consentKey); } catch (_) { /* Navigation works without storage. */ }
  function track(eventName, params = {}) {
    if (!enabled || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, { ...params, page_location: location.origin + location.pathname });
  }
  function enableAnalytics() {
    if (!production) return;
    enabled = true;
    window[`ga-disable-${measurementId}`] = false;
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  function choose(value) {
    consent = value;
    try { localStorage.setItem(consentKey, value); } catch (_) { /* Session choice still applies. */ }
    banner.hidden = true;
    if (value === 'granted') enableAnalytics();
    else {
      enabled = false;
      window[`ga-disable-${measurementId}`] = true;
    }
  }
  if (consent === 'granted') enableAnalytics();
  // Show the optional choice when a visitor reaches the audience section.
  // Delaying its appearance keeps the initial advertising offer readable.
  if (!consent && production && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!consent) banner.hidden = false;
        observer.disconnect();
      }
    });
    observer.observe(document.getElementById('audience'));
  }
  document.getElementById('allow-analytics').addEventListener('click', () => choose('granted'));
  document.getElementById('decline-analytics').addEventListener('click', () => choose('denied'));
  document.getElementById('analytics-settings').addEventListener('click', () => { banner.hidden = false; });
  document.querySelectorAll('[data-cta]').forEach(link => {
    link.addEventListener('click', () => {
      const action = link.dataset.cta;
      const event = action === 'phone' ? 'media_kit_phone_intent' : action.includes('email') ? 'media_kit_email_intent' : 'media_kit_proposal_click';
      track(event, { cta_location: action });
    });
  });
  // An email click is an intent signal, never a submitted lead or confirmed sale.
  update();
})();
