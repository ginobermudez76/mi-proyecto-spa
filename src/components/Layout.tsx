import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} />
      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar isCollapsed={isCollapsed} onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
