$(document).ready(function () {
    window.addEventListener("online", function () {
        dismissAlert("network-connection-alert");
        //When network connection is detected, then send all scheduled emails
        sendScheduledEmails();
    });
    window.addEventListener("offline", function () {
        displayAlert("network-connection-alert");
    });
    sendScheduledEmails();
});

function sendScheduledEmails() {
    var scheduledEmailKeys = Object.keys(localStorage).filter(element => element.includes("scheduled_"));
    scheduledEmailKeys.forEach(scheduledEmailKey => {
        var account = JSON.parse(localStorage.getItem(scheduledEmailKey));
        Email.send({
            Host : account[0],
            Username : account[1],
            Password : account[2],
            To : account[3],
            From : account[4],
            Subject : account[5],
            Body : account[6]
        });
        saveSentEmail(account[5], account[7], JSON.stringify([account[0], account[3], account[4], account[5], account[6], account[7]]));
        localStorage.removeItem(scheduledEmailKey);
    });
}

function saveSentEmail(title, date_sent, contentAsJsonString) {
    localStorage.setItem("sent_" + title + "_" + date_sent, contentAsJsonString);
}

function dismissAlert(alertID) {
    document.getElementById(alertID).classList.remove("display-block");
    document.getElementById(alertID).classList.add("display-none");
}

function displayAlert(alertID) {
    document.getElementById(alertID).classList.add("display-block");
    document.getElementById(alertID).classList.remove("display-none");
}