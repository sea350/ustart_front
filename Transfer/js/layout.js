$("#userSettings").hover(function() {
    $(this).children('i').addClass('fa-spin');
}, function() {
    $(this).children('i').removeClass('fa-spin');
});

$(document).on('click', '.dropdown-menu', function(e) {
	e.stopPropagation();
});

var loginVis = false;
var thePanA = false;
var thePanB = false;

var nam = "_NULL";

document.addEventListener("DOMContentLoaded", function() {
    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function() {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            isOpen = false;
        }
    });
    submitIcon.mouseup(function() {
        return false;
    });
    searchBox.mouseup(function() {
        return false;
    });
    $(document).mouseup(function() {
        if (isOpen == true) {
            $('.searchbox-icon').css('display', 'block');
            submitIcon.click();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    /*document.getElementById("notifs").onclick = "notifUpdate()";
    document.getElementById("dropdown").onclick = "burgerUpdate()";
    console.log("loaded");*/
});

function initialize(account) {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML += '<link href="https://fonts.googleapis.com/css?family=Gudea" rel="stylesheet">' +
        '<link href="css/layout.css" rel="stylesheet" type="text/css" />' +
        '<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">' +
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';

    document.getElementsByTagName('head')[0].innerHTML = headHTML;


}


function redirect() {
    window.location("results.php");
    return false;
}

function toggleLogIn() {
    loginVis = !loginVis;
    if (loginVis) {
        document.getElementById("theLogIn").style.visibility = "visible";
    } else {
        document.getElementById("theLogIn").style.visibility = "hidden";
    }
    return;
}

function notifUpdate() {
    if (isPanOpened(true)) {
        document.getElementById("notifPan").innerHTML = '<h2 id="panHead">Notifications</h2><div id="closePan" onclick="closePan()">x</div>';
        document.getElementById("notifPan").innerHTML += `<div id="notifItemWrap">
            </div>`
    }
    return;
}

function burgerUpdate() {
    if (isPanOpened(false)) {
        document.getElementById("notifPan").innerHTML = '<h2 id="panHead">Options</h2><div id="closePan" onclick="closePan()">x</div>';
        document.getElementById("notifPan").innerHTML += `<div id="notifItemWrap">
            <div id="notifProfile">
                <a href="user.php?uid=` + uid + `"><div id="notifProfilePic" style="background-image: url('` + pfp + `')"></div></a>
            </div>
            <div class="panItem" style="text-align:center;">
                <a href="user.php?uid=` + uid + `">Hi <span id="notifUser"> ` + nam + ` </span></a>
            </div>
            <div class="panItem">
                <a href="manageProj.php">My Projects</a>
            </div>
            <div class="panItem">
                <a href="settings.php">Settings</a>
            </div>
            <div class="panItem">
                <a href="help.php">Help</a>
            </div>
            <div class="panItem">
                <a href="logout.php">Logout</a>
            </div>
        </div>
        `
    }
    return;
}

function isPanOpened(b) {
    var thePanEl = document.getElementById("notifPan");
    thePanEl.innerHTML = "";
    if (thePanA && thePanB == b) {
        thePanA = !thePanA;
        thePanEl.style.display = "none";
        return false;
    } else if (thePanA) {
        thePanB = b;
        return true;
    } else {
        thePanA = true;
        thePanB = b;
        thePanEl.style.display = "block";
        return true;
    }
}

function closePan() {
    var thePanEl = document.getElementById("notifPan");
    thePanEl.innerHTML = "";
    thePanA = false;
    thePanEl.style.display = "none";
}
/*
t: title, string
d: description, string
l: link url, string
b: read/unread, boolean
*/
function appendPanItem(t, d, l, b = false) {
    var resultHTML = document.getElementById('notifItemWrap').innerHTML += `<div class="panItem" onclick="location.href='` + l + `'">
                <div class="panItemTitle">` + t + `</div>
                <div class="panItemDesc">` + d + `</div>
            </div>`;
    return true;
}

function passCheck() {
    var pass = document.getElementById('inputPassword');
    var check_pass = document.getElementById('confirmPassword');
    var message = document.getElementById('pwNoMatch');
    var match_color = 'green';
    var wrong_color = 'red';

    if (pass.value == null && check_pass.value == null) {
        check_pass.backgroundColor = wrong_color;
        message.innerHTML = "Cannot leave this empty!";
    } else if (pass.value != check_pass.value) {
        check_pass.borderColor = wrong_color;
        message.style.color = wrong_color;
        message.innerHTML = "Passwords do not match!";

    } else {
        check_pass.borderColor = match_color;
        message.style.color = match_color;
        message.innerHTML = "Passwords match!";

    }
}



function buttonUp() {
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if (inputVal !== 0) {
        $('.searchbox-icon').css('display', 'none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display', 'block');
    }
}
