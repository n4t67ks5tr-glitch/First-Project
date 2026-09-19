/* Order confirmation page: reads the last placed order from sessionStorage. */

(function () {
  const root = document.getElementById("confirmation-root");
  const ORDER_KEY = "bb_last_order";

  let order = null;
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    order = raw ? JSON.parse(raw) : null;
  } catch (err) {
    order = null;
  }

  if (!order) {
    document.title = "Order not found — Burrow & Bolt";
    root.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <div class="icon">🧭</div>
          <h3>We couldn't find a recent order</h3>
          <p>Orders are only kept for your current browser session.</p>
          <a class="btn btn-primary" style="margin-top:16px;" href="shop.html">Back to shop</a>
        </div>
      </div>`;
    return;
  }

  document.title = `Order ${order.orderId} confirmed — Burrow & Bolt`;

  const placedDate = new Date(order.date);
  const arrivalStart = new Date(placedDate);
  arrivalStart.setDate(arrivalStart.getDate() + 3);
  const arrivalEnd = new Date(placedDate);
  arrivalEnd.setDate(arrivalEnd.getDate() + 5);
  const dateFmt = { month: "short", day: "numeric" };

  root.innerHTML = `
    <div class="container" style="max-width:760px;">
      <div class="confirmation-head">
        <div class="confirmation-check">✓</div>
        <h1>Order placed, thanks!</h1>
        <p>A confirmation was sent to <strong>${order.email}</strong>. This is a demo store, so no real payment was collected.</p>
      </div>

      <div class="checkout-panel">
        <div class="confirmation-meta">
          <div>
            <span class="confirmation-label">Order number</span>
            <strong>${order.orderId}</strong>
          </div>
          <div>
            <span class="confirmation-label">Order date</span>
            <strong>${placedDate.toLocaleDateString(undefined, dateFmt)}</strong>
          </div>
          <div>
            <span class="confirmation-label">Estimated arrival</span>
            <strong>${arrivalStart.toLocaleDateString(undefined, dateFmt)} – ${arrivalEnd.toLocaleDateString(undefined, dateFmt)}</strong>
          </div>
        </div>
      </div>

      <div class="checkout-panel">
        <h3>Shipping to</h3>
        <p style="margin:0; color:var(--color-text-muted); line-height:1.7;">
          ${order.shipping.fullName}<br />
          ${order.shipping.address}<br />
          ${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}
        </p>
      </div>

      <div class="checkout-panel">
        <h3>Items</h3>
        <div class="checkout-lines">
          ${order.lines
            .map(
              (line) => `
            <div class="checkout-line">
              <span aria-hidden="true">${line.icon}</span>
              <span class="checkout-line-name">${line.name} <span class="checkout-line-qty">× ${line.qty}</span></span>
              <span class="checkout-line-price">${formatPrice(line.price * line.qty)}</span>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="summary-row" style="margin-top:14px;"><span>Subtotal</span><span>${formatPrice(order.subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(order.total)}</span></div>
      </div>

      <div class="confirmation-actions">
        <a class="btn btn-primary" href="shop.html">Continue shopping</a>
        <a class="btn btn-outline" href="index.html">Back to home</a>
      </div>
    </div>
  `;
})();
