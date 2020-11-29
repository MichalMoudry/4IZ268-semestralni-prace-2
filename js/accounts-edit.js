var userID;
var userData = { smtp_server: "", smtp_username: "", smtp_password: "" };

$(document).ready(function () {
    if (window.location.search.substr(1) != "") {
        userID = window.location.search.substr(1).split("=")[1].replace(/%20/g, " ");
        if (userID != null || userID != "") {
            $("#title-account-name").text(userID);
            var userDataAsJsonObj = JSON.parse(localStorage.getItem(userID));
            userData["smtp_server"] = userDataAsJsonObj[0];
            userData["smtp_username"] = userDataAsJsonObj[1];
            userData["smtp_password"] = userDataAsJsonObj[2];
            $("#account-host").val(userData["smtp_server"]);
            $("#account-username").val(userData["smtp_username"]);
            $("#account-password").val(userData["smtp_password"]);
        }
    }
});

function editAccount() {
    userData["smtp_server"] = $("#account-host").val();
    userData["smtp_username"] = $("#account-username").val();
    userData["smtp_password"] = $("#account-password").val();
    if (userData["smtp_server"] != "" && userData["smtp_username"] != "" && userData["smtp_password"] != "") {
        localStorage.removeItem(userID);
        localStorage.setItem(userID, JSON.stringify([userData["smtp_server"], userData["smtp_username"], userData["smtp_password"], Date.now()]));
        displayAlert("account-edit-success");
        dismissAlert("account-edit-error");
    }
    else {
        displayAlert("account-edit-error");
        dismissAlert("account-edit-success");
    }
}

function deleteAccount() {
    var confirmRes = confirm("Do you want to delete " + userData["smtp_username"] + " account?");
    if (confirmRes === true) {
        localStorage.removeItem(userID);
        window.location.href = "https://michalmoudry.github.io/4IZ268-semestralni-prace-2/accounts/";
    }
}