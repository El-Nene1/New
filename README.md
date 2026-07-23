# Cafecito58 — Sistema de órdenes para recoger en el local

Sistema web con backend real (Node.js + Express + Socket.IO) para que los
clientes armen su orden desde el celular o la computadora y la recojan en
el local. El personal del local ve las órdenes en un panel en vivo y
actualiza el estado (Recibida → Preparando → Lista → Entregada).

## Cómo correrlo

```bash
npm install
npm start
```

Abre `http://localhost:3000` (o el puerto que definas con `PORT`).

- **Clientes**: `http://localhost:3000/` — arman su orden, la confirman y
  reciben un código de recogida (ej. `C-0001`). Con ese código y su
  teléfono pueden ver el estado en la pestaña "Ver mi orden", que se
  actualiza en vivo.
- **Personal del local**: `http://localhost:3000/admin.html` — entra con
  la contraseña del local (por defecto `cafecito58`, cambiable con la
  variable de entorno `ADMIN_PASSWORD`). Ahí aparecen las órdenes nuevas
  en tiempo real y se puede cambiar su estado.

## Variables de entorno

- `PORT` — puerto del servidor (por defecto `3000`).
- `ADMIN_PASSWORD` — contraseña para entrar al panel del personal (por
  defecto `cafecito58`).

## Notas

- El menú vive en `src/menu.js`; para agregar o cambiar productos y
  precios se edita ahí.
- Las órdenes se guardan en `data/orders.json` en el servidor (se crea
  solo). Para un uso real en producción con más de un local o mucho
  tráfico simultáneo, se recomendaría migrar ese almacenamiento a una
  base de datos (Postgres, SQLite, etc.), pero el modelo de datos es el
  mismo.
- La autenticación del panel de personal es intencionalmente simple
  (una sola contraseña compartida) — suficiente para un local pequeño,
  pero no un sistema de cuentas por empleado.
