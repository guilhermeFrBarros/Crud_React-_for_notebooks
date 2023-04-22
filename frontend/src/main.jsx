import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App'

import { LoginContextProvider } from './context/LoginContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <App />
  </LoginContextProvider>
  
)
