/* Market POS demo page. Adding items and the running total are real.
   Confirm Order and the payment step only SHOW what would happen on the
   real system -- no email is sent and no payment is processed. */
(function () {
  var cart = {}; /* id -> { name, price, qty } */
  var orderCounter = 1000 + Math.floor(Math.random() * 40);

  var listEl = document.getElementById("cart-list");
  var emptyEl = document.getElementById("cart-empty");
  var totalEl = document.getElementById("cart-total");
  var msgEl = document.getElementById("order-msg");
  var resultEl = document.getElementById("pos-result");

  function money(n) { return "$" + n.toFixed(2); }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cartIds() { return Object.keys(cart); }

  function cartTotal() {
    var t = 0;
    cartIds().forEach(function (id) { t += cart[id].price * cart[id].qty; });
    return t;
  }

  function cartLines() {
    return cartIds().map(function (id) {
      var item = cart[id];
      return item.qty + " x " + item.name + " - " + money(item.price * item.qty);
    }).join("\n");
  }

  function renderCart() {
    listEl.innerHTML = "";
    var ids = cartIds();
    emptyEl.style.display = ids.length ? "none" : "block";
    ids.forEach(function (id) {
      var item = cart[id];
      var li = document.createElement("li");

      var label = document.createElement("span");
      label.textContent = item.qty + " x " + item.name;

      var right = document.createElement("span");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "8px";

      var priceSpan = document.createElement("span");
      priceSpan.textContent = money(item.price * item.qty);

      var minusBtn = document.createElement("button");
      minusBtn.type = "button";
      minusBtn.textContent = "−";
      minusBtn.setAttribute("aria-label", "Remove one " + item.name);
      minusBtn.addEventListener("click", function () { removeOne(id); });

      right.appendChild(priceSpan);
      right.appendChild(minusBtn);
      li.appendChild(label);
      li.appendChild(right);
      listEl.appendChild(li);
    });
    totalEl.textContent = money(cartTotal());
  }

  function addItem(id, name, price) {
    if (!cart[id]) { cart[id] = { name: name, price: price, qty: 0 }; }
    cart[id].qty++;
    renderCart();
  }

  function removeOne(id) {
    if (!cart[id]) { return; }
    cart[id].qty--;
    if (cart[id].qty <= 0) { delete cart[id]; }
    renderCart();
  }

  function showMsg(text) {
    msgEl.textContent = text;
    msgEl.classList.toggle("show", !!text);
  }

  document.querySelectorAll(".pos-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addItem(btn.getAttribute("data-id"), btn.getAttribute("data-name"), parseFloat(btn.getAttribute("data-price")));
    });
  });

  document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cust-name").value.trim();
    var email = document.getElementById("cust-email").value.trim();

    if (!cartIds().length) { showMsg("Add at least one item before confirming."); return; }
    if (!name || !email) { showMsg("Enter the customer's name and email."); return; }
    showMsg("");

    var orderNo = "#" + (orderCounter++);
    var total = cartTotal();

    document.getElementById("result-order-no").textContent = orderNo;
    document.getElementById("email-preview-1").innerHTML =
      "<b>To:</b> " + escapeHtml(email) + "<br><b>Subject:</b> Your Wat Punyawanaram order " + orderNo + "<br><br>" +
      "Hi " + escapeHtml(name) + ",\n\nThank you for your order (" + orderNo + "):\n" + escapeHtml(cartLines()) +
      "\nTotal: " + money(total) +
      "\n\nTo pay, click this link and enter " + money(total) + " as the amount:\n[Zeffy payment link would go here]" +
      "\n\nAfter you pay, we will email you a 4-digit pickup code. Show it to the volunteer to pick up your order.";

    resultEl.dataset.name = name;
    resultEl.dataset.email = email;
    resultEl.dataset.orderNo = orderNo;
    document.getElementById("pickup-section").hidden = true;
    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("mark-paid-btn").addEventListener("click", function () {
    var code = String(Math.floor(1000 + Math.random() * 9000));
    var name = resultEl.dataset.name || "";
    var email = resultEl.dataset.email || "";
    var orderNo = resultEl.dataset.orderNo || "";

    document.getElementById("email-preview-2").innerHTML =
      "<b>To:</b> " + escapeHtml(email) + "<br><b>Subject:</b> Your pickup code for order " + orderNo + "<br><br>" +
      "Hi " + escapeHtml(name) + ", your payment was received!\n\nShow this code to the volunteer to pick up your order:\n" + code;
    document.getElementById("pickup-code").textContent = code;
    document.getElementById("pickup-section").hidden = false;
  });

  document.getElementById("new-order-btn").addEventListener("click", function () {
    cart = {};
    renderCart();
    document.getElementById("cust-name").value = "";
    document.getElementById("cust-email").value = "";
    showMsg("");
    resultEl.hidden = true;
  });

  renderCart();
})();
