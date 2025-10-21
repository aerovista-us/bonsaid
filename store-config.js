// BONSAID Store Configuration with Cart System
// Replace these URLs with your actual Square payment links

const storeProducts = {
  "stickers-3x3": {
    name: "BONSAID Stickers (3x3)",
    price: 5.50, 
    paymentLink: "https://square.link/u/TtHomD9l", // Your actual Square payment link for 3x3
    image: "bonsaid-hyper-vector.svg"
  },
  "stickers-5x5": {
    name: "BONSAID Stickers (5.5x5.5)",
    price: 7.50, 
    paymentLink: "https://square.link/u/TtHomD9l", // Your actual Square payment link for 5.5x5.5
    image: "bonsaid-hyper-vector.svg"
  }
};

// Shopping Cart System
let cart = [];
let cartTotal = 0;

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
  
  // Display cart items
  cartItems.innerHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:8px;background:#0a0a0a;border-radius:6px">
      <span style="color:var(--ink)">${item.name} x${item.quantity}</span>
      <span style="color:var(--gold)">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');
  
  cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Checkout functionality
function proceedToCheckout() {
  if (cart.length === 0) return;
  
  // For now, we'll use the first item's payment link
  // In a real implementation, you'd create a combined payment link
  const firstItem = cart[0];
  const product = storeProducts[firstItem.id];
  
  if (product.paymentLink && product.paymentLink !== `YOUR_${firstItem.id.toUpperCase()}_SQUARE_PAYMENT_LINK`) {
    window.open(product.paymentLink, '_blank');
  } else {
    alert('Payment link not configured for ' + product.name + '. Please update store-config.js with your Square payment links.');
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
