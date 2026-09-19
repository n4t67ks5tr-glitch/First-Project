/* Product detail page: reads ?id= from the URL and renders the matching product. */

(function () {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));
  const root = document.getElementById("product-detail-root");
  const relatedRoot = document.getElementById("related-grid");

  if (!product) {
    root.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="icon">🧭</div>
        <h3>We couldn't find that product</h3>
        <p>It may have sold out or the link is off.</p>
        <a class="btn btn-primary" style="margin-top:16px;" href="shop.html">Back to shop</a>
      </div>`;
    document.title = "Product not found — Burrow & Bolt";
    return;
  }

  document.title = `${product.name} — Burrow & Bolt`;
  const category = getCategoryById(product.category);
  let qty = 1;

  document.getElementById("crumb-current").textContent = product.name;
  document.getElementById("crumb-current").setAttribute("href", `product.html?id=${product.id}`);

  const oldPriceHTML = product.oldPrice
    ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>`
    : "";
  const badgeHTML = product.badge
    ? `<span class="product-badge${product.badge === "Sale" ? " sale" : ""}" style="position:static; display:inline-block; margin-bottom:10px;">${product.badge}</span>`
    : "";

  root.innerHTML = `
    <div class="detail-media" aria-hidden="true">${product.icon}</div>
    <div class="detail-info">
      ${badgeHTML}
      <div class="detail-category">${category ? category.name : ""}</div>
      <h1 class="detail-title">${product.name}</h1>
      <div class="detail-rating">${starString(product.rating)} <span>${product.rating.toFixed(1)} · ${product.reviews} reviews</span></div>
      <div class="detail-price">${formatPrice(product.price)} ${oldPriceHTML}</div>
      <p class="detail-desc">${product.description}</p>
      <div class="qty-row">
        <div class="qty-stepper">
          <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
          <span id="qty-value">1</span>
          <button type="button" id="qty-plus" aria-label="Increase quantity">＋</button>
        </div>
        <span style="color:var(--color-text-muted); font-size:0.88rem;">In stock, ships in 1–2 business days</span>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" id="add-to-cart-btn" type="button">Add to cart — ${formatPrice(product.price)}</button>
        <a class="btn btn-outline" href="cart.html">View cart</a>
      </div>
      <div class="detail-meta">
        <div>🚚 Free shipping on orders over $35</div>
        <div>↩️ 30-day hassle-free returns</div>
        <div>
          Tags:
          <div class="detail-tags">${product.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
      </div>
    </div>
  `;

  const qtyValueEl = document.getElementById("qty-value");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValueEl.textContent = qty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty = Math.min(20, qty + 1);
    qtyValueEl.textContent = qty;
  });
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, qty);
    showToast(`Added ${qty} × "${product.name}" to your cart`);
  });

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (related.length) {
    relatedRoot.innerHTML = related.map(productCardHTML).join("");
    wireQuickAddButtons(relatedRoot);
  } else {
    document.getElementById("related-section").style.display = "none";
  }
})();
