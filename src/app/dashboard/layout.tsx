'use client'
import { Theme } from '@radix-ui/themes';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { UserProvider } from "@/hooks/context/user-context";
import { HeaderMovil } from "@/components/dashboard/headerMovil";
import { useEffect, useState } from 'react';
import { getValidate, User, UserRole } from '@/services/auth-service';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user,setUser ]= useState<User>()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
             const accessToken = localStorage.getItem('access_token');
             console.log("TOKEN MIDDLEWARE", accessToken)
             const res = await getValidate(accessToken);
      console.log('✅ Token válido:', res);
      setUser(res)
           } catch (error) {
             console.error("Error fetching suppliers:", error);
           }
         }
         fetchProducts();
       }, []);
    
    if (user?.role !== UserRole.ADMIN && user?.role !== UserRole.SELLER) {
        // return <div className="p-6">Acceso denegado. No tenés permiso para ver este contenido.</div>;
     console.log("NO TENES PERMISO")
     console.log(user)
      }
  return (
    <Theme appearance="light" accentColor="blue" grayColor="sand" radius="large" scaling="95%">
      <UserProvider>
        <div className="flex h-screen overflow-hidden">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <div className="flex md:hidden">
            <HeaderMovil />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </UserProvider>
    </Theme>
  );
}