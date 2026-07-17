const PAGE_VIEW_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxLtX22awsgmcjVi0zM0XpojuXX1LWu0_kg3DT5BQQwQA6PYG-70CEoG20Fk1Mnd1Fn8Q/exec';

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
    cacheBust: String(Date.now()),
  });

  const url = `${PAGE_VIEW_ENDPOINT}?${data.toString()}`;

  fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-store',
    keepalive: true,
  }).catch(() => {
    const tracker = document.createElement('img');
    tracker.src = url;
    tracker.alt = '';
    tracker.width = 1;
    tracker.height = 1;
    tracker.style.position = 'absolute';
    tracker.style.left = '-9999px';
    tracker.style.width = '1px';
    tracker.style.height = '1px';

    document.body.appendChild(tracker);
    setTimeout(() => tracker.remove(), 10000);
  });
};

trackPageView();
