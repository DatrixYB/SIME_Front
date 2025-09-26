import axiosClient from '@/lib/bootstrap'
export type PurchaseOrderItems = {
  id?: number
  orderId: number
  items?: PurchaseOrder[]
}
export type PurchaseOrder={
  productId: number
  quantity: number
  unitrice: number
}
export type  PurchaseOrderItem={
  orderId: number
  productId: number
  quantity: number
  unitrice: number
}

export const getPurchaseOrderItems = async (): Promise<PurchaseOrderItem[]> => {
  const { data } = await axiosClient.get('/purchaseorder-item')
  return data
}

export const getPurchaseOrderItemById = async (id: number): Promise<PurchaseOrderItem> => {
  const { data } = await axiosClient.get(`/purchaseorder-item/${id}`)
  return data
}
export const getPurchaseOrderById = async (id: number): Promise<PurchaseOrderItem> => {
  const { data } = await axiosClient.get(`/purchaseorder-item/order/${id}`)
  return data
}

export const createPurchaseOrderItem = async (
  payload: Omit<PurchaseOrderItem, 'id'>
): Promise<PurchaseOrderItem> => {
  // alert(JSON.stringify(payload))
  const { data } = await axiosClient.post('/purchaseorder-item', payload)
  return data
}
export const createPurchaseOrderItems = async (
  payload: Omit<PurchaseOrderItems, 'id'>
): Promise<PurchaseOrderItems> => {
  // alert(JSON.stringify(payload))
  // alert('payload de BULK ')
  const { data } = await axiosClient.post('/purchaseorder-item/bulk', payload)
  return data
}

export const updatePurchaseOrderItem = async (
  id: number,
  payload: Partial<PurchaseOrderItem>
): Promise<PurchaseOrderItem> => {
  const { data } = await axiosClient.put(`/purchaseorder-item/${id}`, payload)
  return data
}

export const deletePurchaseOrderItem = async (id: number): Promise<void> => {
  await axiosClient.delete(`/purchaseorder-item/${id}`)
}