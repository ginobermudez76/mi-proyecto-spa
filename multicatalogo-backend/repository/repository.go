// Declaramos el paquete repository, encargado de la persistencia y recuperación de datos.
package repository

import (
	"errors"
	"multicatalogo-backend/models"
)

var (
	// ErrCredencialesInvalidas indica que el usuario no existe o la contraseña no coincide.
	ErrCredencialesInvalidas = errors.New("credenciales incorrectas")
	// ErrProductoNoEncontrado indica que no existe un producto con el ID solicitado.
	ErrProductoNoEncontrado = errors.New("producto no encontrado")
)

// Catálogo de productos estáticos en memoria (preparado para futura persistencia relacional con PostgreSQL/GORM).
var productos = []models.Producto{
	{ID: 1, Nombre: "Serum Revitalizante", Precio: 45.00, Img: "https://picsum.photos/seed/serum/150"},
	{ID: 2, Nombre: "Crema Hidratante Pro", Precio: 32.50, Img: "https://picsum.photos/seed/crema/150"},
	{ID: 3, Nombre: "Tónico Purificante", Precio: 28.00, Img: "https://picsum.photos/seed/tonico/150"},
	{ID: 4, Nombre: "Mascarilla Nocturna", Precio: 50.00, Img: "https://picsum.photos/seed/mascarilla/150"},
}

// AuthenticateUser valida las credenciales del usuario en la capa de datos.
func AuthenticateUser(email, password string) (*models.LoginResponse, error) {
	switch {
	case email == "admin@upse.edu.ec" && password == "123456":
		return &models.LoginResponse{
			Token: "fake-jwt-token-123",
			Email: email,
			Rol:   "admin",
		}, nil
	case email == "cliente@upse.edu.ec" && password == "123456":
		return &models.LoginResponse{
			Token: "fake-jwt-token-456",
			Email: email,
			Rol:   "cliente",
		}, nil
	default:
		return nil, ErrCredencialesInvalidas
	}
}

// GetAllProductos devuelve todos los productos disponibles en el catálogo.
func GetAllProductos() []models.Producto {
	return productos
}

// GetProductoByID busca y devuelve un producto a partir de su ID numérico.
func GetProductoByID(id int) (*models.Producto, error) {
	for _, p := range productos {
		if p.ID == id {
			return &p, nil
		}
	}
	return nil, ErrProductoNoEncontrado
}
