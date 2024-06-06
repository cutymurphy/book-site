document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector("header").classList.toggle("open-menu")
    })
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filter").addEventListener("click", function () {
        document.querySelector(".shop-wrapper").classList.add("open-filters")
    })
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("back").addEventListener("click", function () {
        document.querySelector(".shop-wrapper").classList.remove("open-filters")
    })
});