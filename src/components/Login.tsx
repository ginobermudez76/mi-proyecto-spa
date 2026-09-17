import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "./common/GoogleIcon";

const Login = () => {
  const [email, setEmail] = useState<string>("admin@upse.edu.ec");
  const [password, setPassword] = useState<string>("123456");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulación de validación hardcodeada según la guía
    if (email.trim() === "admin@upse.edu.ec" && password === "123456") {
      setError("");
      login(email);
      navigate("/");
    } else {
      setError("Credenciales incorrectas. Usa admin@upse.edu.ec / 123456");
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@upse.edu.ec");
    setPassword("123456");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 relative overflow-hidden">
      {/* Elementos visuales de fondo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-100 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 mb-4">
            <GoogleIcon name="storefront" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            MultiCatálogo
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Ingresa a tu cuenta para continuar al panel administrativo
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-start gap-2.5 border border-red-200">
            <GoogleIcon name="error" size={20} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <GoogleIcon name="mail" size={20} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition text-slate-800 text-sm"
                placeholder="admin@upse.edu.ec"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <GoogleIcon name="lock" size={20} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition text-slate-800 text-sm"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          {/* Sugerencia de credenciales de demo */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold block text-slate-700">Credenciales Demo:</span>
              <span>admin@upse.edu.ec / 123456</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-indigo-600 hover:text-indigo-700 font-semibold underline cursor-pointer"
            >
              Autocompletar
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Iniciar Sesión</span>
            <GoogleIcon name="arrow_forward" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
