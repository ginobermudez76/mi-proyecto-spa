// Declaramos el paquete controllers para la lógica de verificación del servidor.
package controllers

import "github.com/gofiber/fiber/v2"

// HealthCheck verifica el estado operativo del servidor Go/Fiber.
// Retorna un estado HTTP 200 con {"status": "ok", "message": "Servidor Go/Fiber operativo"}.
func HealthCheck(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "ok",
		"message": "Servidor Go/Fiber operativo",
	})
}
