// ===============================
// Checkout
// ===============================

let checkoutButton = document.querySelector(".checkout-btn");
let checkoutModal = document.querySelector(".checkout-modal");
let checkoutTotal = document.querySelector("#checkout-total");

let closeCheckout = document.querySelector(".close-checkout");
let confirmOrder = document.querySelector(".confirm-order");

checkoutButton.addEventListener("click", function(){

    checkoutTotal.textContent = totalPrice;

    checkoutModal.classList.add("active");

});

closeCheckout.addEventListener("click", function(){

    checkoutModal.classList.remove("active");

});

confirmOrder.addEventListener("click", function(){

    alert("🎉 Order placed successfully!");

    cartCount = 0;
    totalPrice = 0;
    cartItems = [];

    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("totalPrice");

    cartNumber.textContent = 0;
    cartTotal.textContent = 0;

    updateCartSidebar();

    checkoutModal.classList.remove("active");

});