// Square Checkout API Integration for BONSAID Store
// Replace with your actual Square credentials

const SQUARE_APPLICATION_ID = 'YOUR_SQUARE_APPLICATION_ID';
const SQUARE_ACCESS_TOKEN = 'YOUR_SQUARE_ACCESS_TOKEN';
const SQUARE_ENVIRONMENT = 'sandbox'; // Change to 'production' for live

// Square Checkout API Configuration
const squareConfig = {
  applicationId: SQUARE_APPLICATION_ID,
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: SQUARE_ENVIRONMENT
};

// Product catalog with Square-compatible format
const squareProducts = {
  "stickers-3x3": {
    name: "BONSAID Stickers (3x3)",
    price: 550, // Price in cents
    description: "High-quality BONSAID stickers - 3 inch size",
    imageUrl: "bonsaid-hyper - Copy.png"
  },
  "stickers-5x5": {
    name: "BONSAID Stickers (5.5x5.5)",
    price: 750, // Price in cents
    description: "High-quality BONSAID stickers - 5.5 inch size",
    imageUrl: "bonsaid-hyper - Copy.png"
  },
  "oversized-hoodie": {
    name: "BONSAID Rooted Resilience Oversized Heavyweight",
    price: 6100, // Price in cents
    description: "Premium oversized heavyweight hoodie with BONSAID artwork",
    imageUrl: "bonsaid-hyper - Copy.png"
  },
  "premium-hoodie": {
    name: "BONSAID Rooted Resilience Hoodie – Premium Print",
    price: 4950, // Price in cents
    description: "Premium hoodie with high-quality BONSAID print",
    imageUrl: "bonsaid-hyper - Copy.png"
  }
};

// Shopping Cart System
let cart = [];
let cartTotal = 0;

// Add to cart functionality
function addToCart(productId) {
  const product = squareProducts[productId];
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
      description: product.description,
      imageUrl: product.imageUrl,
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
      <div style="flex:1">
        <div style="color:var(--ink);margin-bottom:4px">${item.name} x${item.quantity}</div>
        <div style="color:var(--gold);font-weight:bold">$${(item.price * item.quantity / 100).toFixed(2)}</div>
      </div>
      <button class="remove-item-btn" data-product-id="${item.id}" style="background:#ff6b6b;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px">Remove</button>
    </div>
  `).join('');
  
  cartTotalElement.textContent = (cartTotal / 100).toFixed(2);
  
  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      removeFromCart(productId);
    });
  });
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

// Create Square Checkout Session
async function createSquareCheckout() {
  if (cart.length === 0) return;
  
  try {
    // Convert cart to Square line items
    const lineItems = cart.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: item.price,
        currency: 'USD'
      }
    }));
    
    // Create checkout request
    const checkoutRequest = {
      idempotencyKey: generateIdempotencyKey(),
      askForShippingAddress: true,
      merchantSupportEmail: 'support@bonsaid.com', // Replace with your email
      prePopulateBuyerEmail: '', // Optional: pre-populate email
      lineItems: lineItems,
      redirectUrl: window.location.origin + '/checkout-success.html' // Success page
    };
    
    // Call Square Checkout API
    const response = await fetch('https://connect.squareup.com/v2/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Square-Version': '2023-10-18'
      },
      body: JSON.stringify(checkoutRequest)
    });
    
    if (!response.ok) {
      throw new Error(`Square API error: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.checkout && result.checkout.checkoutUrl) {
      // Redirect to Square checkout
      window.location.href = result.checkout.checkoutUrl;
    } else {
      throw new Error('No checkout URL received from Square');
    }
    
  } catch (error) {
    console.error('Square Checkout Error:', error);
    alert('Checkout failed. Please try again or contact support.');
  }
}

// Generate unique idempotency key
function generateIdempotencyKey() {
  return 'bonsaid-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Initialize store system
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
  document.getElementById('checkoutBtn').addEventListener('click', createSquareCheckout);
});
