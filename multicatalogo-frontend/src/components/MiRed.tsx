import GoogleIcon from "./common/GoogleIcon";

const MiRed = () => {
  const referidos = [
    {
      id: 1,
      nombre: "Ana García",
      email: "ana.garcia@gmail.com",
      nivel: "Nivel 1",
      ventas: "$1,200",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Luis Poveda",
      email: "luis.poveda@hotmail.com",
      nivel: "Nivel 1",
      ventas: "$850",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Marta Sánchez",
      email: "marta.sanchez@outlook.com",
      nivel: "Nivel 2",
      ventas: "$430",
      estado: "Activo",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Mi Red de Referidos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualiza y administra los miembros de tu red de distribución y sus comisiones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-indigo-50 text-indigo-700 font-semibold text-xs px-3 py-1.5 rounded-lg border border-indigo-100 flex items-center gap-1.5">
            <GoogleIcon name="group" size={16} />
            3 Referidos en total
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 sm:px-6 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Afiliado / Nombre
                </th>
                <th className="p-4 sm:px-6 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Jerarquía
                </th>
                <th className="p-4 sm:px-6 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Ventas Mensuales
                </th>
                <th className="p-4 sm:px-6 font-semibold text-slate-600 text-xs uppercase tracking-wider text-right">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referidos.map((ref) => (
                <tr
                  key={ref.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-4 sm:px-6 text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-100 to-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                        {ref.nombre.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{ref.nombre}</p>
                        <p className="text-xs text-slate-400">{ref.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 text-slate-600">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      <GoogleIcon name="account_tree" size={14} className="text-indigo-500" />
                      {ref.nivel}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-indigo-600 font-bold text-base">
                    {ref.ventas}
                  </td>
                  <td className="p-4 sm:px-6 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {ref.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MiRed;
