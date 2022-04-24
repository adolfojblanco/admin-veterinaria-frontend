import { clienteAxiosToken } from "../config/axios";
import { createContext, useState, useEffect } from "react";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const { data } = await clienteAxiosToken.get("/pacientes");
        setPacientes(data.pacientes);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerPacientes();
  }, []);

  /**
   * Guardar el paciente en la base de datos
   * @param {paciente} paciente
   */
  const guardarPaciente = async (paciente) => {
    if (paciente._id) {
      try {
        const { data } = await clienteAxiosToken.put(
          `/pacientes/${paciente._id}`,
          paciente
        );
        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState._id === data.pacienteActualizado._id
            ? data.pacienteActualizado
            : pacienteState
        );

        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clienteAxiosToken.post("/pacientes", paciente);
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.paciente;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    try {
      const { data } = await clienteAxiosToken.delete(`/pacientes/${id}`);
      const pacientesActualizados = pacientes.filter((pacienteState) => pacienteState._id !== id)
      setPacientes(pacientesActualizados)
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
