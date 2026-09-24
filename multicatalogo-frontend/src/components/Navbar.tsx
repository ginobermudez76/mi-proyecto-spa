// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Definimos la interfaz para las props (compatible con ambas convenciones de llamada)
interface NavbarProps {
  toggleSidebar?: () => void;
  onToggleSidebar?: () => void;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

const Navbar = ({ toggleSidebar, onToggleSidebar }: NavbarProps) => {
  const { totalItems } = useCart();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (toggleSidebar) toggleSidebar();
    else if (onToggleSidebar) onToggleSidebar();
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-20">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Botón Hamburguesa siempre visible */}
        <button
          onClick={handleToggle}
          type="button"
          className="p-2 rounded-md hover:bg-slate-100 transition text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          aria-label="Alternar menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-slate-600 font-medium text-base md:text-lg hidden sm:block">
          {user?.rol === "admin" ? "Panel de Administración" : "Tienda MultiCatálogo"}
        </h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link
          to="/carrito"
          className="relative p-2 hover:bg-slate-100 rounded-full transition cursor-pointer"
          aria-label="Ver Carrito de Compras"
        >
          <span className="text-xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-xs animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm text-slate-500 hidden sm:block">{user?.email}</span>
          <span
            className={`hidden md:inline-block text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
              user?.rol === "admin"
                ? "bg-amber-100 text-amber-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {user?.rol}
          </span>

          <div ref={dropdownRef} className="relative group cursor-pointer pb-2">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 flex items-center justify-center focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              aria-label="Menú de usuario"
            >
              <img
                src="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/user/100";
                }}
              />
            </button>

            <div
              className={`absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg transition-all duration-200 z-50 p-1.5 ${
                dropdownOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              }`}
            >
              <div className="px-3 py-2 border-b border-slate-100 md:hidden">
                <p className="text-xs text-slate-400">Conectado como</p>
                <p className="text-xs font-semibold text-slate-700 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-indigo-50 text-indigo-600">
                  {user?.rol}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
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
