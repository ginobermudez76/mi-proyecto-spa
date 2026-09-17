import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Catalogo from "./components/Catalogo";
import MiRed from "./components/MiRed";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta Pública de Login */}
            <Route path="/login" element={<Login />} />

            {/* Rutas Protegidas dentro del Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="mi-red" element={<MiRed />} />
              <Route path="carrito" element={<Carrito />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;