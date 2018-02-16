// Requires JQuery to be loaded

var uid = 0;
var nam = "";
var pfp = "";

$(function() {
    $.post("navbar_connection_check.php")
        .done(function(data) {
            user_data = JSON.parse(data);
            if (user_data.login_uid == -1) {
                //If user is not logged in
                if (!$("#navBar").length) {
                    navBar = document.createElement("div");
                    navBar.id = "navBar";
                    document.body.appendChild(navBar);
                }
                $("#navBar").load("templateNoUser.html");
            } else {
                //If user is logged in
                if (!$("#navBar").length) {
                    navBar = document.createElement("div");
                    navBar.id = "navBar";
                    document.body.appendChild(navBar);
                }
                if (!$("#notifPan").length) {
                    notifPan = document.createElement("div");
                    notifPan.id = "notifPan";
                    document.body.appendChild(notifPan);
                }
                if (!$("#burgerPan").length) {
                    burgerPan = document.createElement("div");
                    burgerPan.id = "burgerPan";
                    document.body.appendChild(burgerPan);
                }

                $("#navBar").load("template.html");
                uid = user_data.login_uid;
                nam = user_data.firstname;
                pfp = user_data.profile;
            }
        });
});