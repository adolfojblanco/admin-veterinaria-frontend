import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const OlvidePassword = () => {

  return (
    <Fragment>
      <h1 className="text-indigo-600 font-black text-6xl">
        Recupera tu acceso
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form>
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
            />
          </div>

          <input
            type="submit"
            value="ENviar Email"
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
