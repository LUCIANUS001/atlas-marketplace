// ===============================
// Product Search
// ===============================

let searchInput = document.querySelector("#search-input");
let productCards = document.querySelectorAll(".product-card");
let noResults = document.querySelector("#no-results");

if(searchInput){

    searchInput.addEventListener("input", function(){

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