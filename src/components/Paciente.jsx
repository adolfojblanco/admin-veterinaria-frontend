import React from "react";
import usePacientes from "../hooks/usePacientes";

export const Paciente = ({ paciente }) => {
  const { setEdicion, eliminarPaciente } = usePacientes();
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase primary_color my-1">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase primary_color my-1">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>
      <p className="font-bold uppercase primary_color my-1">
        Email Contacto:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase primary_color my-1">
        Fecha Alta:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>
      <p className="font-bold uppercase primary_color my-1">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex justify-between my-5">
        <button type="button" className="button-primary py-2 px-10" onClick={() => setEdicion(paciente)}>
          Editar
        </button>
        <button type="button" className="button-danger" onClick={() => eliminarPaciente(_id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
