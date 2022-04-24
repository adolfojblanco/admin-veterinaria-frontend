import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alerta } from "../components/ui/Alerta";
import { clienteAxios } from "../config/axios";
import useAuth from "../hooks/useAuth";

export const Login = () => {
  const [alerta, setAlerta] = useState({});
  const [login, setLogin] = useState({
    email: "ajblanco156@gmail.com",
    password: "Ablanco156*",
  });

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { email, password } = login;
  const { msg } = alerta;

  const handleInputs = ({ target }) => {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      // Hacemos la peticion, guardamos en el storage y redirigimos
      const { data } = await clienteAxios.post("/veterinarios/login", login);
      setAuth(data)
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return;
    }
  };

  return (
    <Fragment>
      <div>
        <h1 className="primary_color font-black text-6xl">
          Inicia Sesión y Administra tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleForm}>
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
              name="email"
              value={email}
              onChange={handleInputs}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold "
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
              autoComplete="off"
              name="password"
              value={password}
              onChange={handleInputs}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className=" bg-indigo-700 w-full text-white py-3 px-10 mt-5 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-8 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta, registrate?
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide Password
          </Link>
        </nav>
      </div>
    </Fragment>
  );
};
