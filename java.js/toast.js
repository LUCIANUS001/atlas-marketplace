// ===============================
// Toast Notification
// ===============================

let toast = document.querySelector("#toast");
let toastMessage = document.querySelector("#toast-message");

function showToast(message,type="success"){

    toast.className="toast";

    toast.classList.add(type);

    toastMessage.textContent=message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2500);

}