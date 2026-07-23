const socket = io();

const state = {
  menu: [],
  cart: new Map() // id -> qty
};

const STATUS_LABELS = {
  pending: "Recibida",
  preparing: "Preparando",
  ready: "Lista para recoger",
  completed: "Entregada",
  cancelled: "Cancelada"
};

function money(n) {
  return "$" + n.toFixed(2);
}

function findMenuItem(id) {
  for (const section of state.menu) {
    const found = section.items.find((it) => it.id === id);
    if (found) return found;
  }
  return null;
}

function renderMenu() {
  const el = document.getElementById("menu");
  el.innerHTML = "";
  for (const section of state.menu) {
    const wrap = document.createElement("section");
    wrap.className = "category";
    const h2 = document.createElement("h2");
    h2.textContent = section.category;
    wrap.appendChild(h2);

    for (const item of section.items) {
      const row = document.createElement("div");
      row.className = "menu-item";
      const qty = state.cart.get(item.id) || 0;
      row.innerHTML = `
        <div class="menu-item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">${money(item.price)}</span>
        </div>
        <div class="qty-control">
          <button data-action="dec" data-id="${item.id}" aria-label="Quitar uno">−</button>
          <span data-qty="${item.id}">${qty}</span>
          <button data-action="inc" data-id="${item.id}" aria-label="Agregar uno">+</button>
        </div>
      `;
      wrap.appendChild(row);
    }
    el.appendChild(wrap);
  }

  el.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    const current = state.cart.get(id) || 0;
    if (btn.dataset.action === "inc") {
      state.cart.set(id, Math.min(current + 1, 20));
    } else {
      const next = current - 1;
      if (next <= 0) state.cart.delete(id);
      else state.cart.set(id, next);
    }
    el.querySelector(`[data-qty="${id}"]`).textContent = state.cart.get(id) || 0;
    renderCart();
  });
}

function renderCart() {
  const linesEl = document.getElementById("cart-lines");
  const totalWrap = document.getElementById("cart-total");
  const totalAmount = document.getElementById("cart-total-amount");

  if (state.cart.size === 0) {
    linesEl.innerHTML = '<p class="cart-empty">Aún no has agregado nada.</p>';
    totalWrap.style.display = "none";
    return;
  }

  let total = 0;
  linesEl.innerHTML = "";
  for (const [id, qty] of state.cart.entries()) {
    const item = findMenuItem(id);
    if (!item) continue;
    total += item.price * qty;
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML = `
      <span class="name">${qty} × ${item.name}</span>
      <span>${money(item.price * qty)}</span>
      <button class="remove" data-remove="${id}">quitar</button>
    `;
    linesEl.appendChild(line);
  }
  totalWrap.style.display = "flex";
  totalAmount.textContent = money(total);

  linesEl.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.remove;
      state.cart.delete(id);
      const qtyEl = document.querySelector(`[data-qty="${id}"]`);
      if (qtyEl) qtyEl.textContent = "0";
      renderCart();
    });
  });
}

function populatePickupTimes() {
  const select = document.getElementById("pickupTime");
  select.innerHTML = "";

  const asap = document.createElement("option");
  asap.value = "Lo antes posible";
  asap.textContent = "Lo antes posible (15-20 min)";
  select.appendChild(asap);

  const now = new Date();
  let mins = now.getMinutes();
  const roundUp = Math.ceil(mins / 15) * 15;
  now.setMinutes(roundUp, 0, 0);

  for (let i = 0; i < 8; i++) {
    const slot = new Date(now.getTime() + i * 15 * 60000);
    const label = slot.toLocaleTimeString("es-US", { hour: "numeric", minute: "2-digit" });
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    select.appendChild(option);
  }
}

