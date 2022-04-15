import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/ui/Alerta";
import { clienteAxios } from "../config/axios";

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 3) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <Fragment>
      <h1 className="text-indigo-600 font-black text-6xl">
        Recupera tu acceso
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Email"
            className=" bg-indigo-700 w-full text-white py-3 px-10 mt-5 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-8 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta, Iniciar Sesión?
          </Link>
        </nav>
      </div>
    </Fragment>
  );
};
