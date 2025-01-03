import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

axios.interceptors.request.use(function (config) {
  if(localStorage.my_token)
      config.headers.Authorization = "Bearer " + localStorage.my_token;
  return config;
});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
