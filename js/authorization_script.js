document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".header-form").addEventListener("click", function () {
        window.location.href = "../html/main-page.html";
    })
});

let totalCount = parseInt(sessionStorage.getItem('total-count'));

let registered;
const text = sessionStorage.getItem("registered");
if (text != undefined) {
    if (text === "true") {
        registered = true
    } else if (text === "false") {
        registered = false
    }
} else {
    registered = false;
}

const cartCount = document.querySelector('header .icons .cart .cart-count');
cartCount.innerText = totalCount > 0 ? String(totalCount) : "";

const launchSignForm = () => {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btn-sign-in").addEventListener("click", function () {
            const username = document.querySelector(".auth-username").value;
            const email = document.querySelector(".auth-email").value;
            const password = document.querySelector(".auth-password").value;

            if (username.length > 0 && email.length > 0 && email.includes("@") && password.length > 0) {
                document.querySelector(".hello-user-text .user-name").innerText = username;
                sessionStorage.setItem("username", String(username));
                document.querySelector(".user-icon-wrapper .user-name").innerText = String(username);
                registered = true
                sessionStorage.setItem("registered", String(registered));
                document.querySelector(".auth-wrapper").classList.add("hidden");
                document.querySelector(".user-wrapper").classList.remove("hidden");
                launchText();
            } else {
                alert("Форма заполнена неверно!")
            }
        })
    });
}

const launchText = () => {
    document.querySelector(".hello-user-text .user-name").innerText = sessionStorage.getItem("username");

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector(".unregister-btn").addEventListener("click", function () {
            sessionStorage.setItem("username", "");
            document.querySelector(".user-icon-wrapper .user-name").innerText = "";
            registered = false
            sessionStorage.setItem("registered", String(registered));
            document.querySelector(".auth-wrapper").classList.remove("hidden");
            document.querySelector(".user-wrapper").classList.add("hidden");
            launchSignForm();
        })
    });
}

if (registered === false || registered === undefined) {
    document.querySelector(".auth-wrapper").classList.remove("hidden");
    document.querySelector(".user-wrapper").classList.add("hidden");
    launchSignForm();
} else {
    document.querySelector(".auth-wrapper").classList.add("hidden");
    document.querySelector(".user-wrapper").classList.remove("hidden");
    launchText();
}
