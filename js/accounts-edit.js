var userID;
var userData = { smtp_server: "", smtp_username: "", smtp_password: "" };

$(document).ready(function () {
    userID = window.location.search.substr(1).split("=")[1].replace(/%20/g, " ");
    if (userID != null || userID != "") {
        document.getElementById("title-account-name").textContent = userID;
        document.getElementById("account-displayname").value = userID;
        var userDataAsJsonObj = JSON.parse(localStorage.getItem(userID));
        userData["smtp_server"] = userDataAsJsonObj[0];
        userData["smtp_username"] = userDataAsJsonObj[1];
        userData["smtp_password"] = userDataAsJsonObj[2];
        document.getElementById("account-host").value = userData["smtp_server"];
        document.getElementById("account-username").value = userData["smtp_username"];
        document.getElementById("account-password").value = userData["smtp_password"];
    }
});

function editAccount() {
    userData["smtp_server"] = document.getElementById("account-host").value;
    userData["smtp_username"] = document.getElementById("account-username").value;
    userData["smtp_password"] = document.getElementById("account-password").value;
    if (userData["smtp_server"] != "" && userData["smtp_username"] != "" && userData["smtp_password"] != "") {
        localStorage.removeItem(userID);
        localStorage.setItem(userID, JSON.stringify([userData["smtp_server"], userData["smtp_username"], userData["smtp_password"], Date.now()]));
        document.getElementById("account-edit-success").style.display = "block";
    }
    else {
        console.error("Form inputs are empty.");
        document.getElementById("account-edit-error").style.display = "block";
    }
}