async function submitOrder() {
  const errorEl = document.getElementById("order-error");
  errorEl.textContent = "";

  const items = [...state.cart.entries()].map(([id, qty]) => ({ id, qty }));
  const customerName = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pickupTime = document.getElementById("pickupTime").value;
  const notes = document.getElementById("notes").value.trim();

  if (items.length === 0) {
    errorEl.textContent = "Agrega al menos un producto a tu orden.";
    return;
  }
  if (!customerName || !phone) {
    errorEl.textContent = "Por favor completa tu nombre y teléfono.";
    return;
  }

  const btn = document.getElementById("submitOrder");
  btn.disabled = true;
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, customerName, phone, pickupTime, notes })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se pudo crear la orden");

    showConfirmation(data);
    state.cart.clear();
    renderMenu();
    renderCart();
    document.getElementById("notes").value = "";
  } catch (err) {
    errorEl.textContent = err.message;
  } finally {
    btn.disabled = false;
  }
}

function showConfirmation(order) {
  document.getElementById("confirm-code").textContent = order.code;
  document.getElementById("confirm-detail").textContent =
    `Recogida: ${order.pickupTime}. Guarda este código y tu teléfono para ver el estado de tu orden en la pestaña "Ver mi orden".`;
  document.getElementById("confirm-modal").style.display = "flex";

  document.getElementById("trackCode").value = order.code;
  document.getElementById("trackPhone").value = order.phone;
}

function renderTrackResult(order) {
  const el = document.getElementById("track-result");
  el.style.display = "block";
  const itemsHtml = order.items
    .map((it) => `<div class="cart-line"><span class="name">${it.qty} × ${it.name}</span><span>${money(it.price * it.qty)}</span></div>`)
    .join("");

  el.innerHTML = `
    <h3>Orden ${order.code}</h3>
    <p><span class="status-pill status-${order.status}">${STATUS_LABELS[order.status] || order.status}</span></p>
    ${itemsHtml}
    <div class="cart-total"><span>Total</span><span>${money(order.total)}</span></div>
    <p>Recogida: ${order.pickupTime}${order.notes ? " · Notas: " + order.notes : ""}</p>
  `;
}

async function trackOrder() {
  const errorEl = document.getElementById("track-error");
  errorEl.textContent = "";
  const code = document.getElementById("trackCode").value.trim().toUpperCase();
  const phone = document.getElementById("trackPhone").value.trim();

  if (!code || !phone) {
    errorEl.textContent = "Ingresa el código y el teléfono de la orden.";
    return;
  }

  try {
    const res = await fetch(`/api/orders/track?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se encontró la orden");
    renderTrackResult(data);
    socket.emit("join:order", data.code);
  } catch (err) {
    document.getElementById("track-result").style.display = "none";
    errorEl.textContent = err.message;
  }
}

function setupTabs() {
  const orderTab = document.getElementById("tab-order");
  const trackTab = document.getElementById("tab-track");
  const orderView = document.getElementById("view-order");
  const trackView = document.getElementById("view-track");

  orderTab.addEventListener("click", () => {
    orderTab.classList.add("active");
    trackTab.classList.remove("active");
    orderView.style.display = "block";
    trackView.style.display = "none";
  });

  trackTab.addEventListener("click", () => {
    trackTab.classList.add("active");
    orderTab.classList.remove("active");
    trackView.style.display = "block";
    orderView.style.display = "none";
  });
}

async function init() {
  setupTabs();
  populatePickupTimes();

  const res = await fetch("/api/menu");
  state.menu = await res.json();
  renderMenu();
  renderCart();

  document.getElementById("submitOrder").addEventListener("click", submitOrder);
  document.getElementById("trackSubmit").addEventListener("click", trackOrder);
  document.getElementById("confirm-close").addEventListener("click", () => {
    document.getElementById("confirm-modal").style.display = "none";
  });

  socket.on("order:update", (order) => {
    const codeInput = document.getElementById("trackCode").value.trim().toUpperCase();
    if (order.code === codeInput) {
      renderTrackResult(order);
    }
  });
}

init();
