// BONSAID Product Modal System
// Product information for modal display

const productInfo = {
  "stickers": {
    name: "BONSAID Sticker Pack",
    price: "$5.50 - $7.50",
    description: "High-quality vinyl stickers featuring the beautiful BONSAID artwork. Available in multiple sizes to fit your style - from laptop stickers to car window decals.",
    features: [
      "Premium vinyl material",
      "Weather resistant",
      "Easy to apply and remove",
      "3 inch size - perfect for laptops",
      "5.5 inch size - perfect for car windows",
      "Multiple sizes available"
    ],
    image: "products/bstick/kiss-cut-stickers-white-3x3-default-68f8540cbd5e3.png",
    paymentLink: "https://square.link/u/TtHomD9l"
  },
  "oversized-hoodie": {
    name: "BONSAID 'Rooted Resilience' Oversized Heavyweight",
    price: "$58.00 - $64.00",
    description: "Premium oversized heavyweight hoodie featuring the stunning BONSAID 'Rooted Resilience' artwork. Made with the highest quality materials for comfort and durability.",
    features: [
      "Premium heavyweight cotton blend",
      "Oversized fit for comfort",
      "High-quality screen print",
      "Multiple colors available",
      "Sizes S-3XL"
    ],
    image: "products/heavyhoodie/unisex-oversized-heavyweight-hoodie-black-front-68f8516e21ce8.png",
    paymentLink: "https://square.link/u/dPIuZdXp"
  },
  "premium-hoodie": {
    name: "BONSAID 'Rooted Resilience' Hoodie – Premium Print",
    price: "$47.00 - $52.00",
    description: "Premium hoodie with high-quality BONSAID 'Rooted Resilience' print. Perfect for music lovers who appreciate quality and style.",
    features: [
      "Premium cotton blend",
      "High-quality print technology",
      "Comfortable fit",
      "Multiple colors available",
      "Sizes S-2XL"
    ],
    image: "products/heritage/cotton-heritage-m2580-i-unisex-premium-pullover-hoodie-black-front-68f852913d80f.png",
    paymentLink: "https://square.link/u/hekKHhqP"
  },
  "trucker-cap": {
    name: "BONSAID Trucker Cap",
    price: "Customize at checkout",
    description: "Classic trucker cap featuring the BONSAID 'Rooted Resilience' artwork. Perfect for outdoor activities, music festivals, or just showing your BONSAID pride.",
    features: [
      "Classic trucker cap design",
      "Adjustable snapback closure",
      "Mesh back for breathability",
      "Curved brim for sun protection",
      "Multiple colors available",
      "One size fits most"
    ],
    image: "products/hissat/snapback-trucker-cap-black-front-68f86683df75f.png",
    paymentLink: "https://square.link/u/2LnPXdgV"
  }
};

// Modal functionality
function openProductModal(productId) {
  const product = productInfo[productId];
  if (!product) return;
  
  // Update modal content
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalPrice').textContent = product.price;
  document.getElementById('modalDescription').textContent = product.description;
  
  // Update features list
  const featuresContainer = document.getElementById('modalFeatures');
  featuresContainer.innerHTML = product.features.map(feature => 
    `<div style="display:flex;align-items:center;margin-bottom:8px;color:var(--ink)">
      <span style="color:var(--gold);margin-right:8px">✓</span>
      <span>${feature}</span>
    </div>`
  ).join('');
  
  // Set up buy now button
  const buyNowBtn = document.getElementById('buyNowBtn');
  buyNowBtn.onclick = function() {
    window.open(product.paymentLink, '_blank');
  };
  
  // Show modal with animation
  const modal = document.getElementById('productModal');
  modal.style.display = 'flex';
  // Force reflow to ensure display change is applied
  modal.offsetHeight;
  modal.style.opacity = '1';
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // Match the transition duration
}

// Product gallery cycling functionality
function initProductGalleries() {
  const galleries = document.querySelectorAll('.product-gallery');
  
  galleries.forEach((gallery, galleryIndex) => {
    const images = gallery.querySelectorAll('.gallery-image');
    if (images.length <= 1) return; // No cycling needed for single images
    
    let currentIndex = 0;
    
    // Different timing for each gallery to avoid synchronization
    const baseDelay = 5000; // 5 seconds base
    const staggerDelay = galleryIndex * 2000; // 2 second stagger between galleries
    const randomOffset = Math.random() * 1000; // Random 0-1 second offset
    
    const cycleDelay = baseDelay + staggerDelay + randomOffset;
    
    // Cycle through images with staggered timing
    setInterval(() => {
      // Hide current image
      images[currentIndex].style.opacity = '0';
      
      // Move to next image
      currentIndex = (currentIndex + 1) % images.length;
      
      // Show next image
      images[currentIndex].style.opacity = '1';
    }, cycleDelay);
  });
}

// Infinite scroll functionality
function initInfiniteScroll() {
  const scrollTrack = document.getElementById('infiniteScrollTrack');
  const originalGrid = document.querySelector('.store-grid');
  
  if (!scrollTrack || !originalGrid) return;
  
  // Get all store items
  const storeItems = originalGrid.querySelectorAll('.store-item');
  
  // Create infinite scroll by duplicating items
  const itemsHTML = Array.from(storeItems).map(item => item.outerHTML).join('');
  
  // Duplicate items for seamless infinite scroll
  scrollTrack.innerHTML = itemsHTML + itemsHTML;
  
  // Add event listeners to the new buttons
  scrollTrack.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product');
      openProductModal(productId);
    });
  });
  
  // Initialize galleries for the new items
  initProductGalleries();
}

// Initialize modal system
document.addEventListener('DOMContentLoaded', function() {
  // Initialize infinite scroll
  initInfiniteScroll();
  
  // Add event listeners to learn more buttons
  document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product');
      openProductModal(productId);
    });
  });
  
  // Add event listeners to close modal
  document.getElementById('closeModal').addEventListener('click', closeProductModal);
  
  // Close modal when clicking outside
  document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeProductModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProductModal();
    }
  });
});
