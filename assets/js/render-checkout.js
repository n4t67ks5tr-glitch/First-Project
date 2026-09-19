/* Checkout page: order summary, shipping/payment form, and demo order placement. */

(function () {
  const layoutRoot = document.getElementById("checkout-layout");
  const emptyRoot = document.getElementById("checkout-empty");
  const linesRoot = document.getElementById("checkout-lines");
  const subtotalEl = document.getElementById("summary-subtotal");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");
  const form = document.getElementById("checkout-form");
  const errorEl = document.getElementById("checkout-error");
  const cardNumberInput = document.getElementById("cardNumber");
  const cardExpiryInput = document.getElementById("cardExpiry");

  const FREE_SHIP_THRESHOLD = 35;
  const SHIP_COST = 5.95;
  const ORDER_KEY = "bb_last_order";

  const lines = cartLines();

  if (!lines.length) {
    layoutRoot.style.display = "none";
    emptyRoot.style.display = "block";
    return;
  }

  const subtotal = cartSubtotal();
  const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_COST;
  const total = subtotal + shipping;

  linesRoot.innerHTML = lines
    .map(
      ({ product, qty }) => `
      <div class="checkout-line">
        <span aria-hidden="true">${product.icon}</span>
        <span class="checkout-line-name">${product.name} <span class="checkout-line-qty">× ${qty}</span></span>
        <span class="checkout-line-price">${formatPrice(product.price * qty)}</span>
      </div>
    `
    )
    .join("");

  subtotalEl.textContent = formatPrice(subtotal);
  shippingEl.textContent = shipping === 0 ? "Free" : formatPrice(shipping);
  totalEl.textContent = formatPrice(total);

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", () => {
      const digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
      cardNumberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener("input", () => {
      let digits = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
      if (digits.length >= 3) digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      cardExpiryInput.value = digits;
    });
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function validate(data) {
    if (!form.checkValidity()) return "Please fill in every field.";
    const cardDigits = data.cardNumber.replace(/\D/g, "");
    if (cardDigits.length < 13 || cardDigits.length > 16) {
      return "Enter a valid card number.";
    }
    if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      return "Enter card expiry as MM/YY.";
    }
    const month = Number(data.cardExpiry.slice(0, 2));
    if (month < 1 || month > 12) {
      return "Enter a valid expiry month.";
    }
    if (!/^\d{3,4}$/.test(data.cardCvc)) {
      return "Enter a valid CVC.";
    }
    if (!/^\d{5}$/.test(data.zip)) {
      return "Enter a valid 5-digit ZIP code.";
    }
    return null;
  }

  function makeOrderId() {
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `BB-${rand}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const error = validate(data);
    if (error) {
      showError(error);
      return;
    }

    const order = {
      orderId: makeOrderId(),
      date: new Date().toISOString(),
      email: data.email,
      shipping: {
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        state: data.state.toUpperCase(),
        zip: data.zip,
      },
      lines: lines.map(({ product, qty }) => ({
        id: product.id,
        name: product.name,
        icon: product.icon,
        qty,
        price: product.price,
      })),
      subtotal,
      shipping_cost: shipping,
      total,
    };

    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch (err) {
      /* sessionStorage unavailable — confirmation page will fall back to an empty state. */
    }

    clearCart();
    window.location.href = "order-confirmation.html";
  });
})();
