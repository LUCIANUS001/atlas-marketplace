// ===============================
// Newsletter Subscription
// ===============================

let emailInput = document.querySelector("#newsletter-email");
let message = document.querySelector("#newsletter-message");
let subscribeButton = document.querySelector(".newsletter-form button");

subscribeButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (emailInput.value.trim() === "") {
        message.textContent = "Please enter your email.";
        message.className = "error";
    } else {
        message.textContent = "Thanks for subscribing!";
        message.className = "success";
        emailInput.value = "";
    }
});

// ===============================
// Mobile Navigation
// ===============================

let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.querySelector(".nav-links");
let authButtons = document.querySelector(".auth-buttons");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");
    authButtons.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "&times;";
    } else {
        menuToggle.innerHTML = "&#9776;";
    }

});

// ===============================
// Dark Mode
// ===============================

let themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

});   

// ===============================
// Product Search
// ===============================

let searchInput = document.querySelector("#search-input");
let productCards = document.querySelectorAll(".product-card");
let noResults = document.querySelector("#no-results");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        let searchValue = searchInput.value.toLowerCase();
        let found = false;

        productCards.forEach(function(card){

            let productName = card.dataset.name.toLowerCase();

            if(productName.includes(searchValue)){
                card.style.display = "block";
                found = true;
            }else{
                card.style.display = "none";
            }

        });

        if(noResults){
            noResults.style.display = found ? "none" : "block";
        }

    });

}
// ===============================
// Product Category Filter
// ===============================

let filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Remove active class from every button
        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        });

        // Add active class to the clicked button
        button.classList.add("active");

        let filter = button.dataset.filter;

        productCards.forEach(function(card){

            let category = card.dataset.category;

            if(filter === "all" || category === filter){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }

        });

    });

});

// ===============================
// Atlas Vault
// ===============================

let vaultItems = JSON.parse(localStorage.getItem("vaultItems")) || [];

// ===============================
// Shopping Cart
// ===============================

let addToCartButtons = document.querySelectorAll(".product-actions button:last-child");

// Restore buttons
addToCartButtons.forEach(function(button){

    let productCard = button.closest(".product-card");

    let productName = productCard.dataset.name;

    if(cartItems.some(function(item){
        return item.name === productName;
    })){

        button.textContent = "Remove from Cart";
        button.classList.add("in-cart");

    }

});

// ===============================
// Add / Remove Cart
// ===============================

addToCartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let productCard = button.closest(".product-card");

        let productName = productCard.dataset.name;

        let price = Number(productCard.dataset.price);

        if(button.textContent === "Add to Cart"){

            cartCount++;
            totalPrice += price;

            cartItems.push({

                id: Date.now(),

                name: productName,

                price: price,

                quantity: 1

            });

            button.textContent = "Remove from Cart";

            button.classList.add("in-cart");

        }else{

            let index = cartItems.findIndex(function(item){

                return item.name === productName;

            });

            if(index !== -1){

                totalPrice -= cartItems[index].price;

                cartItems.splice(index,1);

                cartCount--;

            }

            button.textContent = "Add to Cart";

            button.classList.remove("in-cart");

        }

        cartNumber.textContent = cartCount;

        cartTotal.textContent = totalPrice;

        localStorage.setItem("cartCount", cartCount);

        localStorage.setItem("totalPrice", totalPrice);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateCartSidebar();

    });

});

// ===============================
// Shopping Cart Sidebar
// ===============================

let cartButton = document.querySelector(".cart-btn");
let cartSidebar = document.querySelector(".cart-sidebar");
let closeCartButton = document.querySelector(".close-cart");
let cartItemsContainer = document.querySelector(".cart-items");

let sidebarSubtotal = document.querySelector("#sidebar-subtotal");
let sidebarTotal = document.querySelector("#sidebar-total");

let clearCartButton = document.querySelector(".clear-cart");

