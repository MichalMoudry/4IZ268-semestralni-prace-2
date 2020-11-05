$(document).ready(function () {
    window.addEventListener("online", function () {
        dismissAlert("network-connection-alert");
        //When network connection is detected, then send all scheduled emails
        sendScheduledEmails();
    });
    window.addEventListener("offline", function () {
        document.getElementById("network-connection-alert").style.display = "block";
    });
    sendScheduledEmails();
    document.getElementById("email-content").textContent = "";
    var keys = Object.keys(localStorage);
    var userIDs = keys.filter(element => !element.includes("sent_") && !element.includes("draft_") && !element.includes("scheduled_"));
    var sentEmails = keys.filter(element => element.includes("sent_"));
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
    //If user sent any emails then display them in UI.
    if (sentEmails.length > 0) {
        //Container variables.
        var itemContainer;
        var logoDiv;
        var titleDiv;
        var toDiv;
        var dateDiv;
        var itemContent;
        var emailList = document.getElementById("email-list");
        //Variables for content holders.
        var titleP;
        var toP;
        var ellipse;
        var initialsP;
        var firstInitial;
        var secondInitial;
        var toSplit;
        for (let i = 0; i < sentEmails.length; i++) {
            emailDataAsJson = JSON.parse(localStorage.getItem(sentEmails[i]));
            itemContainer = document.createElement("div");
            itemContainer.classList.add("email-list-item");
            logoDiv = document.createElement("div");
            titleDiv = document.createElement("div");
            toDiv = document.createElement("div");
            dateDiv = document.createElement("div");
            itemContent = document.createElement("div");
            itemContent.classList.add("email-list-item-content");
            titleP = document.createElement("p");
            titleP.classList.add("email-list-title");
            toP = document.createElement("p");
            toP.classList.add("to-paragraph");
            initialsP = document.createElement("p");

            titleP.textContent = emailDataAsJson[3];
            titleDiv.appendChild(titleP);
            itemContent.appendChild(titleDiv);
            toP.textContent = "From: " + emailDataAsJson[1];
            toDiv.appendChild(toP);
            itemContent.appendChild(toDiv);

            ellipse = document.createElement("div");
            ellipse.classList.add("ellipse");
            toSplit = emailDataAsJson[1].toString().split("@")[0].split(".");
            firstInitial = toSplit[0][0].toUpperCase();
            secondInitial = toSplit[1][0].toUpperCase();
            initialsP.textContent = firstInitial + secondInitial;
            ellipse.appendChild(initialsP);
            logoDiv.appendChild(ellipse);

            itemContainer.appendChild(logoDiv);
            itemContainer.appendChild(itemContent);
            itemContainer.appendChild(dateDiv);
            emailList.appendChild(itemContainer);
            emailList.appendChild(document.createElement("hr"));
            //titleColumn.textContent = emailDataAsJson[3];
            //toColumn.textContent = emailDataAsJson[1];
            //fromColumn.textContent = emailDataAsJson[2];
            //dateColumn.textContent = new Date(emailDataAsJson[5]).toLocaleString();
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
            document.getElementById("send-success-alert").style.display = "block";
        } catch (error) {
            //If error happened then schedule email for later.
            saveEmailForScheduling(title, dateSent, JSON.stringify([account[0], account[1], account[2], recipient, sender, title, content, dateSent]));
        }
        //Contruction of row in the table with emails.

        //titleColumn.textContent = title;
        //toColumn.textContent = recipient;
        //fromColumn.textContent = sender;
        //dateColumn.textContent = new Date(dateSent).toLocaleString();
    }
    else {
        document.getElementById("form-error-alert").style.display = "block";
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
    }
    else {
        document.getElementById("form-error-alert").style.display = "block";
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
    document.getElementById(alertID).style.display = "none";
}

function openModal() {
    document.getElementById("email-title").value = "";
    document.getElementById("email-recipient").value = "";
    document.getElementById("email-content").value = "";
}

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
        document.getElementById("send-success-alert").style.display = "block";
        localStorage.removeItem(scheduledEmailKey);
    });
}