$(document).ready(function () {
    window.addEventListener("online", function () {
        dismissAlert("network-connection-alert");
        //When network connection is detected, then send all scheduled emails
        //sendScheduledEmails();
    });
    window.addEventListener("offline", function () {
        displayAlert("network-connection-alert");
    });
    document.getElementById("email-content").textContent = "";
    var keys = Object.keys(localStorage);
    var userIDs = keys.filter(element => !element.includes("sent_") && !element.includes("draft_") && !element.includes("scheduled_"));
    //If user created more accounts then fill UI with options and links.
    if (userIDs.length > 0) {
        var account_selector = document.getElementById("email-sender");
        var account_option;
        for (let index = 0; index < userIDs.length; index++) {
            const element = userIDs[index];
            account_option = document.createElement("option");
            account_option.value = element;
            account_option.textContent = element;
            account_selector.appendChild(account_option);
        }
    }
});

/// <summary>
/// Method for handling onclick event that triggers sending of an email.
/// </summary>
function sendEmail() {
    var sender = document.getElementById("email-sender").value;
    var title = document.getElementById("email-title").value;
    var recipient = document.getElementById("email-recipient").value;
    var content = document.getElementById("email-content").value;
    if (title != "" && recipient != "" && content != "" && sender != "") {
        //Set date when email was sent.
        var dateSent = Date.now();
        var account = JSON.parse(localStorage.getItem(sender));
        //Try send email.
        try {
            if (window.navigator.onLine === false) {
                throw "Your device is offline";
            }
            Email.send({
                Host : account[0],
                Username : account[1],
                Password : account[2],
                To : recipient,
                From : sender,
                Subject : title,
                Body : content
            });
            //If email was sent, save data for later viewing.
            saveSentEmail(title, dateSent, JSON.stringify([account[0], recipient, sender, title, content, dateSent]));
            clearForm();
            displayAlert("send-success-alert");
        } catch (error) {
            //If error happened then schedule email for later.
            saveEmailForScheduling(title, dateSent, JSON.stringify([account[0], account[1], account[2], recipient, sender, title, content, dateSent]));
        }
    }
    else {
        displayAlert("form-error-alert");
    }
}

/// <summary>
/// Method for handling onclick event that triggers saving of an email to drafts.
/// </summary>
function saveDraft() {
    var sender = document.getElementById("email-sender").value;
    var title = document.getElementById("email-title").value;
    var recipient = document.getElementById("email-recipient").value;
    var content = document.getElementById("email-content").value;
    if (title != "" && recipient != "" && content != "" && sender != "") {
        var account = JSON.parse(localStorage.getItem(sender));
        var dateSent = Date.now();
        saveEmailToDrafts(title, dateSent, JSON.stringify([account[0], account[1], account[2], recipient, sender, title, content, dateSent]));
        clearForm();
        displayAlert("drafts-success-alert");
    }
    else {
        displayAlert("form-error-alert");
    }
}

function saveEmailToDrafts(title, date_created, contentAsJsonString) {
    localStorage.setItem("draft_" + title + date_created + "", contentAsJsonString);
}

function saveSentEmail(title, date_sent, contentAsJsonString) {
    localStorage.setItem("sent_" + title + date_sent + "", contentAsJsonString);
}

function saveEmailForScheduling(title, date_sent, contentAsJsonString) {
    localStorage.setItem("scheduled_" + title + date_sent + "", contentAsJsonString);
}

function dismissAlert(alertID) {
    document.getElementById(alertID).classList.remove("display-block");
    document.getElementById(alertID).classList.add("display-none");
}

function displayAlert(alertID) {
    document.getElementById(alertID).classList.add("display-block");
    document.getElementById(alertID).classList.remove("display-none");
}

/// <summary>
/// Method for clearing all form inputs.
/// </summary>
function clearForm() {
    document.getElementById("email-title").value = "";
    document.getElementById("email-recipient").value = "";
    document.getElementById("email-content").value = "";
}

function discardEmail() {
    window.location.href = "./";
}