function updateCartSidebar(){

    cartItemsContainer.innerHTML = "";

    if(cartItems.length === 0){

        cartItemsContainer.innerHTML =
        "<p class='empty-cart'>Your cart is empty.</p>";

    }else{

        cartItems.forEach(function(item){

            let product = document.createElement("div");
            product.className = "cart-item";

            product.innerHTML = `
    <div class="cart-item-info">
        <strong>${item.name}</strong>
        <p>$${item.price}</p>
    </div>

    <div class="cart-item-actions">
        <button class="minus-btn">−</button>

        <span class="quantity">${item.quantity}</span>

        <button class="plus-btn">+</button>

        <button class="remove-item">✕</button>
    </div>
`;

            let removeButton = product.querySelector(".remove-item");
            let plusButton = product.querySelector(".plus-btn");
            let minusButton = product.querySelector(".minus-btn");
            let quantityText = product.querySelector(".quantity");

            plusButton.addEventListener("click", function(){

    item.quantity++;

    cartCount++;
    totalPrice += item.price;

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartSidebar();

});

minusButton.addEventListener("click", function(){

    if(item.quantity > 1){

        item.quantity--;

        cartCount--;
        totalPrice -= item.price;

    }else{

        cartItems = cartItems.filter(function(cartItem){
            return cartItem.id !== item.id;
        });

        cartCount--;
        totalPrice -= item.price;

        addToCartButtons.forEach(function(button){

            if(button.parentElement.dataset.name === item.name){

                button.textContent = "Add to Cart";
                button.classList.remove("in-cart");

            }

        });

    }

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartSidebar();

});

            removeButton.addEventListener("click", function(){

                cartItems = cartItems.filter(function(cartItem){
                    return cartItem.id !== item.id;
                });

                cartCount--;
                totalPrice -= item.price;

                cartNumber.textContent = cartCount;
                cartTotal.textContent = totalPrice;

                localStorage.setItem("cartCount", cartCount);
                localStorage.setItem("totalPrice", totalPrice);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                addToCartButtons.forEach(function(button){

                    if(
                        button.parentElement.dataset.name === item.name &&
                        Number(button.parentElement.dataset.price) === item.price
                    ){

                        button.textContent = "Add to Cart";
                        button.classList.remove("in-cart");

                    }

                });

                updateCartSidebar();

            });

            cartItemsContainer.appendChild(product);

        });

    }

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    sidebarSubtotal.textContent = totalPrice;
    sidebarTotal.textContent = totalPrice;

}

clearCartButton.addEventListener("click", function(){

    cartCount = 0;
    totalPrice = 0;
    cartItems = [];

    cartNumber.textContent = 0;
    cartTotal.textContent = 0;

    localStorage.removeItem("cartCount");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("cartItems");

    addToCartButtons.forEach(function(button){

        button.textContent = "Add to Cart";
        button.classList.remove("in-cart");

    });

    updateCartSidebar();

});

cartButton.addEventListener("click", function(){

    cartSidebar.classList.add("active");

});

closeCartButton.addEventListener("click", function(){

    cartSidebar.classList.remove("active");

});

updateCartSidebar();

// ===============================
// Checkout Modal
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

    cartNumber.textContent = 0;
    cartTotal.textContent = 0;

    localStorage.removeItem("cartCount");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("cartItems");

    addToCartButtons.forEach(function(button){

        button.textContent = "Add to Cart";
        button.classList.remove("in-cart");

    });

    updateCartSidebar();

    checkoutModal.classList.remove("active");

});

// ===============================
// Atlas Vault Sidebar
// ===============================

vaultButton.addEventListener("click", function(){

    vaultSidebar.classList.add("active");

});

closeVaultButton.addEventListener("click", function(){

    vaultSidebar.classList.remove("active");

});

function updateVaultSidebar(){

    vaultItemsContainer.innerHTML = "";

    if(vaultItems.length === 0){

        vaultItemsContainer.innerHTML =
        "<p class='empty-vault'>Your Atlas Vault is empty.</p>";

        return;
    }

    vaultItems.forEach(function(item){

        let product = document.createElement("div");

        product.className = "vault-item";

        product.innerHTML = `
            <div class="vault-item-info">
                <strong>${item.name}</strong>
                <p>$${item.price}</p>
            </div>

            <button class="remove-vault">✕</button>
        `;

        let removeButton = product.querySelector(".remove-vault");

        removeButton.addEventListener("click", function(){

            vaultItems = vaultItems.filter(function(vaultItem){
                return vaultItem.name !== item.name;
            });

            localStorage.setItem("vaultItems", JSON.stringify(vaultItems));

            vaultCount.textContent = vaultItems.length;

            vaultButtons.forEach(function(button){

    if(button.closest(".product-card").dataset.name === item.name){

        button.textContent = "🧭 Save to Vault";
        button.classList.remove("saved");

    }

});

            updateVaultSidebar();

        });

        vaultItemsContainer.appendChild(product);

    });

}

updateVaultSidebar();