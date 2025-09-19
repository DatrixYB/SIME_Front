'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/services/user-service';
import { getMe } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

type User = { id: string; name: string; email: string; role: UserRole ,sub:string};
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Llamada al backend, cookies HTTP-only serán enviadas automáticamente
        const res = await getMe();
        // const res = (await cookies()).get('access_token') 
        // ? await getMe() : { success: false, user: null };
        console.log(res)
        console.log('Usuario autenticado:', res);
        if (res?.success && res.user) {
          setUser(res.user);
        } else {
          setUser(null); // token inválido o expirado
          // router.push('/'); 
        }
      } catch (err) {
        console.error('Error al obtener usuario:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return context;
};
