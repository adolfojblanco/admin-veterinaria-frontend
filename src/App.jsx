import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import { ConfirmarCuenta } from "./paginas/ConfirmarCuenta";
import { Login } from "./paginas/Login";
import { OlvidePassword } from "./paginas/OlvidePassword";
import { Registrar } from "./paginas/Registrar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* definimos el layout principal del grupo de rutas */}
        <Route path="/" element={<AuthLayout />}>
          {/* indicamos cual es la pagina principal */}
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="confirmar-cuenta" element={<ConfirmarCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
