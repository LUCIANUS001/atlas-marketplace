// ===============================
// Atlas Shopping Cart
// ===============================

// Cart Buttons
let addToCartButtons = document.querySelectorAll(".product-actions button:last-child");

// Cart Navigation
let cartButton = document.querySelector(".cart-btn");
let cartSidebar = document.querySelector(".cart-sidebar");
let closeCartButton = document.querySelector(".close-cart");

// Cart Containers
let cartItemsContainer = document.querySelector(".cart-items");

// Cart Numbers
let cartNumber = document.querySelector("#cart-count");
let cartTotal = document.querySelector("#cart-total");

// Sidebar Totals
let sidebarSubtotal = document.querySelector("#sidebar-subtotal");
let sidebarTotal = document.querySelector("#sidebar-total");

// Clear Cart Button
let clearCartButton = document.querySelector(".clear-cart");

// ===============================
// Restore Cart Values
// ===============================

cartNumber.textContent = cartCount;
cartTotal.textContent = totalPrice;

sidebarSubtotal.textContent = totalPrice;
sidebarTotal.textContent = totalPrice;

// ===============================
// Restore Cart Buttons
// ===============================

addToCartButtons.forEach(function(button){

    let productCard = button.closest(".product-card");

    let productName = productCard.dataset.name;

    let exists = cartItems.some(function(item){
        return item.name === productName;
    });

    if(exists){

        button.textContent = "Remove from Cart";
        button.classList.add("in-cart");

    }else{

        button.textContent = "Add to Cart";
        button.classList.remove("in-cart");

    }

});

// ===============================
// Add / Remove Cart
// ===============================

addToCartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let productCard = button.closest(".product-card");

        let productName = productCard.dataset.name;
        let productPrice = Number(productCard.dataset.price);

        let index = cartItems.findIndex(function(item){
            return item.name === productName;
        });

        if(index === -1){

            cartItems.push({
                id: Date.now(),
                name: productName,
                price: productPrice,
                quantity: 1
            });

            cartCount++;
            totalPrice += productPrice;

            button.textContent = "Remove from Cart";
            button.classList.add("in-cart");

        }else{

            cartCount -= cartItems[index].quantity;
            totalPrice -= cartItems[index].price * cartItems[index].quantity;

            cartItems.splice(index, 1);

            button.textContent = "Add to Cart";
            button.classList.remove("in-cart");

        }

        cartNumber.textContent = cartCount;
        cartTotal.textContent = totalPrice;

        sidebarSubtotal.textContent = totalPrice;
        sidebarTotal.textContent = totalPrice;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("cartCount", cartCount);
        localStorage.setItem("totalPrice", totalPrice);

        updateCartSidebar();

    });

});

// ===============================
// Update Cart Sidebar
// ===============================

function updateCartSidebar(){

    cartItemsContainer.innerHTML = "";

    if(cartItems.length === 0){

        cartItemsContainer.innerHTML =
        "<p class='empty-cart'>Your cart is empty.</p>";

        sidebarSubtotal.textContent = 0;
        sidebarTotal.textContent = 0;

        return;
    }

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

        // ===============================
// Cart Item Controls
// ===============================

let plusButton = product.querySelector(".plus-btn");
let minusButton = product.querySelector(".minus-btn");
let removeButton = product.querySelector(".remove-item");

// Increase Quantity
plusButton.addEventListener("click", function(){

    item.quantity++;

    cartCount++;
    totalPrice += item.price;

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    sidebarSubtotal.textContent = totalPrice;
    sidebarTotal.textContent = totalPrice;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", totalPrice);

    updateCartSidebar();

});

// Decrease Quantity
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

            let productCard = button.closest(".product-card");

            if(productCard.dataset.name === item.name){

                button.textContent = "Add to Cart";
                button.classList.remove("in-cart");

            }

        });

    }

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    sidebarSubtotal.textContent = totalPrice;
    sidebarTotal.textContent = totalPrice;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", totalPrice);

    updateCartSidebar();

});

// Remove Item
removeButton.addEventListener("click", function(){

    cartCount -= item.quantity;
    totalPrice -= item.price * item.quantity;

    cartItems = cartItems.filter(function(cartItem){
        return cartItem.id !== item.id;
    });

    addToCartButtons.forEach(function(button){

        let productCard = button.closest(".product-card");

        if(productCard.dataset.name === item.name){

            button.textContent = "Add to Cart";
            button.classList.remove("in-cart");

        }

    });

    cartNumber.textContent = cartCount;
    cartTotal.textContent = totalPrice;

    sidebarSubtotal.textContent = totalPrice;
    sidebarTotal.textContent = totalPrice;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("totalPrice", totalPrice);

    updateCartSidebar();

});

        cartItemsContainer.appendChild(product);

    });

    sidebarSubtotal.textContent = totalPrice;
    sidebarTotal.textContent = totalPrice;

}

updateCartSidebar();

// ===============================
// Clear Cart
// ===============================

clearCartButton.addEventListener("click", function(){

    cartItems = [];
    cartCount = 0;
    totalPrice = 0;

    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("totalPrice");

    cartNumber.textContent = 0;
    cartTotal.textContent = 0;

    sidebarSubtotal.textContent = 0;
    sidebarTotal.textContent = 0;

    addToCartButtons.forEach(function(button){

        button.textContent = "Add to Cart";
        button.classList.remove("in-cart");

    });

    updateCartSidebar();

});

// ===============================
// Open / Close Cart Sidebar
// ===============================

cartButton.addEventListener("click", function(){

    cartSidebar.classList.add("active");

});

closeCartButton.addEventListener("click", function(){

    cartSidebar.classList.remove("active");

});
