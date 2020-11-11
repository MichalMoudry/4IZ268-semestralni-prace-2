$(document).ready(function () {
    window.addEventListener("online", function () {
        dismissAlert("network-connection-alert");
        //TODO: Add function for sending scheduled emails.
    });
    window.addEventListener("offline", function () {
        document.getElementById("network-connection-alert").style.display = "block";
    });
    var localStorageKeys = Object.keys(localStorage);
    var draftKeys = localStorageKeys.filter(element => element.includes("draft_"));
    var draftAsJson;
    if (draftKeys.length <= 0) {
        document.getElementById("no-drafts-text").classList.remove("display-none");
    }
    draftKeys.forEach(draftKey => {
        draftAsJson = JSON.parse(localStorage.getItem(draftKey));
        console.log(draftAsJson);
        //titleColumn.textContent = draftAsJson[5];
        //toColumn.textContent = draftAsJson[3];
        //fromColumn.textContent = draftAsJson[4];
        //dateColumn.textContent = new Date(draftAsJson[7]).toLocaleString();
    });
});

function dismissAlert(alertID) {
    document.getElementById(alertID).style.display = "none";
}