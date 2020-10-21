$(document).ready(function () {
    document.getElementById("email-content").textContent = "";
    var keys = Object.keys(localStorage)
    var userIDs = keys.filter(element => !element.includes("sent_") && !element.includes("draft_") && !element.includes("scheduled_"));
    var sentEmails = keys.filter(element => element.includes("sent_"));
    //If user created more accounts then fill UI with options and links.
    if (userIDs.length > 0) {
        var dropdown_acc_list = document.getElementById("dropdown-account-list");
        var account_selector = document.getElementById("email-sender");
        var account_option;
        var nameLink;
        for (let index = 0; index < userIDs.length; index++) {
            const element = userIDs[index];
            nameLink = document.createElement("a");
            nameLink.classList.add("dropdown-item");
            nameLink.textContent = element;
            account_option = document.createElement("option");
            account_option.value = element;
            account_option.textContent = element;
            dropdown_acc_list.appendChild(nameLink);
            account_selector.appendChild(account_option);
        }
    }
    //If user sent any emails then display them in UI.
    if (sentEmails.length > 0) {
        var tbody = document.getElementById("email-list-tbody");
        var tr;
        var titleColumn;
        var toColumn;
        var fromColumn;
        var dateColumn;
        var emailDataAsJson;
        for (let i = 0; i < sentEmails.length; i++) {
            emailDataAsJson = JSON.parse(localStorage.getItem(sentEmails[i]));
            console.log(JSON.parse(localStorage.getItem(sentEmails[i])));
            tr = document.createElement("tr");
            titleColumn = document.createElement("td");
            toColumn = document.createElement("td");
            fromColumn = document.createElement("td");
            dateColumn = document.createElement("td");

            titleColumn.textContent = emailDataAsJson[3];
            toColumn.textContent = emailDataAsJson[1];
            fromColumn.textContent = emailDataAsJson[2];
            dateColumn.textContent = new Date(emailDataAsJson[5]).toLocaleString();

            tr.appendChild(titleColumn);
            tr.appendChild(toColumn);
            tr.appendChild(fromColumn);
            tr.appendChild(dateColumn);
            tbody.appendChild(tr);
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
        //Contruction of row in the table with emails.
        var tbody = document.getElementById("email-list-tbody");
        var tr = document.createElement("tr");
        var titleColumn = document.createElement("td");
        var toColumn = document.createElement("td");
        var fromColumn = document.createElement("td");
        var dateColumn = document.createElement("td");
        titleColumn.textContent = title;
        toColumn.textContent = recipient;
        fromColumn.textContent = sender;
        dateColumn.textContent = dateSent;
        tr.appendChild(titleColumn);
        tr.appendChild(toColumn);
        tr.appendChild(fromColumn);
        tr.appendChild(dateColumn);
        tbody.appendChild(tr);

        var account = JSON.parse(localStorage.getItem(sender));
        //Try send email.
        try {
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
        } catch (error) {
            saveEmailForScheduling(title, dateSent, JSON.stringify([account[0], account[1], account[2], recipient, sender, title, content, dateSent]));
        }
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