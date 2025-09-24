// services/product.ts
import axiosClient from '@/lib/bootstrap'

export type Product = {
  id: number
  name: string
  price: number
  stock: number
  isActive: boolean
  image?: string
  description?: string
  supplier?: string
  category?: string
  createdAt?: string
  updatedAt?: string
  minStock: number
  categoryId: number
  supplierId: number
}

export type CreateProductDto = {
  name: string
  price: number
  stock: number
}
export type LowStockProduct ={
        id: number,
        name: string,
        stock: number,
        minStock: number,
        category: string,
        supplier: string,
        alert: string
}
// Listar todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosClient.get('/products')
  console.log('Products fetched:', data)
  return data
}
// Listar todos los productos
export const getProductsBySupplier = async (id:number): Promise<Product[]> => {
  const { data } = await axiosClient.get(`/products/supplier/${id}`)
  console.log('Products supplier fetched:', data)
  return data
}


// Listar todos los productos 5 con stock bajo
export const getProductsLowStock = async (): Promise<LowStockProduct[]> => {
  const { data } = await axiosClient.get('/products/stock-low')
  console.log('Products stock-low fetched:', data)
  return data
}


// Obtener producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await axiosClient.get(`/products/${id}`)
  return data
}

// Crear nuevo producto
export const createProduct = async (payload: CreateProductDto): Promise<Product> => {
  const { data } = await axiosClient.post('/products', payload)
  return data
}
// Crear nuevo producto
export const createProducts = async (payload: CreateProductDto[]): Promise<Product[]> => {
  console.log('Payload to create products:', payload)
  alert('Payload to create products bulk front:\n' + JSON.stringify(payload, null, 2))
  const { data } = await axiosClient.post('/products/bulk', payload)
  return data
}
// Eliminar producto por ID
export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`)
}

// Actualizar producto (descomentá cuando el servicio esté disponible)
export const updateProduct = async (id: number, payload: Partial<CreateProductDto>): Promise<Product> => {
  const { data } = await axiosClient.put(`/products/${id}`, payload)
  return data
}
