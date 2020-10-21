$(document).ready(function () {
    document.getElementById("email-content").textContent = "";
    var userIDs = Object.keys(localStorage);
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
});

function sendEmail() {
    var sender = document.getElementById("email-sender").value;
    var title = document.getElementById("email-title").value;
    var recipient = document.getElementById("email-recipient").value;
    var content = document.getElementById("email-content").value;
    if (title != "" && recipient != "" && content != "" && sender != "") {
        var tbody = document.getElementById("email-list-tbody");
        var tr = document.createElement("tr");
        var titleColumn = document.createElement("td");
        var toColumn = document.createElement("td");
        var fromColumn = document.createElement("td");
        var dateColumn = document.createElement("td");
        titleColumn.textContent = title;
        toColumn.textContent = recipient;
        fromColumn.textContent = sender;
        dateColumn.textContent = Date.now();
        tr.appendChild(titleColumn);
        tr.appendChild(toColumn);
        tr.appendChild(fromColumn);
        tr.appendChild(dateColumn);
        tbody.appendChild(tr);

        var account = JSON.parse(localStorage.getItem(sender));
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
        } catch (error) {
            
        }
    }

}