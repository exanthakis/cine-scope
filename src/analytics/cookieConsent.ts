import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { loadGoogleAnalytics } from './google'

export const setupCookieConsent = () => {
  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: 'box wide',
        position: 'bottom center',
      },
      preferencesModal: {
        layout: 'box',
      },
    },
    categories: {
      analytics: {
        enabled: false,
        readOnly: false,
      },
    },
    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: '🍪 We use cookies!',
            description:
              'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            sections: [
              {
                title: 'Cookie usage',
                description:
                  'We use cookies to ensure basic functionality and to analyze website traffic.',
              },
              {
                title: 'Analytics cookies',
                description: 'Used to track site usage.',
                linkedCategory: 'analytics',
              },
            ],
          },
        },
      },
    },
    onFirstConsent: () => {
      console.log('onFirstAction fired')
    },

    onConsent: ({ cookie }) => {
      console.log('onConsent fired ...')
      if (cookie?.categories.includes('analytics')) {
        loadGoogleAnalytics()
      }
    },

    onChange: () => {
      console.log('onChange fired ...')
    },
  })
}
