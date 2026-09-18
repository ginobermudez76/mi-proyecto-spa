import GoogleIcon from "./common/GoogleIcon";

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Resumen General
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Métricas clave de desempeño, ventas de red y jerarquía actual.
        </p>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ventas Totales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
              Ventas Totales
            </p>
            <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <GoogleIcon name="payments" size={24} />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 mt-3 tracking-tight">
            $12,450.00
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <GoogleIcon name="trending_up" size={16} />
            <span>+14.5% vs. mes anterior</span>
          </div>
        </div>

        {/* Referidos Activos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
              Referidos Activos
            </p>
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <GoogleIcon name="group" size={24} />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 mt-3 tracking-tight">
            24
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <GoogleIcon name="person_add" size={16} />
            <span>3 nuevos afiliados esta semana</span>
          </div>
        </div>

        {/* Nivel Actual */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
              Nivel Actual
            </p>
            <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <GoogleIcon name="diamond" size={24} />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 mt-3 tracking-tight flex items-center gap-2">
            Diamante
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
            <GoogleIcon name="verified" size={16} />
            <span>Comisión máxima alcanzada (22%)</span>
          </div>
        </div>
      </div>

      {/* Banner / Actividad reciente */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">
            ¡Felicidades por tus logros este mes!
          </h2>
          <p className="text-slate-300 text-sm max-w-xl">
            Tu red de distribución ha crecido un 18% este trimestre. Explora el catálogo para conocer nuevos lanzamientos y compartir enlaces directos de compra.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/catalogo"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <GoogleIcon name="storefront" size={18} />
            <span>Ver Catálogo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
