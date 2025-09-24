// lib/axiosClient.ts
import axios from 'axios'

// Define la URL base según entorno
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
console.log(baseURL)
// Crea instancia de cliente Axios
const axiosClient = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor: añade token si existe
axiosClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('ACCESS_TOKEN') : null
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor: maneja errores comunes
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('ACCESS_TOKEN')
    }
    return Promise.reject(error)
  }
)

export default axiosClient