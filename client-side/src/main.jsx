import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeContextProvider from './components/contexts/ThemeContext.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'

import HttpApi from 'i18next-http-backend'
import { Suspense } from 'react'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ka', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspence: false }
  })




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </Suspense>
    </PersistGate>
  </Provider>
)
