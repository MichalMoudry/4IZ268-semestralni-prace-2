var email = { id: "", title: "", date: "", content: "", to: "", from: "" };

$(document).ready(function () {
    if (window.location.search.substr(1) != "") {
        var textArea = document.getElementById("email-content");
        textArea.style.height = textArea.scrollHeight + "px";
        var localstorageKeys = Object.keys(localStorage);
        var emails = localstorageKeys.filter(element => element.includes("sent_") || element.includes("draft_") || element.includes("scheduled_"));
        email["id"] = window.location.search.substr(1).split("=")[1];
        email["title"] = email["id"].replace(/-/g, " ").split("_")[0];
        email["date"] = email["id"].split("_")[1];
        document.getElementById("email-title").textContent = email["title"];
        var emailAsJson = JSON.parse(localStorage.getItem(emails.filter(element => element.includes(email["date"]))));
        document.getElementById("email-from").textContent = emailAsJson[2];
        document.getElementById("email-to").textContent = emailAsJson[1];
        textArea.textContent = emailAsJson[4];
        console.log(emailAsJson);
    }
});