import axiosClient from '@/lib/bootstrap'

export type Client = {
  id: number
  name: string
  email?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export const getClients = async (): Promise<Client[]> => {
  const { data } = await axiosClient.get('/clients')
  return data
}
// client-service.ts
export const getLastClient = async () => {
  try {
    const response = await axiosClient.get("/clients/last"); // ← ¿Esta ruta existe?

    console.log(response.data)
    if(response.data){
      console.log("NO")
      return {}
    }
    return response;
  } catch (error) {
    console.error("Error fetching last client:", error);
    throw error;
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  const { data } = await axiosClient.get(`/clients/${id}`)
  return data
}

export const createClient = async (payload: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
  console.log('Creating client with payload service:', payload);
  // alert(JSON.stringify(payload))
  const { data } = await axiosClient.post('/clients', payload)
  return data
}

export const updateClient = async (id: number, payload: Partial<Client>): Promise<Client> => {
  const { data } = await axiosClient.put(`/clients/${id}`, payload)
  return data
}

export const deleteClient = async (id: number): Promise<void> => {
  await axiosClient.delete(`/clients/${id}`)
}