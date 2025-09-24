import axiosClient from '@/lib/bootstrap'

export type Category = {
  id?: number
  name: string
}

export const getCategory = async (): Promise<Category[]> => {

  try {
      const { data } = await axiosClient.get('/Category')

      return data
  } catch (error) {
    console.error('Error en getCategory:', error)
    // res.status(500).json({ error: 'Error interno del servidor' })
    return []
  }

}

export const getCategoryById = async (id: number): Promise<Category> => {
  const { data } = await axiosClient.get(`/Category/${id}`)
  return data
}

export const createCategory = async (payload: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const { data } = await axiosClient.post('/Category', payload)
  return data
}
// export const createCategory = async ({ name }: { name: string }) => {
//   const { data } = await axiosClient.post("/categories", { name });
//   return data; // { id, name }
// };

export const updateCategory = async (id: number, payload: Partial<Category>): Promise<Category> => {
  const { data } = await axiosClient.put(`/Category/${id}`, payload)
  return data
}

export const deleteCategory = async (id: string): Promise<void> => {
  // alert(id)
  await axiosClient.delete(`/Category/${id}`)
}