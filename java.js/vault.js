// ===============================
// Atlas Vault
// ===============================

// Vault Elements
let vaultButtons = document.querySelectorAll(".vault-btn");
let vaultButton = document.querySelector(".vault-btn-nav");
let vaultSidebar = document.querySelector(".vault-sidebar");
let vaultItemsContainer = document.querySelector(".vault-items");
let closeVaultButton = document.querySelector(".close-vault");
let vaultCount = document.querySelector("#vault-count");

// Restore Vault Count
vaultCount.textContent = vaultItems.length;

// ===============================
// Restore Saved Buttons
// ===============================

vaultButtons.forEach(function(button){

    let productCard = button.closest(".product-card");
    let productName = productCard.dataset.name;

    if(vaultItems.some(function(item){
        return item.name === productName;
    })){

        button.textContent = "✓ In Vault";
        button.classList.add("saved");

    }

});

// ===============================
// Save Product To Vault
// ===============================

vaultButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let productCard = button.closest(".product-card");

        let productName = productCard.dataset.name;
        let productPrice = Number(productCard.dataset.price);

        let exists = vaultItems.some(function(item){
            return item.name === productName;
        });

        if(exists){
            return;
        }

        vaultItems.push({
            name: productName,
            price: productPrice
        });

        localStorage.setItem("vaultItems", JSON.stringify(vaultItems));

        vaultCount.textContent = vaultItems.length;

        button.textContent = "✓ In Vault";
        button.classList.add("saved");

        updateVaultSidebar();

    });

});

// ===============================
// Update Vault Sidebar
// ===============================

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

    <button class="remove-vault" title="Remove from Vault">
        ✕
    </button>
`;

        let removeButton = product.querySelector(".remove-vault");

        removeButton.addEventListener("click", function(){

            vaultItems = vaultItems.filter(function(vaultItem){
                return vaultItem.name !== item.name;
            });

            localStorage.setItem("vaultItems", JSON.stringify(vaultItems));

            vaultCount.textContent = vaultItems.length;

            vaultButtons.forEach(function(button){

                let productCard = button.closest(".product-card");

                if(productCard.dataset.name === item.name){

                    button.textContent = "🧭 Save to Vault";
                    button.classList.remove("saved");

                }

            });

            updateVaultSidebar();

        });

        vaultItemsContainer.appendChild(product);

    });

}

// ===============================
// Initialize Vault
// ===============================

updateVaultSidebar();

// ===============================
// Open / Close Sidebar
// ===============================

vaultButton.addEventListener("click", function(){

    vaultSidebar.classList.add("active");

});

closeVaultButton.addEventListener("click", function(){

    vaultSidebar.classList.remove("active");

});