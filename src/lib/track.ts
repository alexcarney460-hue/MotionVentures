const VISITOR_KEY = 'mv_visitor_id';
const SESSION_KEY = 'mv_session_id';

function getOrCreate(key: string): string {
  if (typeof window === 'undefined') return '';
  let val = localStorage.getItem(key);
  if (!val) {
    val = crypto.randomUUID();
    localStorage.setItem(key, val);
  }
  return val;
}

export function trackEvent(
  event_type: string,
  meta: Record<string, unknown> = {},
) {
  if (typeof window === 'undefined') return;

  const payload = {
    event_type,
    path: window.location.pathname,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    visitor_id: getOrCreate(VISITOR_KEY),
    session_id: sessionStorage.getItem(SESSION_KEY) || (() => {
      const id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
      return id;
    })(),
    utm: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    meta,
  };

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export function trackPageView() {
  trackEvent('pageview');
}
