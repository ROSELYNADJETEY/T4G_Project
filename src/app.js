Shared JS for Mingle and Glow Cosmetics
const STORAGE_KEYS = {
  CART: 'mglow_cart',
  USERS: 'mglow_users',
  SESSION: 'mglow_session',
};

const PRODUCTS = [
  // Skincare
  {
    id: 'cleanser-gentle-foam',
    name: 'Gentle Foaming Cleanser',
    category: 'Cleansers',
    type: 'Skincare',
    price: 18.0,
    brand: 'Glow Basics',
    skinTypes: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'],
    description: 'A gentle foam cleanser that removes impurities without stripping moisture.',
    image: 'https://via.placeholder.com/320x240?text=Foaming+Cleanser',
  },
  {
    id: 'moisturizer-hydra-lock',
    name: 'Hydra-Lock Moisturizer',
    category: 'Moisturizers',
    type: 'Skincare',
    price: 26.0,
    brand: 'Glow Basics',
    skinTypes: ['Dry', 'Combination', 'Normal'],
    description: 'A lightweight moisturizer that locks in hydration all day.',
    image: 'https://via.placeholder.com/320x240?text=Hydra+Moisturizer',
  },
  {
    id: 'serum-vitamin-c',
    name: 'Vitamin C Brightening Serum',
    category: 'Serums',
    type: 'Skincare',
    price: 34.0,
    brand: 'Glow Basics',
    skinTypes: ['Normal', 'Combination', 'Oily'],
    description: 'Boost radiance and even tone while protecting against free radicals.',
    image: 'https://via.placeholder.com/320x240?text=Vitamin+C+Serum',
  },
  {
    id: 'sunscreen-daily-shield',
    name: 'Daily Shield Sunscreen SPF 50',
    category: 'Sunscreens',
    type: 'Skincare',
    price: 22.0,
    brand: 'SunSafe',
    skinTypes: ['All'],
    description: 'Broad-spectrum protection with a lightweight finish that works under makeup.',
    image: 'https://via.placeholder.com/320x240?text=SPF+50+Sunscreen',
  },
  {
    id: 'mask-clay-purify',
    name: 'Purifying Clay Mask',
    category: 'Face Masks',
    type: 'Skincare',
    price: 28.0,
    brand: 'Glow Basics',
    skinTypes: ['Oily', 'Combination'],
    description: 'Detoxes pores and reduces shine with gentle minerals.',
    image: 'https://via.placeholder.com/320x240?text=Clay+Mask',
  },
  {
    id: 'toner-balance',
    name: 'Balance Toner',
    category: 'Toners',
    type: 'Skincare',
    price: 19.0,
    brand: 'Glow Basics',
    skinTypes: ['Dry', 'Normal', 'Combination'],
    description: 'Refresh and balance skin while prepping it for treatment products.',
    image: 'https://via.placeholder.com/320x240?text=Balance+Toner',
  },
  // Perfumes
  {
    id: 'perfume-citrus-glow',
    name: 'Fresh Citrus Glow',
    category: 'Unisex Perfumes',
    type: 'Perfume',
    price: 42.0,
    brand: 'Mingle & Glow',
    fragranceType: 'Citrus',
    description: 'Light and refreshing citrus notes that brighten your day.',
    image: 'https://via.placeholder.com/320x240?text=Citrus+Glow',
    suitableOccasions: 'Everyday',
  },
  {
    id: 'perfume-velvet-rose',
    name: 'Velvet Rose Mist',
    category: 'Unisex Perfumes',
    type: 'Perfume',
    price: 45.0,
    brand: 'Mingle & Glow',
    fragranceType: 'Floral',
    description: 'Floral elegance with rose and musk for a romantic touch.',
    image: 'https://via.placeholder.com/320x240?text=Velvet+Rose',
    suitableOccasions: 'Date Night',
  },
  {
    id: 'perfume-ocean-breeze',
    name: 'Ocean Breeze',
    category: 'Unisex Perfumes',
    type: 'Perfume',
    price: 40.0,
    brand: 'Mingle & Glow',
    fragranceType: 'Fresh',
    description: 'Clean, aquatic scent inspired by sea air.',
    image: 'https://via.placeholder.com/320x240?text=Ocean+Breeze',
    suitableOccasions: 'Summer',
  },
  {
    id: 'perfume-golden-amber',
    name: 'Golden Amber',
    category: 'Unisex Perfumes',
    type: 'Perfume',
    price: 48.0,
    brand: 'Mingle & Glow',
    fragranceType: 'Woody',
    description: 'Warm and luxurious amber with sandalwood depth.',
    image: 'https://via.placeholder.com/320x240?text=Golden+Amber',
    suitableOccasions: 'Evening',
  },
];

function getCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const cart = getCart();
  const total = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = total;
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart[productId];
  cart[productId] = {
    ...product,
    quantity: existing ? existing.quantity + quantity : quantity,
  };
  saveCart(cart);
  showToast(`Added “${product.name}” to cart.`);
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  renderCartPage();
}

function updateCartItem(productId, quantity) {
  const cart = getCart();
  if (!cart[productId]) return;
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  cart[productId].quantity = quantity;
  saveCart(cart);
  renderCartPage();
}

function getProductById(id) {
  return PRODUCTS.find((item) => item.id === id);
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3200);
  setTimeout(() => toast.remove(), 3600);
}

function renderPopularSkincare() {
  const container = document.getElementById('popular-skincare');
  if (!container) return;
  const popular = PRODUCTS.filter((p) => p.type === 'Skincare').slice(0, 4);
  container.innerHTML = popular
    .map(
      (product) => `
//       <article class="product-card">
//         <img src="${product.image}" alt="${product.name}" />
//         <div class="product-body">
//           <h3>${product.name}</h3>
//           <p>${product.description}</p>
//           <p class="product-meta">${formatPrice(product.price)}</p>
//           <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
//         </div>
//       </article>
//     `
    )
    .join('');
}

function renderProducts(filters = {}) {
  const container = document.getElementById('product-list');
  if (!container) return;
  let list = PRODUCTS.slice();

  if (filters.category && filters.category !== 'All') {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.skinType && filters.skinType !== 'All') {
    list = list.filter((p) => p.skinTypes && (p.skinTypes.includes(filters.skinType) || p.skinTypes.includes('All')));
  }
  if (filters.fragranceType && filters.fragranceType !== 'All') {
    list = list.filter((p) => p.fragranceType === filters.fragranceType);
  }
  if (filters.brand && filters.brand !== 'All') {
    list = list.filter((p) => p.brand === filters.brand);
  }
  if (filters.priceRange && filters.priceRange !== 'All') {
    const [min, max] = filters.priceRange.split('-').map(Number);
    list = list.filter((p) => p.price >= min && p.price <= max);
  }

  if (!list.length) {
    container.innerHTML = '<p class="empty-state">No products match those filters.</p>';
    return;
  }

  container.innerHTML = list
    .map((product) => {
      const meta = product.type === 'Skincare' ? `Suitable for: ${product.skinTypes?.join(', ')}` : `Type: ${product.fragranceType}`;
      return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-body">
          <h3>${product.name}</h3>
          <p class="product-meta">${meta}</p>
          <p>${product.description}</p>
          <p class="product-price">${formatPrice(product.price)}</p>
          <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </article>
    `;
    })
    .join('');
}

function applyProductFilters() {
  const category = document.getElementById('filter-category')?.value || 'All';
  const skinType = document.getElementById('filter-skin-type')?.value || 'All';
  const fragranceType = document.getElementById('filter-fragrance-type')?.value || 'All';
  const brand = document.getElementById('filter-brand')?.value || 'All';
  const priceRange = document.getElementById('filter-price')?.value || 'All';

  renderProducts({ category, skinType, fragranceType, brand, priceRange });
}

function initProductsPage() {
  const categorySelect = document.getElementById('filter-category');
  if (!categorySelect) return;

  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
  const skinTypes = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'];
  const fragranceTypes = ['Fresh', 'Floral', 'Woody', 'Citrus'];

  categorySelect.innerHTML = ['All', ...categories]
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join('');
  document.getElementById('filter-brand').innerHTML = ['All', ...brands]
    .map((brand) => `<option value="${brand}">${brand}</option>`)
    .join('');
  document.getElementById('filter-skin-type').innerHTML = ['All', ...skinTypes]
    .map((type) => `<option value="${type}">${type}</option>`)
    .join('');
  document.getElementById('filter-fragrance-type').innerHTML = ['All', ...fragranceTypes]
    .map((type) => `<option value="${type}">${type}</option>`)
    .join('');

  applyProductFilters();

  document.querySelectorAll('.filter-select').forEach((select) => {
    select.addEventListener('change', applyProductFilters);
  });
}

function renderCartPage() {
  const cartContainer = document.getElementById('cart-contents');
  const cartTotalEl = document.getElementById('cart-total');
  if (!cartContainer || !cartTotalEl) return;

  const cart = getCart();
  const items = Object.values(cart);
  if (!items.length) {
    cartContainer.innerHTML = '<p class="empty-state">Your cart is empty. Add something delicious to get started.</p>';
    cartTotalEl.textContent = formatPrice(0);
    return;
  }

  const rows = items
    .map((item) => {
      const subtotal = item.price * item.quantity;
      return `
      <tr>
        <td class="cart-product">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <div class="meta">${item.type} • ${item.category}</div>
          </div>
        </td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" class="qty-input" data-product="${item.id}" />
        </td>
        <td>${formatPrice(subtotal)}</td>
        <td>
          <button class="btn btn-secondary btn-small" data-remove="${item.id}">Remove</button>
        </td>
      </tr>
    `;
    })
    .join('');

  cartContainer.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = formatPrice(total);

  cartContainer.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const qty = Number(event.target.value);
      const productId = event.target.dataset.product;
      updateCartItem(productId, qty);
    });
  });

  cartContainer.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      removeFromCart(button.dataset.remove);
    });
  });
}

function initCartPage() {
  const checkoutForm = document.getElementById('checkout-form');
  if (!checkoutForm) return;
  renderCartPage();
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cart = getCart();
    if (!Object.keys(cart).length) {
      showToast('Your cart is empty.');
      return;
    }
    showToast('Order placed! Thank you for shopping with Mingle and Glow.');
    localStorage.removeItem(STORAGE_KEYS.CART);
    renderCartPage();
    checkoutForm.reset();
  });
}

function initSkinQuizPage() {
  const quizForm = document.getElementById('quiz-form');
  const resultEl = document.getElementById('quiz-result');
  if (!quizForm || !resultEl) return;

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(quizForm);
    const answers = {
      q1: formData.get('q1'),
      q2: formData.get('q2'),
      q3: formData.get('q3'),
      q4: formData.get('q4'),
    };
    const skinType = computeSkinType(answers);
    renderQuizResult(skinType);
  });
}

function computeSkinType(answers) {
  const weights = {
    Dry: 0,
    Oily: 0,
    Combination: 0,
    Normal: 0,
    Sensitive: 0,
  };

  const mapping = {
    q1: {
      'Tight/dry': 'Dry',
      Normal: 'Normal',
      Oily: 'Oily',
      'Combination': 'Combination',
    },
    q2: {
      Rarely: 'Dry',
      Sometimes: 'Combination',
      Frequently: 'Oily',
    },
    q3: {
      Often: 'Oily',
      Sometimes: 'Combination',
      Rarely: 'Normal',
    },
    q4: {
      'Very': 'Sensitive',
      'Slightly': 'Combination',
      'Not sensitive': 'Normal',
    },
  };

  Object.keys(answers).forEach((question) => {
    const value = answers[question];
    const type = mapping[question]?.[value];
    if (type) {
      weights[type] += 1;
    }
  });

  const result = Object.keys(weights).reduce((best, current) => {
    if (weights[current] > weights[best]) return current;
    return best;
  }, 'Normal');

  return result;
}

function renderQuizResult(skinType) {
  const resultEl = document.getElementById('quiz-result');
  if (!resultEl) return;

  const typeDescriptions = {
    Dry: 'Your skin tends toward dryness and can feel tight. Hydration and gentle, nourishing ingredients help restore balance.',
    Oily: 'Your skin produces more oil and can feel slick. Look for lightweight, non-comedogenic formulas that control shine and clarify.',
    Combination: 'Your skin has both oily and dry areas. Target each zone with products that provide balance and comfort.',
    Normal: 'Your skin is balanced and generally comfortable. Maintain with gentle care and occasional targeted treatments.',
    Sensitive: 'Your skin reacts easily. Choose calming, fragrance-free formulas and keep your routine simple.',
  };

  const recommendations = PRODUCTS.filter(
    (product) =>
      product.type === 'Skincare' &&
      (product.skinTypes?.includes(skinType) || product.skinTypes?.includes('All'))
  ).slice(0, 4);

  const routine = {
    Dry: ['Cleanse gently', 'Apply a hydrating serum', 'Lock in moisture with a rich moisturizer', 'Protect with SPF each morning'],
    Oily: ['Use a gel cleanser', 'Treat with a lightweight serum', 'Moisturize with an oil-free lotion', 'Finish with broad-spectrum SPF'],
    Combination: ['Cleanse gently', 'Target oily zones with a balancing toner', 'Hydrate dry areas with a richer moisturizer', 'Use SPF daily'],
    Normal: ['Cleanse', 'Treat with a gentle serum', 'Moisturize to maintain balance', 'Apply sunscreen'],
    Sensitive: ['Cleanse with a calming formula', 'Soothe with a gentle serum', 'Moisturize with fragrance-free cream', 'Protect with mineral SPF'],
  };

  resultEl.innerHTML = `
    <div class="quiz-summary">
      <h2>Your Skin Type: ${skinType}</h2>
      <p>${typeDescriptions[skinType] || ''}</p>
    </div>
    <div class="quiz-section">
      <h3>Recommended Products</h3>
      <div class="product-grid">
        ${recommendations
          .map((product) => {
            return `
            <article class="product-card">
              <img src="${product.image}" alt="${product.name}" />
              <div class="product-body">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p class="product-meta">${formatPrice(product.price)}</p>
                <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
              </div>
            </article>
            `;
          })
          .join('')}
      </div>
    </div>
    <div class="quiz-section">
      <h3>Suggested Routine</h3>
      <ol>
        ${routine[skinType]?.map((step) => `<li>${step}</li>`).join('')}
      </ol>
    </div>
  `;
}

function getUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function signUp(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim().toLowerCase();
  const password = form.querySelector('[name="password"]').value;
  const confirmPassword = form.querySelector('[name="confirmPassword"]').value;
  const skinType = form.querySelector('[name="skinType"]').value;
  const messageEl = document.getElementById('auth-message');

  if (!name || !email || !password || !confirmPassword) {
    showMessage('auth-message', 'Please complete all required fields.', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('auth-message', 'Passwords do not match.', 'error');
    return;
  }

  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    showMessage('auth-message', 'An account already exists with that email.', 'error');
    return;
  }

  users.push({ name, email, password, skinType });
  saveUsers(users);
  showMessage('auth-message', 'Account created! You can now sign in.', 'success');
  setTimeout(() => {
    window.location.href = 'pages/Sign%20In.html';
  }, 1200);
}

function signIn(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('[name="email"]').value.trim().toLowerCase();
  const password = form.querySelector('[name="password"]').value;
  const remember = form.querySelector('[name="remember"]').checked;
  const messageEl = document.getElementById('auth-message');

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    showMessage('auth-message', 'Email or password is incorrect.', 'error');
    return;
  }

  const session = { email: user.email, name: user.name, skinType: user.skinType };
  if (remember) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  } else {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }

  showMessage('auth-message', `Welcome back, ${user.name}!`, 'success');
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 1000);
}

function showMessage(elementId, message, type = 'info') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `message ${type}`;
}

function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION) || sessionStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
}

function logout() {
  clearSession();
  updateUserNav();
  showToast('You have been signed out.');
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 300);
}

function updateUserNav() {
  const session = getSession();
  const greeting = document.getElementById('user-greeting');
  const authAction = document.getElementById('auth-action');
  if (!authAction) return;

  const pagePrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';

  if (session) {
    if (greeting) {
      greeting.textContent = `Welcome, ${session.name}`;
    }
    authAction.textContent = 'Log Out';
    authAction.href = '#';
    authAction.onclick = (event) => {
      event.preventDefault();
      logout();
    };
  } else {
    if (greeting) {
      greeting.textContent = '';
    }
    authAction.textContent = 'Sign In';
    authAction.href = `${pagePrefix}Sign%20In.html`;
    authAction.onclick = null;
  }
}

function initAuthPages() {
  const signInForm = document.getElementById('login-form');
  const signUpForm = document.getElementById('sign-up-form');
  if (signInForm) {
    signInForm.addEventListener('submit', signIn);
  }
  if (signUpForm) {
    signUpForm.addEventListener('submit', signUp);
  }
}

function initNavigation() {
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  
  Close menu when a link is clicked
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initNavigation();
  updateUserNav();
  initProductsPage();
  initCartPage();
  initSkinQuizPage();
  initAuthPages();
});
