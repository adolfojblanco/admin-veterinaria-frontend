import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacintesProvider";

import { AuthLayout } from "./layout/AuthLayout";
import { RutaProtegida } from "./layout/RutaProtegida";
import { AdministrarPacientes } from "./paginas/AdministrarPacientes";

import { ConfirmarCuenta } from "./paginas/ConfirmarCuenta";
import { Login } from "./paginas/Login";
import { NuevoPassword } from "./paginas/NuevoPassword";
import { OlvidePassword } from "./paginas/OlvidePassword";
import { Registrar } from "./paginas/Registrar";

AuthProvider;
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          {/** Rutas publicas */}
          <Routes>
            {/* definimos el layout principal del grupo de rutas */}
            <Route path="/" element={<AuthLayout />}>
              {/* indicamos cual es la pagina principal */}
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route>
              {/** Rutas autenticadas */}
              <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdministrarPacientes />} />
              </Route>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
