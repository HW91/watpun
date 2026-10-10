/* Market POS demo page (English and Thai). Adding items and the running total are real.
   Confirm Order and the payment step only SHOW what would happen on the
   real system -- no email is sent and no payment is processed.
   All words come from js/lang-en.js and js/lang-th.js (keys starting "pos."). */
(function () {
  var cart = {}; /* dish id -> quantity */
  var order = null; /* set after "Confirm Order": { name, email, orderNo, total, lines, code } */
  var msgKey = "";
  var orderCounter = 1000 + Math.floor(Math.random() * 40);

  var listEl = document.getElementById("cart-list");
  var emptyEl = document.getElementById("cart-empty");
  var totalEl = document.getElementById("cart-total");
  var msgEl = document.getElementById("order-msg");
  var resultEl = document.getElementById("pos-result");

  var PRICES = {};
  document.querySelectorAll(".pos-item").forEach(function (btn) {
    PRICES[btn.getAttribute("data-id")] = parseFloat(btn.getAttribute("data-price"));
  });

  function t(key, vars) {
    var words = window.I18N[document.documentElement.lang] || window.I18N.en;
    var text = words[key] !== undefined ? words[key] : window.I18N.en[key];
    Object.keys(vars || {}).forEach(function (name) { text = text.split("{" + name + "}").join(vars[name]); });
    return text;
  }
  function money(n) { return "$" + n.toFixed(2); }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function dish(id) { return t("pos.d." + id); }
  function cartIds() { return Object.keys(cart); }
  function cartTotal() {
    return cartIds().reduce(function (sum, id) { return sum + PRICES[id] * cart[id]; }, 0);
  }
  function linesText(lines) {
    return lines.map(function (l) { return l.qty + " x " + dish(l.id) + " - " + money(PRICES[l.id] * l.qty); }).join("\n");
  }

  function renderCart() {
    listEl.innerHTML = "";
    var ids = cartIds();
    emptyEl.style.display = ids.length ? "none" : "block";
    ids.forEach(function (id) {
      var li = document.createElement("li");
      var label = document.createElement("span");
      label.textContent = cart[id] + " x " + dish(id);
      var right = document.createElement("span");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "8px";
      var price = document.createElement("span");
      price.textContent = money(PRICES[id] * cart[id]);
      var minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", t("pos.remove", { item: dish(id) }));
      minus.addEventListener("click", function () { removeOne(id); });
      right.appendChild(price);
      right.appendChild(minus);
      li.appendChild(label);
      li.appendChild(right);
      listEl.appendChild(li);
    });
    totalEl.textContent = money(cartTotal());
  }

  function renderMessage() {
    msgEl.textContent = msgKey ? t(msgKey) : "";
    msgEl.classList.toggle("show", !!msgKey);
  }
  function setMessage(key) { msgKey = key; renderMessage(); }

  function renderEmails() {
    if (!order) { return; }
    document.getElementById("result-order-no").textContent = order.orderNo;
    document.getElementById("email-preview-1").innerHTML =
      "<b>" + t("pos.to") + "</b> " + escapeHtml(order.email) + "<br><b>" + t("pos.subject") + "</b> " +
      escapeHtml(t("pos.e1.subject", { n: order.orderNo })) + "<br><br>" +
      escapeHtml(t("pos.e1.body", { name: order.name, n: order.orderNo, lines: linesText(order.lines), total: money(order.total) }));
    if (order.code) {
      document.getElementById("email-preview-2").innerHTML =
        "<b>" + t("pos.to") + "</b> " + escapeHtml(order.email) + "<br><b>" + t("pos.subject") + "</b> " +
        escapeHtml(t("pos.e2.subject", { n: order.orderNo })) + "<br><br>" +
        escapeHtml(t("pos.e2.body", { name: order.name, code: order.code }));
      document.getElementById("pickup-code").textContent = order.code;
    }
  }

  function addItem(id) { cart[id] = (cart[id] || 0) + 1; renderCart(); }
  function removeOne(id) {
    if (!cart[id]) { return; }
    cart[id]--;
    if (cart[id] <= 0) { delete cart[id]; }
    renderCart();
  }

  document.querySelectorAll(".pos-item").forEach(function (btn) {
    btn.addEventListener("click", function () { addItem(btn.getAttribute("data-id")); });
  });

  document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cust-name").value.trim();
    var email = document.getElementById("cust-email").value.trim();
    if (!cartIds().length) { setMessage("pos.err.empty"); return; }
    if (!name || !email) { setMessage("pos.err.fields"); return; }
    setMessage("");
    order = {
      name: name, email: email, orderNo: "#" + (orderCounter++), total: cartTotal(), code: "",
      lines: cartIds().map(function (id) { return { id: id, qty: cart[id] }; })
    };
    document.getElementById("pickup-section").hidden = true;
    resultEl.hidden = false;
    renderEmails();
    resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("mark-paid-btn").addEventListener("click", function () {
    if (!order) { return; }
    order.code = String(Math.floor(1000 + Math.random() * 9000));
    document.getElementById("pickup-section").hidden = false;
    renderEmails();
  });

  document.getElementById("new-order-btn").addEventListener("click", function () {
    cart = {};
    order = null;
    renderCart();
    document.getElementById("cust-name").value = "";
    document.getElementById("cust-email").value = "";
    setMessage("");
    resultEl.hidden = true;
  });

  /* When the visitor switches language, redraw everything this script wrote. */
  document.getElementById("lang").addEventListener("change", function () {
    renderCart();
    renderMessage();
    renderEmails();
  });

  renderCart();
})();
