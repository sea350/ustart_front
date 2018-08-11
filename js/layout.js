$("#userSettings").hover(function() {
    $(this).children('i').addClass('fa-spin');
}, function() {
    $(this).children('i').removeClass('fa-spin');
});

function timeSince(date) {
  var d = new Date(date);
  var seconds = Math.floor((new Date() - d) / 1000);

  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval > 0) {
    return interval + " year ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  if (interval > 0) {
    return interval + " month ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  if (interval > 0) {
    return interval + " day ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  if (interval > 0) {
    return interval + " hour ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  if (interval > 0) {
    return interval + " minute ago";
  }
  return Math.floor(seconds) + " seconds ago";
}


$(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
});

var loginVis = false;
var thePanA = false;
var thePanB = false;

var nam = "_NULL";

var newNotifs = 0;
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
        '<link href="/www/ustart.tech/css/layout.css" rel="stylesheet" type="text/css" />' +
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
        $("#theLogIn").slideDown({
            complete: () => {
                $("#email").focus();
            }
        });
    } else {
        $("#theLogIn").slideUp();
    }
    return;
}

function notifUpdate() {
    document.getElementById("notifPan").innerHTML = '<h2 id="panHead">Notifications</h2><div id="closePan">x</div>';
    document.getElementById("notifPan").innerHTML += `<div id="notifItemWrap"></div>`
    return;
}

function msgUpdate() {
    document.getElementById("chatPan").innerHTML = '<h2 id="chatpanHead">Notifications</h2><div id="closeChatPan">x</div>';
    document.getElementById("chatPan").innerHTML += `<div id="chatItemWrap"></div>`
    return;
}

/*function burgerUpdate() {
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
}*/

/*function isPanOpened(b) {
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
}*/
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

function appendChatPanItem(t, d, l, b = false) {
    var resultHTML = document.getElementById('chatItemWrap').innerHTML += `<div class="panItem" onclick="location.href='` + l + `'">
                <div class="panItemTitle">` + t + `</div>
                <div class="panItemDesc">` + d + `</div>
            </div>`;
    return true;
}

function updateNotifBadge() {
    if (newNotifs > 0) {
        $('.notifBadge').css('display', 'inline').text('' + newNotifs);
    } else {
        $('.notifBadge').css('display', 'none').text('');
    }
}

function updateChatBadge() {
    if (chatNotifCount > 0 ) {
        $('.chatBadge').css('display', 'inline').text(''+ chatNotifCount);
    } else {
        $('.chatBadge').css('display', 'none').text('');
    }
}

function appendNotifItem(person, message, timestamp, unreadStatus) {
    // Load person's icon
    var notifIcon = $('<img></img>').addClass('media-object img-rounded notif-icon');
    $(notifIcon).attr('alt', '40x40').attr('src', 'http://placehold.it/40x40');
    
    var notifIconHolder = $('<div></div>').addClass('media-left').append(notifIcon);
    var notifDismisser = $('<a></a>').addClass('close').attr('href', '#').attr('data-dismiss', 'alert').attr('aria-label', 'close').text('×');
    var notifPersonLabelLink = $('<a></a>').attr('href', encodeURI('profile.html#' + person)).text(person);
    var notifPersonLabel = $('<strong></strong>').append(notifPersonLabelLink, notifDismisser);
    var notifNewLabel = $('<span></span>').addClass('label-new label label-info')
    if (unreadStatus) {
        notifNewLabel.text('New');
        newNotifs++;
        updateNotifBadge();
    }
    var notifPersonContainer = $('<div></div>').append(notifPersonLabel, notifNewLabel);
    var notifMessage = $('<div></div>').addClass('notif-message').text(message);
    var notifMessageTime = $('<div></div>').addClass('notif-timestamp').text(timestamp);
    var notifMessageContainer = $('<div></div>').addClass('message-container media-body').append(notifPersonContainer, notifMessage, notifMessageTime);
    var notifItem = $('<li></li>').addClass('media alert fade in').append(notifIconHolder, notifMessageContainer).click(function() {
        var newLabel = $(this).find('.label-new');
        if (newLabel.length > 0) {
            newLabel.removeClass('label-new');
            newLabel.fadeOut('fast');
            newNotifs--;
            updateNotifBadge();
        }
    });
    $('#notifDrop').prepend(notifItem);
}



function appendEmptyItem(destination) {
    // Load person's icon
    var notifItem = "<li class ='media alert fade in emptyState'> \
                        <div class ='message-container media-body>'\
                            <div class = 'notif-message'>\
                                There appears to be nothing here.\
                            </div>\
                        </div></li>";
    $('#'+destination).prepend(notifItem);
}


