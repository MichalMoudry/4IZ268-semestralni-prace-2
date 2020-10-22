$(document).ready(function () {
    var localstorageKeys = Object.keys(localStorage);
    accounts = localstorageKeys.filter(element => !element.includes("sent_") && !element.includes("draft_") && !element.includes("scheduled_"));
    var displayItemDiv;
    var accountsList = document.getElementById("accounts-list");
    var nameDiv;
    var nameParagraph;
    accounts.forEach(element => {
        displayItemDiv = document.createElement("div");
        displayItemDiv.classList.add("accounts-list-item");
        displayItemDiv.setAttribute("onclick", "navigateToEditPage('" + element + "');");
        nameDiv = document.createElement("div");
        nameParagraph = document.createElement("p");
        nameParagraph.textContent = element;

        nameDiv.appendChild(nameParagraph);
        displayItemDiv.appendChild(nameDiv);
        accountsList.appendChild(displayItemDiv);
    });
});

function addAccount() {
    var smtp_server = document.getElementById("account-host").value;
    var smtp_username = document.getElementById("account-username").value;
    var smtp_password = document.getElementById("account-password").value;
    var displayName = document.getElementById("account-displayname").value;
    if (smtp_password != "" && smtp_username != "" && smtp_server != "" && displayName != "") {
        if (localStorage.getItem(displayName) == null) {
            var accountsList = document.getElementById("accounts-list");
            var displayItemDiv = document.createElement("div");
            displayItemDiv.classList.add("accounts-list-item");
            displayItemDiv.setAttribute("onclick", "navigateToEditPage('" + displayName + "');");
            var nameDiv = document.createElement("div");
            var nameParagraph = document.createElement("p");
            nameParagraph.textContent = displayName;

            nameDiv.appendChild(nameParagraph);
            displayItemDiv.appendChild(nameDiv);
            accountsList.appendChild(displayItemDiv);
            localStorage.setItem(displayName, JSON.stringify([smtp_server, smtp_username, smtp_password, Date.now()]));
        }
        else {
            console.error("Account already exists.");
            //Account already exists.
        }
    }
    else{
        console.log("Form for adding a new account is empty.");
        //Inputs are empty.
    }
}

function navigateToEditPage(userID) {
    //window.location.href = "./accounts/edit/?userID=" + userID;          pro GitHub pages
    //window.location.href = "./edit/?userID=" + userID;                   pro lokální prostředí
    window.location.href = "./accounts/edit/?userID=" + userID; 
}