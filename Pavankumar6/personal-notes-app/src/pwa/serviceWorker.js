// This file registers a service worker to enable a Progressive Web App (PWA)
// behavior with offline support.

// Check if we are running on localhost
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 block for IPv4 localhost addresses
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
      )
  );
  
  /**
   * Register the service worker, if available, using the given configuration.
   */
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Construct the URL of the service worker file
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Service worker won't work if PUBLIC_URL is on a different origin.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // For localhost, check if a service worker still exists.
          checkValidServiceWorker(swUrl, config);
          navigator.serviceWorker.ready.then(() => {
            console.log('This web app is running in cache-first mode by a service worker.');
          });
        } else {
          // Register service worker normally for production environments.
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  /**
   * Register a valid service worker.
   */
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Updated content is available; invoke callback if provided.
                console.log('New content is available; please refresh.');
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // Content is cached for offline use.
                console.log('Content is cached for offline use.');
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }
  
  /**
   * Check if a valid service worker exists. If not, reload the page.
   */
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No service worker found; unregister and reload.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found; proceed with registration.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('No internet connection found. App is running in offline mode.');
      });
  }
  
  /**
   * Unregister any existing service worker.
   */
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }
  