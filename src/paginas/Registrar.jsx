import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alerta } from "../components/ui/Alerta";
import { clienteAxios } from "../config/axios";

export const Registrar = () => {
  const [alerta, setAlerta] = useState({});
  const [veterinario, setVeterinario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = veterinario;

  const handleInputs = ({ target }) => {
    setVeterinario({
      ...veterinario,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, confirmar].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== confirmar) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mas de 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});
    try {
      const url = `/veterinarios/registrar`;
      await clienteAxios.post(url, veterinario);
      setAlerta({ msg: "Creado Correctamente", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  return (
    <Fragment>
      <h1 className="primary_color font-black text-6xl">
        Registrate y Administra tus
        <span className="text-black"> pacientes</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              name="nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
              value={nombre}
              onChange={handleInputs}
            />
          </div>

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
              name="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
              value={email}
              onChange={handleInputs}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={handleInputs}
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Confirmar Password
            </label>
            <input
              type="password"
              placeholder="Repite tu password"
              name="confirmar"
              autoComplete="off"
              value={confirmar}
              onChange={handleInputs}
              className="border w-full p-3 mt-3 bg-gray-50 rounded"
            />
          </div>

          <input
            type="submit"
            value="Registrate"
            className=" bg-indigo-700 w-full text-white py-3 px-10 mt-5 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-8 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta, Iniciar Sesión?
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
