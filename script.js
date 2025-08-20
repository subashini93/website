const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const sortEl = document.getElementById("sort");
const productsEl = document.getElementById("products");
const cartListEl = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const ordersModal = document.getElementById("orders-modal");
const ordersListEl = document.getElementById("orders-list");

const PRODUCTS = [
  { id: "p1", name: "Smartphone", price: 30000, category: "Electronics", desc: "Good phone with great battery", image:"smartphone.jpg" },
  { id: "p2", name: "Laptop", price: 45000, category: "Electronics", desc: "Lightweight laptop for work", image: "laptop.jpg" },
  { id: "p3", name: "Smart Watch", price: 3000, category: "Electronics", desc: "Keeping time with smart features", image: "watch.jpg" },
  { id: "p4", name: "Headphones", price: 2000, category: "Electronics", desc: "Over-ear, noise isolating", image: "headset.jpg" },
   {id: "p5", name: "Kajal", price: 250, category: "Beauty & personalcare", desc: "A smooth, easy-to-apply eye", image: "kajal.jpg" },
  { id: "p6", name: "Foundation", price: 1500, category: "Beauty & personalcare", desc: "Flawless base,flawless you", image: "foundation.jpg" },
  { id: "p7", name: "Lipstick", price: 150, category: "Beauty & personalcare", desc: "Beauty is every swipe", image: "lipstick.jpg" },
  { id: "p8", name: "Nailpolish", price: 100, category: "Beauty & personalcare", desc: "Add sparkle,add confidence", image: "nailpolish.jpg" },
  { id: "p9", name: "Kurti", price: 2000, category: "Dress", desc: "Perfect for casual and formal wear", image: "dress.jpg"},
 { id: "p10", name: "kurta with palazzo", price: 3000, category: "Dress", desc: "lightweight kurta for effortless styke", image: "black.jpg" },
 { id: "p11", name: "Anarkali NAVY", price: 4500, category: "Dress", desc: "perfect for festive vibes", image: "blue.jpg" },
  { id: "p12", name: "black kuta plazoo set", price: 5000, category: "Dress", desc: "Trndy kurta with comfy plazoo", image: "white.jpg" },
  { id: "p13", name: "Wedge Sandals", price: 20000, category: "Sandals", desc: "Elegent wedge that add height and style", image: "sandles.jpg" },
  { id: "p14", name: "Synthetic Heel Sandals", price: 8000, category: "Sandals", desc: "Durable sandals with a modern look", image: "blackslipper.jpg" },
   { id: "p15", name: "Women Heels", price: 2000, category: "Sandals", desc: "Trendy women's comfort and fashion", image: "pink.jpg" },
   { id: "p16", name: "Heel Sandals", price: 1000, category: "Sandals", desc: "Perfect for casual occasions", image: "ash.jpg" },
  { id: "p17", name: "Jhumka", price: 200, category: "Accessories", desc: "Perfect for casual occasions", image: "jhumka.jpg" },
  { id: "p18", name: "chain", price: 2000, category: "Accessories", desc: "Perfect for casual occasions", image: "chain.jpg" },
  { id: "p19", name: "bangle", price: 1000, category: "Accessories", desc: "Perfect for casual occasions", image: "rosegold.jpg" },
  { id: "p20", name: "bracelet", price: 1500, category: "Accessories", desc: "Perfect for casual occasions", image: "silver.jpg" },


];

let cart = [];
let orders = [];

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

function renderProducts() {
  const q = searchEl.value.trim().toLowerCase();
  const cat = categoryEl.value;
  const sort = sortEl.value;

  let list = PRODUCTS.filter(p => {
    if (q && !(p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))) return false;
    if (cat && p.category !== cat) return false;
    return true;
  });

  if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
  if (sort === "name-asc") list.sort((a,b) => a.name.localeCompare(b.name));

  productsEl.innerHTML = list.map(p => `
    <div class="card">
      <div class="product-image">
        <img src="${p.image}" alt="${escapeHtml(p.name)}">
      </div>
      <div class="product-meta">
        <div>
          <div style="font-weight:700">${escapeHtml(p.name)}</div>
          <div class="small">${escapeHtml(p.desc)}</div>
        </div>
        <div class="price">${p.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <button class="btn" onclick="addToCart('${p.id}')">Add to cart</button>
        <button class="btn ghost" onclick="alert(JSON.stringify(PRODUCTS.find(x => x.id === '${p.id}'), null, 2))">Details</button>
      </div>
    </div>
  `).join("") || `<div class="muted center" style="grid-column:1/-1;">No products found</div>`;
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartListEl.innerHTML = `<div class="muted center">Your cart is empty</div>`;
    cartTotalEl.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartListEl.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width:40px; height:40px; object-fit:cover; border-radius:6px;">
          <div>${escapeHtml(item.name)} x${item.qty}</div>
        </div>
        <div>${(item.price * item.qty).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
    `;
  }).join("");
  cartTotalEl.textContent = total.toLocaleString("en-IN", { style: "currency", currency: "INR" });
}

function populateCategories() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryEl.appendChild(opt);
  });
}

// Scroll to products (Shop Now)
function scrollToProducts() {
  const productsEl = document.getElementById("products");
  if(productsEl) {
    productsEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// Checkout
function checkoutCart() {
  if (!cart.length) { alert("Your cart is empty!"); return; }
  cart.forEach(item => {
    const existing = orders.find(o => o.id === item.id);
    if (existing) existing.qty += item.qty;
    else orders.push({...item});
  });
  cart = [];
  renderCart();
  alert("Checkout successful! Your items are now in My Orders.");
}

// Show Orders
function showOrders() {
  if (!orders.length) { ordersListEl.innerHTML = `<div class="muted center">No orders yet</div>`; }
  else {
    ordersListEl.innerHTML = orders.map(item => `
      <div class="order-item">
        <div style="display:flex; align-items:center;">
          <img src="${item.image}" alt="${escapeHtml(item.name)}">
          <div>${escapeHtml(item.name)} x${item.qty}</div>
        </div>
        <div>${(item.price * item.qty).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
      </div>
    `).join("");
  }
  ordersModal.classList.add("show");
}

// Close Orders
function closeOrders() { ordersModal.classList.remove("show"); }

// Event Listeners
document.getElementById("clear").addEventListener("click", () => { searchEl.value=""; categoryEl.value=""; sortEl.value=""; renderProducts(); });
document.getElementById("btn-clear-cart").addEventListener("click", () => { cart=[]; renderCart(); });
document.getElementById("btn-checkout").addEventListener("click", checkoutCart);
document.getElementById("btn-login").addEventListener("click", () => {
  const userName = prompt("Enter your name to sign in:");
  if (userName) document.getElementById("user-welcome").textContent = `Welcome, ${userName}`;
});
document.getElementById("btn-orders").addEventListener("click", showOrders);
[searchEl, categoryEl, sortEl].forEach(el => el.addEventListener("input", renderProducts));

// Initialize
populateCategories();
renderProducts();
renderCart();
