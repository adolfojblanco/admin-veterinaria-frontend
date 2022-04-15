import React, { useEffect } from "react";

export const Alerta = ({ alerta }) => {


  return (
    <div
      className={`${
        alerta.error
          ? "from-red-500 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-br p-3 text-center font-bold rounded-xl uppercase text-white mb-10`}
    >
      {alerta.msg}
    </div>
  );
};
