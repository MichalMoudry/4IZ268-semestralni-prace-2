var email = { id: "", title: "", date: "", content: "", to: "", from: "" };

$(document).ready(function () {
    if (window.location.search.substr(1) != "") {
        var textArea = document.getElementById("email-content");
        var localstorageKeys = Object.keys(localStorage);
        var emails = localstorageKeys.filter(element => element.includes("sent_"));
        email["id"] = window.location.search.substr(1).split("=")[1];
        email["title"] = email["id"].replace(/-/g, " ").split("_")[0];
        email["date"] = email["id"].split("_")[1];
        document.title = email["title"] + " - Email Sender";
        $("#email-title").text(email["title"]);
        var emailAsJson = JSON.parse(localStorage.getItem(emails.filter(element => element.includes(email["date"]))));
        email["date"] = emailAsJson[5];
        document.getElementById("email-from").textContent = emailAsJson[2];
        document.getElementById("email-to").textContent = emailAsJson[1];
        document.getElementById("date-span").textContent = new Date(emailAsJson[5]).toLocaleString();
        textArea.textContent = emailAsJson[4];
        textArea.style.height = textArea.scrollHeight + "px";
    }
});

function discardEmail() {
    localStorage.removeItem("sent_" + email["title"] + email["date"]);
    window.location.href = "./";
}