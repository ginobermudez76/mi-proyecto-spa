import { useState, useEffect } from "react";
import { useCart, type Producto } from "../context/CartContext";
import { getProductosApi } from "../services/api";
import GoogleIcon from "./common/GoogleIcon";

const Catalogo = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleReload = () => {
    setIsLoading(true);
    setError("");
    getProductosApi()
      .then((data) => {
        setProductos(data);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar los productos del catálogo."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    getProductosApi()
      .then((data) => {
        if (isMounted) {
          setProductos(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al cargar los productos del catálogo."
          );
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdd = (prod: Producto) => {
    addToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Catálogo de Productos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Línea cosmética obtenida en tiempo real desde la API REST (Backend Go).
          </p>
        </div>
        <button
          onClick={handleReload}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          title="Recargar catálogo desde el backend"
        >
          <GoogleIcon
            name="refresh"
            size={18}
            className={isLoading ? "animate-spin text-indigo-600" : "text-slate-500"}
          />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Estado de Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl text-red-600">
              <GoogleIcon name="error" size={24} />
            </div>
            <div>
              <p className="font-semibold text-sm">No se pudo cargar el catálogo</p>
              <p className="text-xs text-red-600/90 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <GoogleIcon name="replay" size={16} />
            <span>Reintentar</span>
          </button>
        </div>
      )}

      {/* Estado de Carga (Skeletons) */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm p-4 animate-pulse flex flex-col space-y-4"
            >
              <div className="h-44 bg-slate-200 rounded-xl w-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-6 bg-slate-200 rounded-md w-1/3 mt-2"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Lista de Productos cargada desde Backend */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map((prod) => {
            const isJustAdded = addedId === prod.id;
            return (
              <div
                key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={prod.img}
                  alt={prod.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Respaldo confiable con placeholder en caso de fallo de red
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${prod.id}/400/300`;
                  }}
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Premium
                </span>
              </div>

              {/* Información y Botón */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                  {prod.nombre}
                </h3>
                <p className="text-indigo-600 font-extrabold text-xl mt-2 mb-4">
                  ${prod.precio.toFixed(2)}
                </p>

                <button
                  onClick={() => handleAdd(prod)}
                  className={`mt-auto w-full py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isJustAdded
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-900 text-white hover:bg-indigo-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  <GoogleIcon
                    name={isJustAdded ? "check_circle" : "add_shopping_cart"}
                    size={18}
                  />
                  <span>{isJustAdded ? "¡Añadido!" : "Añadir al Carrito"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Catalogo;
