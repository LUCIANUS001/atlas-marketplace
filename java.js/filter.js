// ===============================
// Product Category Filter
// ===============================

let filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Remove active class
        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        });

        // Activate clicked button
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