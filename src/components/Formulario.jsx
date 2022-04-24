import React, { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes";
import { Alerta } from "./ui/Alerta";

export const Formulario = () => {
  const { guardarPaciente, paciente } = usePacientes();
  const [alerta, setAlerta] = useState({});
  const [mascota, setMascota] = useState({
    nombre: "Adolfo B",
    propietario: "Adolfo",
    email: "tets@trest.com",
    fecha: Date.now(),
    sintomas: "DOlor",
  });

  useEffect(() => {
    if (paciente?.nombre) {
      setMascota(paciente);
    }
  }, [paciente]);

  const { msg } = alerta;

  const { nombre, propietario, email, fecha, sintomas } = mascota;

  const handleInputs = ({ target }) => {
    setMascota({
      ...mascota,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    guardarPaciente(mascota);
    setAlerta({
      msg: "Guardado Correctamente",
    });
    setMascota({
      nombre: "",
      propietario: "",
      email: "",
      fecha: "",
      sintomas: "",
    });
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Registra tus pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y{" "}
        <span className="primary_color font-bold"> Administralos </span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="mascota" className="input-label">
            Nombre mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="input-form"
            name="nombre"
            value={nombre}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="input-label">
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="input-form"
            name="propietario"
            value={propietario}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="input-form"
            name="email"
            value={email}
            onChange={handleInputs}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="input-label">
            Fecha de Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="input-form"
            name="fecha"
            value={fecha}
            onChange={handleInputs}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="input-label">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="input-form"
            name="sintomas"
            value={sintomas}
            onChange={handleInputs}
          />
        </div>
        <input
          type="submit"
          value="Agregar Paciente"
          className="button-primary w-full "
        />
      </form>
    </>
  );
};
