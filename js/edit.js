var email = { id: "", title: "", date: "", content: "", to: "" };
var account = { server: "", username: "", password: "" };
var emailType;
var emailAsJson;

$(document).ready(function () {
    if (window.location.search.substr(1) != "") {
        var localstorageKeys = Object.keys(localStorage);
        var draftsAndScheduled = localstorageKeys.filter(element => element.includes("draft_") || element.includes("scheduled_"));
        email["id"] = window.location.search.substr(1).split("=")[1];
        email["date"] = email["id"].split("_")[1];
        var res = false;
        const regex = new RegExp("draft_.*_" + email["date"] + "*", "g");
        var element;
        for (let x = 0; x < draftsAndScheduled.length; x++) {
            element = draftsAndScheduled[x];
            res = regex.test(element);
            if (res) {
                emailAsJson = JSON.parse(localStorage.getItem(element));
                email["title"] = emailAsJson[5];
                email["to"] = emailAsJson[3];
                email["content"] = emailAsJson[4];
                account["server"] = emailAsJson[0];
                account["username"] = emailAsJson[1];
                account["password"] = emailAsJson[2];
                break;
            }
        }
        if (res) {
            var emailIdentifiers = document.getElementsByClassName("email-identifier-span");
            emailType = "draft";
            for (let n = 0; n < emailIdentifiers.length; n++) {
                emailIdentifiers[n].textContent = " " + emailType;
            }
            $("#email-title").val(email["title"]);
            $("#email-recipient").val(email["to"]);
            $("#email-content").val(email["content"]);
        }
    }
});

function discardEmail() {
    var confirmRes = confirm("Do you want to delete " + email["title"] + " " + emailType + "?");
    if (confirmRes) {
        localStorage.removeItem(emailType + "_" + email["title"] + "_" + email["date"]);
        window.location.href = "./";
    }
}