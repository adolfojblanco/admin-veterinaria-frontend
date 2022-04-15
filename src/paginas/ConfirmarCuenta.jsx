import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerta } from "../components/ui/Alerta";

export const ConfirmarCuenta = () => {
  const [cunetaConfirmada, setCunetaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`;
        const { data } = await axios.get(url);
        setCunetaConfirmada(true);
        setAlerta({ msg: data.msg });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <Fragment>
      <h1 className="text-indigo-600 font-black text-6xl">
        Confirma tu cuenta y comeninza a adminstrar tus pacientes
        <span className="text-black"> pacientes</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.msg && <Alerta alerta={alerta} />}
        {cunetaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Inciar Sesion
          </Link>
        )}
      </div>
    </Fragment>
  );
};
