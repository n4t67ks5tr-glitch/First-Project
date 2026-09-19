/* Home page: category tiles + a curated set of featured products. */

(function () {
  const categoryRoot = document.getElementById("home-categories");
  if (categoryRoot) {
    categoryRoot.innerHTML = CATEGORIES.map(
      (cat) => `
      <a class="category-card" href="shop.html?category=${cat.id}">
        <span class="icon" aria-hidden="true">${cat.icon}</span>
        <h3>${cat.name}</h3>
        <p>${cat.blurb}</p>
        <span class="go">Shop now →</span>
      </a>
    `
    ).join("");
  }

  const featuredRoot = document.getElementById("home-featured");
  if (featuredRoot) {
    const featured = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(0, 4);
    const fill = PRODUCTS.filter((p) => !featured.includes(p)).slice(0, 4 - featured.length);
    featuredRoot.innerHTML = featured.concat(fill).map(productCardHTML).join("");
    wireQuickAddButtons(featuredRoot);
  }

  const newRoot = document.getElementById("home-new");
  if (newRoot) {
    const fresh = PRODUCTS.filter((p) => p.badge === "New");
    newRoot.innerHTML = fresh.map(productCardHTML).join("");
    wireQuickAddButtons(newRoot);
  }
})();
