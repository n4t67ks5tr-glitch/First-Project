/* Cart page: line items, quantity editing, and order summary. */

(function () {
  const linesRoot = document.getElementById("cart-lines");
  const emptyRoot = document.getElementById("cart-empty");
  const layoutRoot = document.getElementById("cart-layout");
  const subtotalEl = document.getElementById("summary-subtotal");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");
  const itemCountEl = document.getElementById("cart-item-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  const promoForm = document.getElementById("promo-form");
  const promoMsg = document.getElementById("promo-msg");

  const FREE_SHIP_THRESHOLD = 35;
  const SHIP_COST = 5.95;

  function render() {
    const lines = cartLines();

    if (!lines.length) {
      layoutRoot.style.display = "none";
      emptyRoot.style.display = "block";
      return;
    }

    layoutRoot.style.display = "grid";
    emptyRoot.style.display = "none";

    linesRoot.innerHTML = lines
      .map(({ product, qty }) => {
        const category = getCategoryById(product.category);
        return `
        <div class="cart-line" data-line="${product.id}">
          <div class="cart-line-media" aria-hidden="true">${product.icon}</div>
          <div>
            <p class="cart-line-name"><a href="product.html?id=${product.id}">${product.name}</a></p>
            <span class="cart-line-cat">${category ? category.name : ""}</span>
            <div>
              <button class="cart-line-remove" type="button" data-remove="${product.id}">Remove</button>
            </div>
          </div>
          <div class="qty-stepper">
            <button type="button" data-decr="${product.id}" aria-label="Decrease quantity">−</button>
            <span>${qty}</span>
            <button type="button" data-incr="${product.id}" aria-label="Increase quantity">＋</button>
          </div>
          <div class="price">${formatPrice(product.price * qty)}</div>
        </div>
      `;
      })
      .join("");

    const subtotal = cartSubtotal();
    const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIP_COST;
    const total = subtotal + shipping;
    const count = cartCount();

    itemCountEl.textContent = `${count} item${count === 1 ? "" : "s"}`;
    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = shipping === 0 ? "Free" : formatPrice(shipping);
    totalEl.textContent = formatPrice(total);

    linesRoot.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.getAttribute("data-remove"));
        render();
      });
    });
    linesRoot.querySelectorAll("[data-incr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-incr");
        const current = readCart()[id] || 0;
        setCartQty(id, current + 1);
        render();
      });
    });
    linesRoot.querySelectorAll("[data-decr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-decr");
        const current = readCart()[id] || 0;
        setCartQty(id, current - 1);
        render();
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    if (!cartCount()) return;
    showToast("This is a demo store — checkout isn't connected to real payment yet.");
  });

  if (promoForm) {
    promoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      promoMsg.textContent = "Promo codes aren't active in this demo store.";
    });
  }

  render();
})();
