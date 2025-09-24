import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
// Update the import path to the correct relative path if the alias does not resolve
import { getProductsLowStock } from '../../services/product-service'
import { LowStockProduct } from '@/services/product-service'

export default function NotificationBell() {
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([])

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const products = await getProductsLowStock()
        // products =[0]
        setLowStockProducts(products)
        console.log("No se pudo cargar el stock");
      } catch (error) {
        console.error('Error al obtener productos con bajo stock:', error)
      }
    }

    fetchLowStock()
  const interval = setInterval(fetchLowStock, 10*60000) // cada 60 segundos
  return () => clearInterval(interval)
  }, [])

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {lowStockProducts.length > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {lowStockProducts.length}
        </span>
      )}
    </Button>
  )
}