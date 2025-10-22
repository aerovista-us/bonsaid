// BONSAID Store Configuration with Cart System
// Replace these URLs with your actual Square payment links

const storeProducts = {
  "stickers-3x3": {
    name: "BONSAID Stickers (3x3)",
    price: 5.50, 
    paymentLink: "https://square.link/u/TtHomD9l", // Your actual Square payment link for 3x3
    image: "bonsaid-hyper - Copy.png"
  },
  "stickers-5x5": {
    name: "BONSAID Stickers (5.5x5.5)",
    price: 7.50, 
    paymentLink: "https://square.link/u/TtHomD9l", // Your actual Square payment link for 5.5x5.5
    image: "bonsaid-hyper - Copy.png"
  },
  "oversized-hoodie": {
    name: "BONSAID Rooted Resilience Oversized Heavyweight",
    price: 61.00, // Average price for display - actual varies by size/color ($58.00-$64.00)
    paymentLink: "https://square.link/u/dPIuZdXp", // Square payment link for oversized heavyweight
    image: "bonsaid-hyper - Copy.png"
  },
  "premium-hoodie": {
    name: "BONSAID Rooted Resilience Hoodie – Premium Print",
    price: 49.50, // Average price for display - actual varies by size/color ($47.00-$52.00)
    paymentLink: "https://square.link/u/hekKHhqP", // Square payment link for premium hoodie
    image: "bonsaid-hyper - Copy.png"
  }
};

// Shopping Cart System
let cart = [];
let cartTotal = 0;
let selectedItems = [];

// Add to cart functionality
function addToCart(productId) {
  const product = storeProducts[productId];
  if (!product) return;
  
  // Check if item already in cart
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
  const cartSummary = document.getElementById('cartSummary');
  const cartItems = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  if (cart.length === 0) {
    cartSummary.style.display = 'none';
    return;
  }
  
  cartSummary.style.display = 'block';
  
  // Calculate total
  cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Display cart items with checkboxes for selection
  cartItems.innerHTML = cart.map((item, index) => {
    return `
      <div style="display:flex;align-items:center;margin-bottom:8px;padding:8px;background:#0a0a0a;border-radius:6px">
        <input type="checkbox" class="cart-item-checkbox" data-product-id="${item.id}" checked style="margin-right:12px;transform:scale(1.2)">
        <div style="flex:1">
          <div style="color:var(--ink);margin-bottom:4px">${item.name} x${item.quantity}</div>
          <div style="color:var(--gold);font-weight:bold">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
    `;
  }).join('');
  
  cartTotalElement.textContent = cartTotal.toFixed(2);
  
  // Add event listeners to checkboxes
  document.querySelectorAll('.cart-item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedItems);
  });
  
  updateSelectedItems();
}

// Update selected items based on checkboxes
function updateSelectedItems() {
  selectedItems = [];
  const checkboxes = document.querySelectorAll('.cart-item-checkbox:checked');
  
  checkboxes.forEach(checkbox => {
    const productId = checkbox.getAttribute('data-product-id');
    const item = cart.find(item => item.id === productId);
    if (item) {
      selectedItems.push(item);
    }
  });
  
  // Update total for selected items
  const selectedTotal = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  document.getElementById('cartTotal').textContent = selectedTotal.toFixed(2);
  
  // Update checkout button state
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (selectedItems.length === 0) {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Select Items to Checkout';
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = `Checkout Selected (${selectedItems.length} items)`;
  }
}

// Combined checkout functionality
function proceedToCheckout() {
  if (selectedItems.length === 0) return;
  
  // Create a combined order description
  const orderDescription = selectedItems.map(item => 
    `${item.name} x${item.quantity}`
  ).join(', ');
  
  const totalPrice = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (selectedItems.length === 1) {
    // Single item - use its specific payment link
    const item = selectedItems[0];
    const product = storeProducts[item.id];
    
    if (product.paymentLink) {
      window.open(product.paymentLink, '_blank');
    } else {
      alert('Payment link not configured for ' + product.name);
    }
  } else {
    // Multiple items - explain the limitation and offer solutions
    const itemList = selectedItems.map(item => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    
    const message = `Multiple Items Selected:\n\n${itemList}\n\nTotal: $${totalPrice.toFixed(2)}\n\n⚠️ IMPORTANT: Square payment links are designed for individual products only.\n\nFor multiple items, you have two options:\n\n1️⃣ Checkout each item separately (recommended)\n2️⃣ Contact us for a combined order with custom pricing\n\nWould you like to checkout the first item now?`;
    
    if (confirm(message)) {
      const firstItem = selectedItems[0];
      const product = storeProducts[firstItem.id];
      if (product.paymentLink) {
        window.open(product.paymentLink, '_blank');
      }
    }
  }
}

// Initialize cart system
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to all add-to-cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product');
      addToCart(productId);
      
      // Visual feedback
      this.textContent = 'Added!';
      this.disabled = true;
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.disabled = false;
      }, 1000);
    });
  });
  
  // Add event listener to checkout button
  document.getElementById('checkoutBtn').addEventListener('click', proceedToCheckout);
});
