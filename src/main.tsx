import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'   // <- karena file kamu "App.tsx" (huruf besar A)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
