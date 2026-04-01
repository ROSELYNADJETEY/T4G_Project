// ================= PRODUCTS =================
// const PRODUCTS = [
// ================= PRODUCTS =================
const PRODUCTS = [
  {
    id: 'cleanser',
    name: 'Gentle Cleanser',
    category: 'Cleansers',
    type: 'Skincare',
    price: 18,
    brand: 'mingle & Glow cosmertics',
    skinTypes: ['Dry', 'Oily', 'Normal'],
    
    image: '../images/cleanser3.jpg'// fixed spacing
  },
  {
    id: 'moisturizer',
    name: 'Hydra Moisturizer',
    category: 'Moisturizers',
    type: 'Skincare',
    price: 26,
    brand: 'mingle & Glow cosmertics',
    skinTypes: ['Dry', 'Normal'],
    image: '../images/hydra-moisturizer.avif' // fixed spacing
  },
  {
    id: 'perfume1',
    name: 'niver',
    category: 'Perfumes',
    type: 'Perfume',
    price: 42,
    brand: 'Mingle & Glow cosmertics',
    fragranceType: 'Citrus',
    image: '../images/niver.webp' // fixed spacing
  },
  {
    id: 'perfume2',
    name: 'Velvet Rose',
    category: 'Perfumes',
    type: 'Perfume',
    price: 50,
    brand: 'Mingle & Glow cosmertics',
    fragranceType: 'Floral',
    image: '../images/velvetrose.avif' // fixed spacing
  }
,
  {
    id: 'perfume1',
    name: 'mango',
    category: 'Perfumes',
    type: 'Perfume',
    price: 42,
    brand: 'Mingle & Glow cosmertics',
    fragranceType: 'Citrus',
    image: '../images/citrus_perfume.jpg' // fixed spacing
  },
  {
    id: 'perfume1',
    name: 'cream',
    category: 'Perfumes',
    type: 'Perfume',
    price: 42,
    brand: 'Mingle & Glow cosmertics',
    fragranceType: 'Citrus',
    image: '../images/cream1.webp' // fixed spacing
  },
  
];


// ================= CART =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const cart = getCart();
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
}

function addToCart(id) {
  const cart = getCart();

  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return; // safety check
    cart[id] = { ...product, qty: 1 };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}


// ================= RENDER PRODUCTS =================
function renderProducts(filters = {}) {
  let list = [...PRODUCTS];

  if (filters.category && filters.category !== 'All') {
    list = list.filter(p => p.category === filters.category);
  }

  if (filters.skinType && filters.skinType !== 'All') {
    list = list.filter(p => p.skinTypes?.includes(filters.skinType));
  }

  if (filters.fragranceType && filters.fragranceType !== 'All') {
    list = list.filter(p => p.fragranceType === filters.fragranceType);
  }

  if (filters.brand && filters.brand !== 'All') {
    list = list.filter(p => p.brand === filters.brand);
  }

  if (filters.priceRange && filters.priceRange !== 'All') {
    const [min, max] = filters.priceRange.split('-').map(Number);

    if (!isNaN(max)) {
      list = list.filter(p => p.price >= min && p.price <= max);
    } else {
      list = list.filter(p => p.price >= min);
    }
  }

  const container = document.getElementById("product-list");

  if (!container) return;

  if (!list.length) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p.id}')">Add to Cart</button>
    </div>
  `).join("");
}


// ================= FILTERS =================
function applyFilters() {
  renderProducts({
    category: document.getElementById("filter-category")?.value,
    skinType: document.getElementById("filter-skin-type")?.value,
    fragranceType: document.getElementById("filter-fragrance-type")?.value,
    brand: document.getElementById("filter-brand")?.value,
    priceRange: document.getElementById("filter-price")?.value
  });
}

function fillSelect(id, values) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = ["All", ...values]
    .map(v => `<option value="${v}">${v}</option>`)
    .join("");
}

function initFilters() {
  fillSelect("filter-category", [...new Set(PRODUCTS.map(p => p.category))]);
  fillSelect("filter-brand", [...new Set(PRODUCTS.map(p => p.brand))]);
  fillSelect("filter-skin-type", [...new Set(PRODUCTS.flatMap(p => p.skinTypes || []))]);
  fillSelect("filter-fragrance-type", [...new Set(PRODUCTS.map(p => p.fragranceType).filter(Boolean))]);

  document.querySelectorAll(".filter-select")
    .forEach(el => el.addEventListener("change", applyFilters));

  renderProducts();
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initFilters();
});

