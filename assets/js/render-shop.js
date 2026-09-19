/* Shop page: filtering, search, and sorting over the product catalog. */

(function () {
  const params = new URLSearchParams(window.location.search);
  const state = {
    categories: params.get("category") ? [params.get("category")] : [],
    query: params.get("q") || "",
    sort: "featured",
  };

  const grid = document.getElementById("product-grid");
  const resultCount = document.getElementById("result-count");
  const filterList = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const chipsBox = document.getElementById("active-chips");
  const clearBtn = document.getElementById("clear-filters");

  function buildFilterPanel() {
    filterList.innerHTML = CATEGORIES.map((cat) => {
      const count = PRODUCTS.filter((p) => p.category === cat.id).length;
      const checked = state.categories.includes(cat.id) ? "checked" : "";
      return `
        <label class="filter-option">
          <span><input type="checkbox" value="${cat.id}" ${checked}> ${cat.icon} ${cat.name}</span>
          <span class="count">${count}</span>
        </label>
      `;
    }).join("");

    filterList.querySelectorAll("input[type='checkbox']").forEach((cb) => {
      cb.addEventListener("change", () => {
        const val = cb.value;
        if (cb.checked) {
          state.categories.push(val);
        } else {
          state.categories = state.categories.filter((c) => c !== val);
        }
        render();
      });
    });
  }

  function renderChips() {
    const chips = [];
    state.categories.forEach((id) => {
      const cat = getCategoryById(id);
      if (cat) chips.push({ label: `${cat.icon} ${cat.name}`, onRemove: () => removeCategory(id) });
    });
    if (state.query) {
      chips.push({ label: `"${state.query}"`, onRemove: () => { state.query = ""; searchInput.value = ""; render(); } });
    }

    if (!chips.length) {
      chipsBox.innerHTML = "";
      clearBtn.hidden = true;
      return;
    }

    clearBtn.hidden = false;
    chipsBox.innerHTML = chips
      .map((chip, i) => `<span class="chip" data-chip-index="${i}">${chip.label} <button type="button" aria-label="Remove filter">✕</button></span>`)
      .join("");

    chipsBox.querySelectorAll(".chip").forEach((el, i) => {
      el.querySelector("button").addEventListener("click", () => chips[i].onRemove());
    });
  }

  function removeCategory(id) {
    state.categories = state.categories.filter((c) => c !== id);
    render();
  }

  function getFiltered() {
    let list = PRODUCTS.slice();
    if (state.categories.length) {
      list = list.filter((p) => state.categories.includes(p.category));
    }
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (state.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }

  function render() {
    const list = getFiltered();
    resultCount.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    renderChips();

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="icon">🔍</div>
          <h3>No products match those filters</h3>
          <p>Try clearing a filter or searching a different term.</p>
        </div>`;
      grid.style.gridTemplateColumns = "1fr";
      return;
    }

    grid.style.gridTemplateColumns = "";
    grid.innerHTML = list.map(productCardHTML).join("");
    wireQuickAddButtons(grid);

    filterList.querySelectorAll("input[type='checkbox']").forEach((cb) => {
      cb.checked = state.categories.includes(cb.value);
    });
  }

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  sortSelect.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  clearBtn.addEventListener("click", () => {
    state.categories = [];
    state.query = "";
    searchInput.value = "";
    render();
  });

  searchInput.value = state.query;
  buildFilterPanel();
  render();
})();
