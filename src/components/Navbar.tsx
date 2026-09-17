import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "./common/GoogleIcon";

interface NavbarProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const Navbar = ({ isCollapsed = false, onToggleSidebar }: NavbarProps) => {
  const { totalItems } = useCart();
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 z-20">
      {/* Sección Izquierda: Toggle y Título */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            type="button"
            aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
            title={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <GoogleIcon
              name={isCollapsed ? "menu_open" : "menu"}
              size={24}
              className="transition-transform duration-200"
            />
          </button>
        )}
        <h2 className="text-slate-700 font-semibold text-lg sm:text-xl tracking-tight flex items-center gap-2">
          <span>Panel de Administración</span>
        </h2>
      </div>

      {/* Sección Derecha: Carrito y Usuario */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Carrito de Compras */}
        <Link
          to="/carrito"
          className="relative p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
          title="Ver Carrito de Compras"
          aria-label="Carrito de compras"
        >
          <GoogleIcon name="shopping_cart" size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Separador */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* Información de Usuario y Avatar */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600 hidden md:block">
            {userEmail || "admin@upse.edu.ec"}
          </span>

          {/* Contenedor con menú desplegable al pasar el cursor */}
          <div className="relative group cursor-pointer py-1">
            {/* Círculo del usuario / Avatar */}
            <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border-2 border-indigo-100 shadow-sm flex items-center justify-center group-hover:border-indigo-400 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback visual si la red no carga la imagen externa
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <GoogleIcon name="account_circle" size={32} className="text-slate-400 hidden" />
            </div>

            {/* Menú desplegable */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1.5">
              <div className="px-3 py-2 border-b border-slate-100 md:hidden">
                <p className="text-xs text-slate-400">Conectado como</p>
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {userEmail || "admin@upse.edu.ec"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <GoogleIcon name="logout" size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
