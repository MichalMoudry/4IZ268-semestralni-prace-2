var email = { id: "", title: "", date: "", content: "", to: "", from: "" };

$(document).ready(function () {
    email["id"] = window.location.search.substr(1).split("=")[1];
    email["title"] = email["id"].replace(/-/g, " ").split("_")[0];
    email["date"] = email["id"].split("_")[1];
});