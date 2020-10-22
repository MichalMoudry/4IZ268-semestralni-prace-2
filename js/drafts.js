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
    var tbody = document.getElementById("drafts-list-body");
    var tr;
    var titleColumn;
    var toColumn;
    var fromColumn;
    var dateColumn;
    draftKeys.forEach(draftKey => {
        draftAsJson = JSON.parse(localStorage.getItem(draftKey));
        console.log(draftAsJson);
        tr = document.createElement("tr");
        titleColumn = document.createElement("td");
        toColumn = document.createElement("td");
        fromColumn = document.createElement("td");
        dateColumn = document.createElement("td");

        titleColumn.textContent = draftAsJson[5];
        toColumn.textContent = draftAsJson[3];
        fromColumn.textContent = draftAsJson[4];
        dateColumn.textContent = new Date(draftAsJson[7]).toLocaleString();

        tr.appendChild(titleColumn);
        tr.appendChild(toColumn);
        tr.appendChild(fromColumn);
        tr.appendChild(dateColumn);
        tbody.appendChild(tr);
    });
});

function dismissAlert(alertID) {
    document.getElementById(alertID).style.display = "none";
}