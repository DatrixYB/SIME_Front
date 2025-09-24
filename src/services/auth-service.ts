import axiosClient from '@/lib/bootstrap'
// import Email from 'next-auth/providers/email'

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  MANAGER = 'MANAGER',
}

export type User = {
  id?: number
  email: string
  name?: string
  password: string
  role?: UserRole
  image?: string
  createdAt?: string
  updatedAt?: string
  code?: string
}

export const getUserSignIn = async (payload: { email: string; password: string }): Promise<{ success: boolean; message?: string; user?: User , access_token?:string}> => {
  try {
    console.log("Payload login:", payload);

    const { data } = await axiosClient.post('/auth/login', 
      { email: payload.email, password: payload.password },
      { withCredentials: true } // <- importante para cookies HTTP-only
    );

    return data;
  } catch (err: any) {
    // console.error("Error login service:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Error al iniciar sesión",
    };
  }
};
// export const getUserSignIn = async (payload): Promise<User[]> => {
//   alert("SERvc"+JSON.stringify(payload))
//   console.log("payload service", payload)
//   const { data } = await axiosClient.post('/auth/login', { email:payload.email, password:payload.password })
//   return data
// }
export const getRefreshToken = async (refreshToken: string): Promise<User> => {
  const { data } = await axiosClient.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      withCredentials: true,
    }
  });
  return data;
};
export const getValidate = async (accessToken:string): Promise<User> => {
  const { data } = await axiosClient.get('/auth/validate', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    }
  });
  return data;
};


export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axiosClient.get(`/auth/${id}`)
  return data
}

export const createUserSignUp = async (payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    // alert("create"+JSON.stringify(payload))
  console.log("payload service PAY", payload)
  const { data } = await axiosClient.post('/auth/register',  { email:payload.email, name:payload.name, password:payload.password, code:payload.code ,role:UserRole.ADMIN}
    ,{ withCredentials: true }
  )
  return data
}


// services/auth-service.ts
export const getMe = async (): Promise<{ success: boolean; user?: User }> => {
    try {
    console.log("Getme:");

    const { data } = await axiosClient.get('/auth/me', 
      // { email: payload.email, password: payload.password },
      { withCredentials: true } // <- importante para cookies HTTP-only
    );

    return data;
  } catch (err: any) {
    // console.error("Error login service:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Error al iniciar sesión",
    };
  }
  // try {
  //   const res = await fetch('http://localhost:3001/auth/me', {
  //     method: 'GET',
  //     credentials: 'include', // importante para cookies HTTP-only
  //   });
  //   return await res.json();
  // } catch (err) {
  //   console.error('Error en getMe:', err);
  //   return { success: false };
  // }
};

export const logOut = async (): Promise<{ success: boolean; user?: User }> => {
    try {
    console.log("Out:");

    const { data } = await axiosClient.post('/auth/logout', 
      // { email: payload.email, password: payload.password },
      { withCredentials: true } // <- importante para cookies HTTP-only
    );

    return data;
  } catch (err: any) {
    // console.error("Error login service:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Error al iniciar sesión",
    };
  }

};
