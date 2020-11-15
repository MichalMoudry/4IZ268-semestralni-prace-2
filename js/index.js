$(document).ready(function () {
    window.addEventListener("online", function () {
        dismissAlert("network-connection-alert");
        //When network connection is detected, then send all scheduled emails
        sendScheduledEmails();
    });
    window.addEventListener("offline", function () {
        document.getElementById("network-connection-alert").classList.add("display-block");
    });
    sendScheduledEmails();
    var keys = Object.keys(localStorage);
    var sentEmails = keys.filter(element => element.includes("sent_"));
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
        var dateP;
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
            dateP = document.createElement("p");
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

            itemContainer.setAttribute("onclick", "navigateToEmailView('" + emailDataAsJson[3].replace(/ /g, "-") + "_" + emailDataAsJson[5] + "');");

            ellipse = document.createElement("div");
            ellipse.classList.add("ellipse");
            toSplit = emailDataAsJson[1].toString().split("@")[0].split(".");
            firstInitial = toSplit[0][0].toUpperCase();
            secondInitial = toSplit[1][0].toUpperCase();
            initialsP.textContent = firstInitial + secondInitial;
            ellipse.appendChild(initialsP);
            logoDiv.appendChild(ellipse);

            dateP.textContent = new Date(emailDataAsJson[5]).toLocaleDateString();
            dateP.classList.add("email-list-item-date");
            dateDiv.appendChild(dateP);
            itemContainer.appendChild(dateDiv);

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
    else {
        document.getElementById("no-emails-text").classList.remove("display-none");
    }
});

function dismissAlert(alertID) {
    document.getElementById(alertID).classList.remove("display-block");
    document.getElementById(alertID).classList.add("display-none");
}

function navigateToNewEmailPage() {
    window.location.href = "./newmail/";
}

function navigateToEmailView(emailID) {
    window.location.href = "./email/?id=" + emailID;
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
        localStorage.removeItem(scheduledEmailKey);
    });
}

function saveSentEmail(title, date_sent, contentAsJsonString) {
    localStorage.setItem("sent_" + title + date_sent + "", contentAsJsonString);
}