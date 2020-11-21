$(document).ready(function () {
    var localStorageKeys = Object.keys(localStorage);
    var draftKeys = localStorageKeys.filter(element => element.includes("draft_"));
    var draftAsJson;
    if (draftKeys.length <= 0) {
        document.getElementById("no-drafts-text").classList.remove("display-none");
    }
    else {
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
        draftKeys.forEach(draftKey => {
            draftAsJson = JSON.parse(localStorage.getItem(draftKey));
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

            titleP.textContent = draftAsJson[5];
            titleDiv.appendChild(titleP);
            itemContent.appendChild(titleDiv);
            toP.textContent = "To: " + draftAsJson[3];
            toDiv.appendChild(toP);
            itemContent.appendChild(toDiv);

            itemContainer.setAttribute("onclick", "navigateToDraftEditView('" + draftAsJson[5].replace(/ /g, "-") + "_" + draftAsJson[7] + "');");
            
            ellipse = document.createElement("div");
            ellipse.classList.add("ellipse");
            toSplit = draftAsJson[3].toString().split("@")[0].split(".");
            firstInitial = toSplit[0][0].toUpperCase();
            secondInitial = toSplit[1][0].toUpperCase();
            initialsP.textContent = firstInitial + secondInitial;
            ellipse.appendChild(initialsP);
            logoDiv.appendChild(ellipse);

            dateP.textContent = new Date(draftAsJson[7]).toLocaleDateString();
            dateP.classList.add("email-list-item-date");
            dateDiv.appendChild(dateP);
            itemContainer.appendChild(dateDiv);

            itemContainer.appendChild(logoDiv);
            itemContainer.appendChild(itemContent);
            itemContainer.appendChild(dateDiv);
            emailList.appendChild(itemContainer);
            emailList.appendChild(document.createElement("hr"));
        });
    }
});

function navigateToDraftEditView(draftID) {
    window.location.href = "./edit/?id=" + draftID;
}