const socket = io();

const STATUS_LABELS = {
  pending: "Recibida",
  preparing: "Preparando",
  ready: "Lista",
  completed: "Entregada",
  cancelled: "Cancelada"
};

const STATUS_FLOW = ["pending", "preparing", "ready", "completed", "cancelled"];

let token = localStorage.getItem("cafecito58_admin_token") || "";
let orders = [];
let currentFilter = "active";

function money(n) {
  return "$" + n.toFixed(2);
}

function showLogin(message) {
  document.getElementById("login-view").style.display = "block";
  document.getElementById("orders-view").style.display = "none";
  document.getElementById("login-error").textContent = message || "";
}

function showOrders() {
  document.getElementById("login-view").style.display = "none";
  document.getElementById("orders-view").style.display = "block";
}

async function login() {
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("login-error");
  errorEl.textContent = "";
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se pudo entrar");
    token = data.token;
    localStorage.setItem("cafecito58_admin_token", token);
    await loadOrders();
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function loadOrders() {
  const res = await fetch("/api/orders", { headers: { "x-admin-token": token } });
  if (res.status === 401) {
    localStorage.removeItem("cafecito58_admin_token");
    showLogin("Sesión expirada, vuelve a entrar.");
    return;
  }
  orders = await res.json();
  showOrders();
  renderOrders();
  socket.emit("join:staff", token);
}

function matchesFilter(order) {
  if (currentFilter === "all") return true;
  if (currentFilter === "active") return ["pending", "preparing", "ready"].includes(order.status);
  return order.status === currentFilter;
}

function renderOrders() {
  const list = document.getElementById("orders-list");
  const visible = orders.filter(matchesFilter);

  if (visible.length === 0) {
    list.innerHTML = '<p class="cart-empty">No hay órdenes en esta vista.</p>';
    return;
  }

  list.innerHTML = visible
    .map((order) => {
      const itemsText = order.items.map((it) => `${it.qty} × ${it.name}`).join(", ");
      const time = new Date(order.createdAt).toLocaleTimeString("es-US", { hour: "numeric", minute: "2-digit" });
      const actions = STATUS_FLOW.map(
        (s) => `<button data-order="${order.id}" data-status="${s}" class="${s === order.status ? "current" : ""}">${STATUS_LABELS[s]}</button>`
      ).join("");

      return `
        <div class="order-card">
          <div class="order-card-head">
            <div>
              <h3>${order.code} · ${order.customerName}</h3>
              <div class="meta">${order.phone} · Recogida: ${order.pickupTime} · Recibida ${time}</div>
            </div>
            <span class="status-pill status-${order.status}">${STATUS_LABELS[order.status]}</span>
          </div>
          <div class="order-items">${itemsText}${order.notes ? " — Notas: " + order.notes : ""}</div>
          <div class="meta">Total: ${money(order.total)}</div>
          <div class="order-actions">${actions}</div>
        </div>
      `;
    })
    .join("");

  list.querySelectorAll("button[data-order]").forEach((btn) => {
    btn.addEventListener("click", () => updateStatus(btn.dataset.order, btn.dataset.status));
  });
}

async function updateStatus(id, status) {
  const res = await fetch(`/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-token": token },
    body: JSON.stringify({ status })
  });
  if (res.status === 401) {
    showLogin("Sesión expirada, vuelve a entrar.");
    return;
  }
  const updated = await res.json();
  const idx = orders.findIndex((o) => o.id === updated.id);
  if (idx >= 0) orders[idx] = updated;
  renderOrders();
}

function setupFilters() {
  document.getElementById("filters").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    document.querySelectorAll("#filters button").forEach((b) => b.classList.toggle("active", b === btn));
    renderOrders();
  });
}

function init() {
  setupFilters();
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") login();
  });

  socket.on("order:new", (order) => {
    orders.unshift(order);
    renderOrders();
  });

  socket.on("order:update", (order) => {
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx >= 0) orders[idx] = order;
    renderOrders();
  });

  if (token) {
    loadOrders();
  } else {
    showLogin();
  }
}

init();
