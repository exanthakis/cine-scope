import router from '@/router'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID

export const loadGoogleAnalytics = () => {
  if (document.getElementById('ga-script')) return

  // Load gtag script
  const script = document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  const inlineScript = document.createElement('script')
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
  `
  document.head.appendChild(inlineScript)

  script.onload = () => {
    setTimeout(() => {
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'page_view', {
          page_path: window.location.pathname + window.location.search,
          page_location: window.location.href,
          page_title: document.title,
        })
      }
    }, 200)
  }

  // Track SPA page views
  router.afterEach((to) => {
    if ((window as any).gtag) {
      ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: to.fullPath,
      })
    }
  })
}
