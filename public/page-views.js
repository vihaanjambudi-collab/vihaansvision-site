const PAGE_VIEW_ENDPOINT = 'https://script.google.com/macros/s/AKfycbybOnOcQWjW_WIawI4jyelWP0Z50O_XR50tvxkh2kGvpNrW26uhjAJznKhKkilSMndTlw/exec';

const trackPageView = () => {
  if (!PAGE_VIEW_ENDPOINT) {
    return;
  }

  const data = new URLSearchParams({
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(PAGE_VIEW_ENDPOINT, data);
    return;
  }

  fetch(PAGE_VIEW_ENDPOINT, {
    method: 'POST',
    body: data,
    mode: 'no-cors',
    keepalive: true,
  }).catch(() => {});
};

trackPageView();