function appendChatItem(chatID, person, message, timestamp, unreadStatus, classification, image, docID) {
    // Load person's icon
    var notifIcon = $('<img></img>').addClass('media-object img-rounded notif-icon');
    notifIcon.attr('alt', '40x40').attr('src', image);
    var notifIconHolder = $('<div></div>').addClass('media-left').append(notifIcon);
    //var notifDismisser = $('<a></a>').addClass('close').attr('href', '#').attr('data-dismiss', 'alert').attr('aria-label', 'close').text('×');
    if (classification === 0){
        var notifPersonLabelLink = $('<a></a>').attr('href', encodeURI('/ch/@' + chatID)).text(person).click(function(){
             console.log("clicked href");
             var newLabel = $(this).find('.label-new');
             newLabel.removeClass('label-new');
             newLabel.fadeOut('fast');
             newLabel.text('');
             chatNotifCount= $(".chat-label.label-new").length;
             updateChatBadge();
        });
    }
    else{
        var notifPersonLabelLink = $('<a></a>').attr('href', encodeURI('/ch/' + docID)).text(person).click(function(){
             var newLabel = $(this).find('.label-new');
             newLabel.removeClass('label-new');
             newLabel.fadeOut('fast');
             newLabel.text('');
             chatNotifCount= $(".chat-label.label-new").length;
             updateChatBadge();
        });
    }
    var notifPersonLabel = $('<strong></strong>').append(notifPersonLabelLink);
    if (unreadStatus) {
         var notifNewLabel = $('<span></span>').addClass('label-new label label-info chat-label')
    }
    else{
         var notifNewLabel = $('<span></span>').addClass('label label-info chat-label');
    }
    chatNotifCount= $(".chat-label.label-new").length;
    updateChatBadge();
    var notifPersonContainer = $('<div></div>').append(notifPersonLabel, notifNewLabel);
    var notifMessage = $('<div></div>').addClass('notif-message').text(message);
    var notifMessageTime = $('<div></div>').addClass('notif-timestamp').text(timestamp);
    var notifMessageContainer = $('<div></div>').addClass('message-container media-body').append(notifPersonContainer, notifMessage, notifMessageTime);
    var notifItem = $('<li></li>').addClass('media alert fade in').attr('id', "chatnotif"+chatID).append(notifIconHolder, notifMessageContainer).click(function() {
        var newLabel = $(this).find('.label-new');
        if (newLabel.length > 0) {
            console.log("clicked label");
            newLabel.removeClass('label-new');
            newLabel.fadeOut('fast');
            newLabel.text('');
            chatNotifCount= $(".chat-label.label-new").length;
            updateChatBadge();
        }
    });
    $('#chatDrop').prepend(notifItem);
}

function presentLogError() {
    $('#spaced .help-block').stop(true, false).slideDown('slow').delay(4000).slideUp('slow');
}

/*
function fitNavbar() {
    var widthLength = 500;
    var scrollFlag = $(document).height() > $(window).height();
    if (scrollFlag) {
        // To account for the width of the scrollbar that appears when the document is lengthy.
        widthLength = widthLength - 17;
    }
    if ($(window).innerWidth() < widthLength) {
        $('span#inbox-label').css('display', 'inline');
        $('li a span#user-name').parent().parent().after($('li.inbox-list-item'));
    } else {
        $('span#inbox-label').css('display', 'none');
        $('ul.navbar-nav').prepend($('li.inbox-list-item'));
    }
}
*/

$(document).ready(function () {
    appendEmptyItem("notifDrop");
    appendNotifItem('Reflector Pinpointer', 'is following you', 'NOW', true);
    appendNotifItem('Broadside Chromedome', 'is following you', 'NOW', true);
    appendNotifItem('Reflector Pinpointer', 'suggested ?link', 'NOW', true);
    appendNotifItem('Broadside Chromedome', 'suggested ?project', 'NOW', true);
    appendNotifItem('Reflector Pinpointer', 'YO! You following me?', 'NOW', true);
    appendNotifItem('Broadside Chromedome', "WHAT'S UP?", 'NOW', true);
    
    //appendChatItem(1,'Reflector Pinpointer', 'is following you', 'NOW', true);
    /*
    $(window).resize(function() {
        fitNavbar();
    });
    fitNavbar();
    */
    $('#spaced .help-block').slideUp();
    $('#theLogIn form').submit(function(e) {
        if (false) {
            e.preventDefault();
            presentLogError();
        }
    });
    
    $("form#searchFilterForm").submit(function() {
        $(this).append("<input type='hidden' name='searchbypersonname' value='true'/>");
        $(this).append("<input type='hidden' name='searchbyusername' value='true'/>");
        $(this).append("<input type='hidden' name='searchbyprojectname' value='true'/>");
        $(this).append("<input type='hidden' name='searchbyurl' value='true'/>");
        $(this).append("<input type='hidden' name='searchbyskills' value='true'/>");
        $(this).append("<input type='hidden' name='searchbymembersneeded' value='true'/>");
    });
    //$('[data-toggle="tooltip"]').tooltip();        
})

/*function passCheck() {
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
}*/

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

function recaptchaCallback() {
    $('#finished').removeAttr('disabled');
}


