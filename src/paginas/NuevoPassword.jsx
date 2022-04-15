import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerta } from "../components/ui/Alerta";
import { clienteAxios } from "../config/axios";

export const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const { token } = useParams();
  const { msg } = alerta;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const data = await clienteAxios.get(
          `/veterinarios/olvide-password/${token}`
        );
        console.log(data);
        setAlerta({
          msg: "Coloca tu nueva contraseña",
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mas de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
      });
      setTokenValido(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-indigo-600 font-black text-6xl">
        Restablece tu contraseña
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Tu nuevo password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
            />
          </div>

          <input
            type="submit"
            value="Cambiar"
            className=" bg-indigo-700 w-full text-white py-3 px-10 mt-5 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        {tokenValido && (
          <nav className="mt-8 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-500" to="/">
              ¿Iniciar Sesión?
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};
