import { useContext } from "react";
import PacintesContext from "../context/PacintesProvider";

const usePacientes = () => {
  return useContext(PacintesContext);
};

export default usePacientes;
