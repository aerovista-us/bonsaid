# BONSAID Store Setup Guide

## 🛍️ **How to Connect Your Printful Products**

### **Step 1: Get Your Printful Product URLs**

1. **Log into Printful** → Go to your products
2. **Find your test product** → Click "View" or "Edit"  
3. **Copy the product URL** (looks like: `https://www.printful.com/products/12345`)
4. **Or get the direct buy link** if you have one

### **Step 2: Update the Configuration**

Edit the `store-config.js` file and replace the placeholder URLs:

```javascript
const storeProducts = {
  tshirt: {
    name: "BONSAID T-Shirt",
    price: "$25.00",
    url: "YOUR_ACTUAL_PRINTFUL_T_SHIRT_URL", // ← Replace this
    image: "bonsaid-hyper-vector.svg"
  },
  mug: {
    name: "BONSAID Mug", 
    price: "$20.00",
    url: "YOUR_ACTUAL_PRINTFUL_MUG_URL", // ← Replace this
    image: "bonsaid-hyper-vector.svg"
  },
  // ... etc for all products
};
```

### **Step 3: Test Your Links**

1. **Open your store page** in a browser
2. **Click the "Buy Now" buttons** to test
3. **Verify they open** your Printful products
4. **Test the purchase flow** with a small test order

### **Step 4: Deploy to GitHub Pages**

1. **Create a new GitHub repository** for your store
2. **Push your code** to the repository
3. **Enable GitHub Pages** in repository settings
4. **Share your live store URL** with customers

## 🎯 **Quick Setup for Testing**

### **For Your Test Product:**
1. **Find your Printful product URL**
2. **Replace `YOUR_T_SHIRT_PRINTFUL_URL`** in `store-config.js`
3. **Test the t-shirt button** first
4. **Add more products** as you create them

### **Example:**
```javascript
tshirt: {
  name: "BONSAID T-Shirt",
  price: "$25.00",
  url: "https://www.printful.com/products/12345", // ← Your actual URL
  image: "bonsaid-hyper-vector.svg"
}
```

## 🚀 **Ready to Go!**

Once you update the URLs, your store will be fully functional with:
- ✅ **Working buy buttons** that open Printful
- ✅ **Zero inventory** - Printful handles everything
- ✅ **Automatic fulfillment** - you just collect profits
- ✅ **Professional store** that matches your BONSAID brand

**Your dropshipping store is ready to start making money!** 🎵💰
