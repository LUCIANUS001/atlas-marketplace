// ===============================
// Global App State
// ===============================

// Shopping Cart
let cartCount = Number(localStorage.getItem("cartCount")) || 0;
let totalPrice = Number(localStorage.getItem("totalPrice")) || 0;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Atlas Vault
let vaultItems = JSON.parse(localStorage.getItem("vaultItems")) || [];