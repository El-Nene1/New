const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "orders.json");

function load() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return { orders: [], nextSeq: 1 };
  }
}

let state = load();

function persist() {
  fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2));
}

function nextCode() {
  const seq = state.nextSeq++;
  const code = "C-" + String(seq).padStart(4, "0");
  persist();
  return code;
}

function addOrder(order) {
  state.orders.push(order);
  persist();
  return order;
}

function getAllOrders() {
  return [...state.orders].sort((a, b) => b.createdAt - a.createdAt);
}

function getOrderByCode(code) {
  return state.orders.find((o) => o.code === code);
}

function getOrderById(id) {
  return state.orders.find((o) => o.id === id);
}

function updateOrderStatus(id, status) {
  const order = getOrderById(id);
  if (!order) return null;
  order.status = status;
  order.updatedAt = Date.now();
  persist();
  return order;
}

module.exports = {
  nextCode,
  addOrder,
  getAllOrders,
  getOrderByCode,
  getOrderById,
  updateOrderStatus
};
