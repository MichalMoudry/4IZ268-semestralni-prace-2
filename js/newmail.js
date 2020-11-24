$(document).ready(function () {
    $("textarea").text("");
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
    var sender = $("#email-sender").val();
    var title = $("#email-title").val();
    var recipient = $("#email-recipient").val();
    var content = $("#email-content").val();
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
    var sender = $("#email-sender").val();
    var title = $("#email-title").val();
    var recipient = $("#email-recipient").val();
    var content = $("#email-content").val();
    if (title != "" && recipient != "" && content != "" && sender != "") {
        var account = JSON.parse(localStorage.getItem(sender));
        var dateSent = Date.now();
        saveEmailToDrafts(title, dateSent, JSON.stringify([account[0], account[1], account[2], recipient, sender, title, content, dateSent]));
        clearForm();
        displayAlert("drafts-success-alert");
        dismissAlert("form-error-alert");
    }
    else {
        displayAlert("form-error-alert");
    }
}

function saveEmailToDrafts(title, date_created, contentAsJsonString) {
    localStorage.setItem("draft_" + title + date_created + "", contentAsJsonString);
}

function saveEmailForScheduling(title, date_sent, contentAsJsonString) {
    localStorage.setItem("scheduled_" + title + date_sent + "", contentAsJsonString);
}

/// <summary>
/// Method for clearing all form inputs.
/// </summary>
function clearForm() {
    $("#email-title").val("");
    $("#email-recipient").val("");
    $("#email-content").val("");
}

function discardEmail() {
    window.location.href = "./";
}