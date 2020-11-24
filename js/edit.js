var email = { id: "", title: "", date: "", content: "", to: "", from: "" };
var emailType;

$(document).ready(function () {
    if (window.location.search.substr(1) != "") {
        var localstorageKeys = Object.keys(localStorage);
        var draftsAndScheduled = localstorageKeys.filter(element => element.includes("draft_") || element.includes("scheduled_"));
        email["id"] = window.location.search.substr(1).split("=")[1];
        var emailKey = email["id"].replace(/-/g, " ").replace(/_/g, "");
        var emailIdentifiers = document.getElementsByClassName("email-identifier-span");
        if (draftsAndScheduled.includes("draft_" + emailKey)) {
            emailType = "draft";
            
            for (let n = 0; n < emailIdentifiers.length; n++) {
                emailIdentifiers[n].textContent = " draft";
            }
        }
        email["title"] = email["id"].replace(/-/g, " ").split("_")[0];
        email["date"] = email["id"].split("_")[1];
    }
});

function discardEmail() {
    var confirmRes = confirm("Do you want to delete " + email["title"] + " " + emailType + "?");
    if (confirmRes) {
        window.location.href = "./";
    }
}