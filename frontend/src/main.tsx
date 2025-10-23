import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/app.css'
import { OnboardingProvider } from './utils/onboardingStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <OnboardingProvider>
        <App />
      </OnboardingProvider>
    </BrowserRouter>
  </React.StrictMode>
)
