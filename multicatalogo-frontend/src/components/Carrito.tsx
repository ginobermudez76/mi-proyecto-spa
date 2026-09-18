import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import GoogleIcon from "./common/GoogleIcon";

const Carrito = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Tu Carrito de Compras
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Revisa y gestiona los artículos seleccionados para tu orden.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <GoogleIcon name="remove_shopping_cart" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Tu carrito está vacío
          </h3>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Añade productos de cosmética desde nuestro catálogo para comenzar tu compra.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <GoogleIcon name="storefront" size={20} />
            <span>Ir al Catálogo</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/200`;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800 text-base sm:text-lg">
                      {item.nombre}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Precio unitario: ${item.precio.toFixed(2)}
                    </p>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Subtotal</p>
                    <p className="font-extrabold text-indigo-600 text-lg sm:text-xl">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Eliminar producto"
                    aria-label="Eliminar producto"
                  >
                    <GoogleIcon name="delete" size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de pago */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <GoogleIcon name="receipt_long" size={20} className="text-indigo-600" />
              <span>Resumen del Pedido</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío estimado</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Impuestos incluidos</span>
                <span className="text-slate-400">$0.00</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
              <div>
                <span className="text-slate-800 font-bold block text-sm">Total a Pagar</span>
                <span className="text-xs text-slate-400">IVA incluido</span>
              </div>
              <span className="text-2xl font-extrabold text-indigo-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                alert("¡Pedido realizado con éxito! Gracias por tu compra.");
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <GoogleIcon name="credit_card" size={20} />
              <span>Proceder al Pago</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
