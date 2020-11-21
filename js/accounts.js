var accountsList;
var displayItemDiv;
var deleteLink;
var deleteLinkContent;
var editLink;
var editLinkContent;
var nameDiv;
var nameParagraph;
var buttonDiv;
var button;
var buttonContent;
var dropdownMenu;
var iconDiv;
var icon;

$(document).ready(function () {
    accountsList = document.getElementById("accounts-list");
    var localstorageKeys = Object.keys(localStorage);
    var accounts = localstorageKeys.filter(element => !element.includes("sent_") && !element.includes("draft_") && !element.includes("scheduled_"));
    accounts.forEach(element => {
        createAccountDiv(element);
    });
});

function addAccount() {
    var smtp_server = document.getElementById("account-host").value;
    var smtp_username = document.getElementById("account-username").value;
    var smtp_password = document.getElementById("account-password").value;
    if (smtp_password != "" && smtp_username != "" && smtp_server != "") {
        if (localStorage.getItem(smtp_username) == null) {
            createAccountDiv(smtp_username);
            dismissAlert("account-added-error");
            displayAlert("account-added-success");
            localStorage.setItem(smtp_username, JSON.stringify([smtp_server, smtp_username, smtp_password, Date.now()]));
            clearForm();
        }
        else {
            console.error("Account already exists.");
            displayAlert("account-added-error");
            dismissAlert("account-added-success");
            //Account already exists.
        }
    }
    else {
        console.error("Form for adding a new account is empty.");
        displayAlert("account-added-error");
        dismissAlert("account-added-success");
        //Inputs are empty.
    }
}

function navigateToEditPage(userID) {
    //window.location.href = "./accounts/edit/?userID=" + userID;          pro GitHub pages
    //window.location.href = "./edit/?userID=" + userID;                   pro lokální prostředí
    window.location.href = "./accounts/edit/?userID=" + userID; 
}

function createAccountDiv(displayName) {
    displayItemDiv = document.createElement("div");
    displayItemDiv.classList.add("accounts-list-item");
    displayItemDiv.setAttribute("id", displayName + "-list-item");

    deleteLink = document.createElement("a");
    deleteLink.classList.add("dropdown-item");
    deleteLinkContent = document.createElement("i");
    deleteLinkContent.classList.add("fa");
    deleteLinkContent.classList.add("fa-trash");
    deleteLinkContent.classList.add("mr-3");
    deleteLink.appendChild(deleteLinkContent);
    deleteLink.append("Delete");
    deleteLink.setAttribute("onclick", "deleteAccount('" + displayName + "');");
    deleteLink.title = "Delete " + displayName + " account";

    editLink = document.createElement("a");
    editLink.classList.add("dropdown-item");
    editLinkContent = document.createElement("i");
    editLinkContent.classList.add("fa");
    editLinkContent.classList.add("fa-pencil");
    editLinkContent.classList.add("mr-3");
    editLink.appendChild(editLinkContent);
    editLink.append("Edit");
    editLink.setAttribute("onclick", "navigateToEditPage('" + displayName + "');");
    editLink.title = "Edit " + displayName + " account";

    nameDiv = document.createElement("div");
    nameParagraph = document.createElement("p");
    nameParagraph.textContent = displayName;
    nameDiv.appendChild(nameParagraph);
    nameDiv.classList.add("name-div");
    nameDiv.setAttribute("onclick", "navigateToEditPage('" + displayName + "');");

    buttonDiv = document.createElement("div");
    button = document.createElement("button");
    buttonContent = document.createElement("i");
    dropdownMenu = document.createElement("div");
    buttonContent.classList.add("fa");
    buttonContent.classList.add("fa-ellipsis-h");
    buttonDiv.classList.add("button-div");
    buttonDiv.classList.add("dropleft");
    button.classList.add("button");
    button.setAttribute("data-toggle", "dropdown");
    button.setAttribute("id", displayName + "_dropdownMenuButton");
    button.appendChild(buttonContent);
    buttonDiv.appendChild(button);
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("aria-labelledby", displayName + "_dropdownMenuButton");
    dropdownMenu.appendChild(editLink);
    dropdownMenu.appendChild(deleteLink);
    buttonDiv.appendChild(dropdownMenu);

    iconDiv = document.createElement("div");
    iconDiv.classList.add("icon-div");
    icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-user-circle");
    iconDiv.appendChild(icon);
    
    displayItemDiv.appendChild(iconDiv);
    displayItemDiv.appendChild(nameDiv);
    displayItemDiv.appendChild(buttonDiv);
    displayItemDiv.appendChild(document.createElement("hr"));
    accountsList.appendChild(displayItemDiv);
}

function deleteAccount(accountName) {
    localStorage.removeItem(accountName);
    accountsList.removeChild(document.getElementById(accountName + "-list-item"));
}

function clearForm() {
    document.getElementById("account-host").value = "";
    document.getElementById("account-username").value = "";
    document.getElementById("account-password").value = "";
}