var accountsList;

$(document).ready(function () {
    accountsList = document.getElementById("scheduled-email-list");
    var localstorageKeys = Object.keys(localStorage);
    var scheduledEmails = localstorageKeys.filter(element => element.includes("timed_") || element.includes("scheduled_"));
    if (scheduledEmails.length > 0) {
        
    }
    else {
        displayAlert("no-emails-text");
    }
});