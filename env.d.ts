/// <reference types="vite/client" />
interface Window {
  dataLayer: unknown[]
  gtag: (...args: [command: 'js' | 'config' | 'event', ...params: unknown[]]) => void
}
