document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {

        const product = {
            name: card.dataset.name,
            price: card.dataset.price,
            image: card.dataset.image,
            description: card.dataset.description
        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

        window.location.href = "product.html";
    });
});

// ===============================
// Display Selected Product
// ===============================

const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if (selectedProduct) {

    document.getElementById("product-title").textContent =
        selectedProduct.name;

    document.getElementById("product-price").textContent =
        "$" + selectedProduct.price;

    document.getElementById("product-description").textContent =
        selectedProduct.description;

    document.getElementById("product-image").src =
        selectedProduct.image;

    document.getElementById("product-image").alt =
        selectedProduct.name;

}