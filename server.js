const path = require("path");
const crypto = require("crypto");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const { MENU, MENU_INDEX } = require("./src/menu");
const store = require("./src/store");

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cafecito58";
const STATUSES = ["pending", "preparing", "ready", "completed", "cancelled"];

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const adminTokens = new Set();

function requireAdmin(req, res, next) {
  const token = req.header("x-admin-token");
  if (!token || !adminTokens.has(token)) {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
}

app.get("/api/menu", (req, res) => {
  res.json(MENU);
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }
  const token = crypto.randomUUID();
  adminTokens.add(token);
  res.json({ token });
});

app.post("/api/orders", (req, res) => {
  const { items, customerName, phone, pickupTime, notes } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }
  if (!customerName || !customerName.trim()) {
    return res.status(400).json({ error: "Falta el nombre del cliente" });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: "Falta el teléfono" });
  }
  if (!pickupTime || !pickupTime.trim()) {
    return res.status(400).json({ error: "Falta la hora de recogida" });
  }

  const resolvedItems = [];
  for (const raw of items) {
    const menuItem = MENU_INDEX.get(raw && raw.id);
    const qty = Number(raw && raw.qty);
    if (!menuItem || !Number.isInteger(qty) || qty <= 0 || qty > 20) {
      return res.status(400).json({ error: "Artículo de orden inválido" });
    }
    resolvedItems.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      qty
    });
  }

  const total = resolvedItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const now = Date.now();

  const order = {
    id: crypto.randomUUID(),
    code: store.nextCode(),
    items: resolvedItems,
    total: Math.round(total * 100) / 100,
    customerName: customerName.trim(),
    phone: phone.trim(),
    pickupTime: pickupTime.trim(),
    notes: (notes || "").trim(),
    status: "pending",
    createdAt: now,
    updatedAt: now
  };

  store.addOrder(order);
  io.to("staff").emit("order:new", order);

  res.status(201).json(order);
});

app.get("/api/orders/track", (req, res) => {
  const { code, phone } = req.query;
  if (!code || !phone) {
    return res.status(400).json({ error: "Falta código o teléfono" });
  }
  const order = store.getOrderByCode(String(code).trim().toUpperCase());
  if (!order || order.phone.trim() !== String(phone).trim()) {
    return res.status(404).json({ error: "No se encontró ninguna orden con esos datos" });
  }
  res.json(order);
});

app.get("/api/orders", requireAdmin, (req, res) => {
  res.json(store.getAllOrders());
});

app.patch("/api/orders/:id/status", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }
  const order = store.updateOrderStatus(req.params.id, status);
  if (!order) {
    return res.status(404).json({ error: "Orden no encontrada" });
  }
  io.to("staff").emit("order:update", order);
  io.to("order:" + order.code).emit("order:update", order);
  res.json(order);
});

server.listen(PORT, () => {
  console.log(`Cafecito58 corriendo en http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  socket.on("join:staff", (token) => {
    if (token && adminTokens.has(token)) {
      socket.join("staff");
    }
  });

  socket.on("join:order", (code) => {
    if (code) socket.join("order:" + String(code).trim().toUpperCase());
  });
});
