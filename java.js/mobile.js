// ===============================
// Mobile Navigation
// ===============================

let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.querySelector(".nav-links");
let authButtons = document.querySelector(".auth-buttons");

menuToggle.addEventListener("click", function(){

    navLinks.classList.toggle("active");
    authButtons.classList.toggle("active");

    if(navLinks.classList.contains("active")){
        menuToggle.innerHTML = "&times;";
    }else{
        menuToggle.innerHTML = "&#9776;";
    }

});