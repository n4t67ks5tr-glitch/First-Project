/* Shared behavior across every page: mobile nav, newsletter form, product cards, quick add. */

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function productCardHTML(product) {
  const oldPrice = product.oldPrice
    ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>`
    : "";
  const badge = product.badge
    ? `<span class="product-badge${product.badge === "Sale" ? " sale" : ""}">${product.badge}</span>`
    : "";
  const category = getCategoryById(product.category);
  return `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-media" aria-label="View ${product.name}">
        ${badge}
        <span aria-hidden="true">${product.icon}</span>
        <button class="quick-add" type="button" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to cart">＋</button>
      </a>
      <div class="product-body">
        <span class="product-category">${category ? category.name : ""}</span>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <span class="product-rating">${starString(product.rating)} <span>(${product.reviews})</span></span>
        <div class="product-price-row">
          <span class="price">${formatPrice(product.price)}</span>
          ${oldPrice}
        </div>
      </div>
    </article>
  `;
}

function wireQuickAddButtons(root = document) {
  root.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-add-to-cart");
      const product = getProductById(id);
      addToCart(id, 1);
      showToast(`Added "${product.name}" to your cart`);
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".site-nav-mobile");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "✕" : "☰";
  });
}

function initNewsletterForms() {
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value.trim()) {
        showToast("You're on the list — welcome to Burrow & Bolt!");
        form.reset();
      }
    });
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent — we'll reply within one business day.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initNewsletterForms();
  initContactForm();
});
