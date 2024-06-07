if (sessionStorage.getItem("username") != undefined || sessionStorage.getItem("username") != "") {
    document.querySelector(".user-icon-wrapper .user-name").innerText = sessionStorage.getItem("username");
}