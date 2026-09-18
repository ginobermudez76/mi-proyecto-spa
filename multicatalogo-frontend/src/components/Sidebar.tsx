import { NavLink } from "react-router-dom";
import GoogleIcon from "./common/GoogleIcon";

interface SidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: "dashboard" },
    { to: "/catalogo", label: "Catálogo", icon: "storefront" },
    { to: "/mi-red", label: "Mi Red", icon: "diversity_3" },
  ];

  return (
    <>
      {/* Fondo oscuro (Backdrop) solo en pantallas móviles cuando el menú está abierto */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-label="Cerrar menú lateral"
        />
      )}

      {/* Menú lateral (Sidebar) */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          w-64 bg-slate-900 text-white flex flex-col
          transition-all duration-300 ease-in-out shrink-0 select-none shadow-xl border-r border-slate-800
        `}
      >
        {/* Encabezado / Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-800 overflow-hidden">
          {/* Logo en versión extendida o móvil */}
          <div
            className={`flex items-center gap-3 w-full ${
              isCollapsed ? "md:hidden" : "flex"
            }`}
          >
            {/* En pantallas pequeñas (< md): Botón para contraer el sidebar */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 -ml-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer flex items-center justify-center"
              aria-label="Contraer menú lateral"
              title="Contraer menú lateral"
            >
              <GoogleIcon name="menu_open" size={24} />
            </button>

            {/* En pantallas medianas y grandes (>= md): Icono de marca MC */}
            <span className="hidden md:flex w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center font-black text-white shadow-md shrink-0">
              MC
            </span>

            {/* Nombre de la aplicación */}
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent truncate">
              MultiCatálogo
            </span>
          </div>

          {/* Logo en versión colapsada de escritorio */}
          {isCollapsed && (
            <div className="hidden md:flex w-full items-center justify-center">
              <span
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-lg text-white shadow-md cursor-pointer hover:scale-105 transition"
                title="MultiCatálogo"
              >
                MC
              </span>
            </div>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => onCloseMobile?.()}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                } ${isCollapsed ? "md:justify-center md:px-0" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <GoogleIcon
                    name={item.icon}
                    size={22}
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-indigo-400"
                    }`}
                  />
                  <span
                    className={`truncate transition-opacity duration-200 ${
                      isCollapsed ? "md:hidden" : "block"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Pie del Sidebar */}
        <div
          className={`p-4 border-t border-slate-800 text-xs text-slate-500 text-center ${
            isCollapsed ? "md:hidden" : "block"
          }`}
        >
          <span>v1.0.0 &bull; Catálogo Multinivel</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
