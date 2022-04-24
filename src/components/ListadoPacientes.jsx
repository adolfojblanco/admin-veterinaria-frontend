import React from "react";
import usePacientes from "../hooks/usePacientes";
import { Paciente } from "./Paciente";

export const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            {" "}
            Listado Pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus pacientes{" "}
            <span className="primary_color font-bold">
              {" "}
              Pacientes y citas
            </span>
          </p>
          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            Comienza a agregar pacientes{" "}
            <span className="primary_color font-bold">
              y apareceran en este lugar
            </span>
          </h2>
        </>
      )}
    </>
  );
};
