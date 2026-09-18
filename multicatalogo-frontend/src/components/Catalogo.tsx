import { useState } from "react";
import { useCart, type Producto } from "../context/CartContext";
import GoogleIcon from "./common/GoogleIcon";

const Catalogo = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const productos: Producto[] = [
    {
      id: 1,
      nombre: "Serum Revitalizante",
      precio: 45.0,
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      nombre: "Crema Hidratante Pro",
      precio: 32.5,
      img: "https://images.unsplash.com/photo-1608248597359-21b835973d40?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      nombre: "Tónico Purificante",
      precio: 28.0,
      img: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      nombre: "Mascarilla Nocturna",
      precio: 50.0,
      img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const handleAdd = (prod: Producto) => {
    addToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Catálogo de Productos
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Línea cosmética de alta gama para comercialización directa.
        </p>
      </div>

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
    </div>
  );
};

export default Catalogo;
