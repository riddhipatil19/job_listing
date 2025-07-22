import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Import Radix UI styles
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>

{/* className="light"
className="light-theme"
className="dark"
className="dark-theme" */}

    <Theme className="light-theme">
      <App />
    </Theme>
    
  </BrowserRouter>
)
