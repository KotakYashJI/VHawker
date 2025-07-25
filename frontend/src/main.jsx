import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Store } from './store/datastore.jsx'
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={true}
      draggable
      theme="light"
    />
    <App />
  </Provider>
)
