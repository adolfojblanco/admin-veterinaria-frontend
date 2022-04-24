import { createContext, useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";

export const AuthContext = createContext();

/** Este es el que contiene los datos
 * @returns context
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  // Comprobar el locaStorage
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Si es correcto lo ponemos en el state
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        // Si tenemos un error lo dejamos vacio
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  /**
   * Cerrrar Sesion, eliminar token
   */
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
