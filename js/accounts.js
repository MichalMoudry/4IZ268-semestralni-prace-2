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
    var smtp_server = $("#account-host").val();
    var smtp_username = $("#account-username").val();
    var smtp_password = $("#account-password").val();
    if (smtp_password != "" && smtp_username != "" && smtp_server != "") {
        if (localStorage.getItem(smtp_username) == null) {
            createAccountDiv(smtp_username);
            dismissAlert("account-added-error");
            displayAlert("account-added-success");
            localStorage.setItem(smtp_username, JSON.stringify([smtp_server, smtp_username, smtp_password, Date.now()]));
            clearForm();
        }
        else {
            displayAlert("account-added-error");
            dismissAlert("account-added-success");
            //Account already exists.
        }
    }
    else {
        displayAlert("account-added-error");
        dismissAlert("account-added-success");
        //Inputs are empty.
    }
}

function navigateToEditPage(userID) {
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
    $("#account-host").val("");
    $("#account-username").val("");
    $("#account-password").val("");
}