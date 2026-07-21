// ===============================
// Newsletter Subscription
// ===============================

let emailInput = document.querySelector("#newsletter-email");
let message = document.querySelector("#newsletter-message");
let subscribeButton = document.querySelector(".newsletter-form button");

subscribeButton.addEventListener("click", function(event){

    event.preventDefault();

    if(emailInput.value.trim() === ""){

        message.textContent = "Please enter your email.";
        message.className = "error";

    }else{

        message.textContent = "Thanks for subscribing!";
        message.className = "success";

        emailInput.value = "";

    }

});