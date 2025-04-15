import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/App.jsx'
import Navbar from './src/components/navber.jsx'
import CodeEditor from './src/components/codeEditor.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
