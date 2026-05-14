import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { AuthProvider } from './context/AuthContext.jsx';
// import { store } from './app/store/store.js'

createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
    <App />
    </AuthProvider>
  
)
