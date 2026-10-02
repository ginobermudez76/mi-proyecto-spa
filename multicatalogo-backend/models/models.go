// Declaramos el paquete models para agrupar las estructuras de datos de la aplicación.
package models

// APIError estandariza la estructura de los mensajes de error HTTP en la API.
// Contiene Status (código HTTP numérico), Message (descripción general legible) y Details (información detallada o técnica opcional).
type APIError struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Details interface{} `json:"details,omitempty"`
}

// Error implementa la interfaz error estándar de Go para permitir usar APIError como error nativo.
func (e APIError) Error() string {
	return e.Message
}

// LoginRequest define la estructura esperada para el cuerpo de la petición (JSON) al iniciar sesión.
type LoginRequest struct {
	// Email representa el correo del usuario; la etiqueta `json:"email"` indica cómo se mapea el JSON a esta variable.
	Email string `json:"email"`
	// Password representa la contraseña del usuario; se extrae del campo "password" del JSON entrante.
	Password string `json:"password"`
}

// LoginResponse representa la estructura de datos que se retorna tras una autenticación exitosa.
type LoginResponse struct {
	Token string `json:"token"`
	Email string `json:"email"`
	Rol   string `json:"rol"`
}

// Producto define la estructura de los datos de un artículo en nuestro catálogo.
type Producto struct {
	// ID es el identificador único numérico del producto.
	ID     int     `json:"id"`
	// Nombre es la descripción en texto del producto.
	Nombre string  `json:"nombre"`
	// Precio es el costo del producto, almacenado como un número con decimales (float64).
	Precio float64 `json:"precio"`
	// Img es la URL o ruta que apunta a la fotografía o imagen del producto.
	Img    string  `json:"img"`
}