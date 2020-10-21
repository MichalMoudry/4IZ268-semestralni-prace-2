$(document).ready(function () {
    document.getElementById("email-content").textContent = "";
});

function sendEmail() {
    var sender = document.getElementById("email-sender").value;
    var title = document.getElementById("email-title").value;
    var recipient = document.getElementById("email-recipient").value;
    var content = document.getElementById("email-content").value;
    Email.send({
        Host : "", //ex.: smtp.office365.com
        Username : "",
        Password : "",
        To : "",
        From : "",
        Subject : "",
        Body : ""
    });
}