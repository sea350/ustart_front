var port = window.location.port;
var chatNotifCount = 0;
var newNotifs = 0;
var chattimerID=0;
var roomSocket;
$('[data-toggle="tooltip"]').tooltip();
$('.dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});
$('.dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});

$(window).click(function () {
    $('#searchFilters').slideUp('fast');
    $(this).removeClass('search-reveal');
});
$('#search-box input[type=search]').focus(function () {
    $('#searchFilters').slideDown('fast');
    $(this).addClass('search-reveal');
});
$('#search-box input[type=search], #searchFilters').click(function (event) {
    event.stopPropagation();
});

var $window = $(window);
var $searchForm = $('#form-control');

function checkWidth(){
    var windowSize = $window.width();
    if (windowSize < 769){
        $searchForm.hide();
        $('#searchFilterFormSubmit').addClass('searchResponsive');
        $('.searchResponsive').css({'border':'none', 'border-radius': '4px 4px 4px 4px'});
        
    }
    else{
        $searchForm.show();
        $('#searchFilterFormSubmit').removeClass('searchResponsive')
        .css({'background-color':'#fff','border-radius':'4px','border':'1px solid transparent','border-color':'#ccc','border-top-left-radius':'0px','border-bottom-left-radius':'0px'});               
    }
}

checkWidth();
$(window).resize(checkWidth);
// begin loading notifications
var newMsgReceived = false;
chatNotifCount = $(".chat-label.label-new").length;
updateChatBadge();

//notifications
  $.ajax({
    type: 'GET',
    url: 'http://ustart.today:'+port+'/AjaxNotifications/',
    contentType: "application/json; charset=utf-8",
    data: {},
    success: function(data) {
    },complete: function (jqXHR,status) {
        if(status == 'success' || status=='notmodified')
        {
        var temp = $.parseJSON(jqXHR.responseText);
        console.log(temp);
             if (temp.notifications!= null){
                 console.log(temp.notifications.length);
                 $('#notifDrop').empty();
                   for(i=0; i <temp.notifications.length; i++){
                       appendNotifItem(temp.notifications[i].ID, 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', '', temp.notifications[i].URL, temp.notifications[i].Message, timeSince(temp.notifications[i].Data.Timestamp), temp.notifications[i].Data.Seen);
                  }
             }
            else{
                appendEmptyItem("notifDrop");
            }
            newNotifs= $(".notif-label.label-new").length;
            updateNotifBadge();
        }
    }
    ,error: function(err) {
        console.log('chat initial chat failed: ');
        console.log(err);
    }
});

//normal notification
 setInterval(function(){
    $.ajax({
        type: 'GET',
        url: 'http://ustart.today:'+port+'/AjaxNotifications/',
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function(data) {
        },complete: function (jqXHR,status) {
            if(status == 'success' || status=='notmodified')
            {
            var temp = $.parseJSON(jqXHR.responseText);
                 if (temp.notifications != null){
                     $('#notifDrop').empty();
                      for(i=0; i <temp.notifications.length; i++){
                           appendNotifItem(temp.notifications[i].ID, 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', '', temp.notifications[i].URL, temp.notifications[i].Message, timeSince(temp.notifications[i].Data.Timestamp), temp.notifications[i].Data.Seen);
                      }
                      newNotifs= $(".notif-label.label-new").length;
                      updateNotifBadge();
                 }
            }
        }
        ,error: function(err) {
            console.log('chat initial chat failed: ');
            console.log(err);
        }
    });
}, 60000);


//chat notification
$.ajax({
        type: 'GET',
        url: 'http://ustart.today:'+port+'/AjaxChatNotifications/',
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function(data) {
        },complete: function (jqXHR,status) {
            if(status == 'success' || status=='notmodified')
            {
            var temp = $.parseJSON(jqXHR.responseText);
                if (temp.heads != null){
                    $('#chatDrop').empty();
                    for(i=temp.heads.length-1; i >= 0; i--){
                    if (!temp.heads[i].Read){
                        if((readRuneArrayThatWorks(temp.heads[i].Bio).includes(":"))){
                            if((readRuneArrayThatWorks(temp.heads[i].Bio).substring(0,4) != "You:") && temp.heads[i].Followed == true)  newMsgReceived = true;
                            else
                                newMsgReceived = false;   
                            
                        } 
                        else newMsgReceived = false;   
                    }
                    else newMsgReceived = false;
                    appendChatItem(temp.heads[i].Username,temp.heads[i].FirstName+' '+temp.heads[i].LastName, readRuneArrayThatWorks(temp.heads[i].Bio), timeSince(temp.heads[i].Time),  newMsgReceived, temp.heads[i].Classification, temp.heads[i].Image, temp.heads[i].DocID);
                    newMsgReceived = false;  
                    }
                }
                else{
                    $('#chatDrop').empty();
                    appendEmptyItem("chatDrop");
                }
                chatNotifstart();
            }
        }
        ,error: function(err) {
            console.log('chat initial chat failed: ');
            console.log(err);
        }
});



function chatNotifstart(){
    //initial set up
    if(!("WebSocket" in window)){
        console.log("you need a browser that supports web sockets");
        }else{
            try{
            roomSocket= new WebSocket('ws://' + window.location.host + '/cN/');
            roomSocket.onopen = function(){
                //console.log('Chat Nofitication Socket Status: '+roomSocket.readyState+'(open)');
                if(window.chattimerID){ /* a setInterval has been fired */
                window.clearInterval(window.chattimerID);
                window.chattimerID=0;
                } 
            }
            roomSocket.onmessage = function(e){
                var chatNotifications = JSON.parse(e.data);
                //console.log(chatNotifications);
                if ($('li#chatnotif'+chatNotifications.Username).length > 0){
                    $('li#chatnotif'+chatNotifications.Username).prependTo('#chatDrop');
                    $('li#chatnotif'+chatNotifications.Username+" .notif-message").text(readRuneArrayThatWorks(chatNotifications.Bio));
                    $('li#chatnotif'+chatNotifications.Username+" .notif-timestamp").text(formatTime(new Date(chatNotifications.Time).getTime()));
                    if((readRuneArrayThatWorks(chatNotifications.Bio).includes(":"))){
                        if((readRuneArrayThatWorks(chatNotifications.Bio).substring(0,4) == "You:")){
                            $('li#chatnotif'+chatNotifications.Username+" .chat-label").css('display', 'none').removeClass('label-new').text('');
                        }
                        else{
                            $('li#chatnotif'+chatNotifications.Username+" .chat-label").addClass('label-new');
                            $('li#chatnotif'+chatNotifications.Username+" .chat-label").css('display', 'inline').text("New");
                            chatNotifCount= $(".chat-label.label-new").length;
                            updateChatBadge();
                        }
                    }
                    else{
                        $('li#chatnotif'+chatNotifications.Username+" .chat-label").css('display', 'none').removeClass('label-new').text('');
                    }
                }
                else{
                    appendChatItem(chatNotifications.Username,chatNotifications.FirstName+' '+chatNotifications.LastName, readRuneArrayThatWorks(chatNotifications.Bio), timeSince(chatNotifications.Time), true, chatNotifications.Classification, chatNotifications.Image, chatNotifications.DocID);
                    $('.emptyState').remove();
                }
                if (chatNotifications.Classification == 0){ //REGULAR CHAT  
                if ($('li#'+$.escapeSelector("@"+chatNotifications.Username)).length != 0){ //chat exists
                    // $('li#'+$.escapeSelector("@"+chatNotifications.Username)).prependTo('#inbox-groups');
                    //check for active here
                    if ($('li#'+$.escapeSelector('@'+chatNotifications.Username)).hasClass('active')){
                        $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio));
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime()));
                    }
                    else{
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-header').css("font-weight", 700);
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio)).css("font-weight", 700);
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime())).addClass("active").css({'font-weight': "bold"});
                    }
                }
                else{    // chat does not exist
                    console.log("creating new chat");
                    populateExistingChatRooms(chatNotifications.Username, chatNotifications.Image, chatNotifications.FirstName+" "+chatNotifications.LastName, chatNotifications.Classification, readRuneArrayThatWorks(chatNotifications.Bio), formatTime(chatNotifications.Time), chatNotifications.DocID);
                    if ($('li#'+$.escapeSelector('@'+chatNotifications.Username)).hasClass('active')){
                        $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio));
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime()));
                    }
                    else{
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-header').css("font-weight", 700);
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio)).css("font-weight", 700);
                            $('li#'+$.escapeSelector("@"+chatNotifications.Username)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime())).addClass("active").css({'font-weight': "bold"});
                    }
                }
                }
            else{//PROJECT CHAT
                if ($('li#'+$.escapeSelector(chatNotifications.DocID)).length != 0){ //chat exists
                    //$('li#'+$.escapeSelector(chatNotifications.Username)).prependTo('#inbox-groups');
                    //check for active here
                    if ($('li#'+$.escapeSelector(chatNotifications.DocID)).hasClass('active')){
                        $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio));
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime()));
                    }
                    else{
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-header').css("font-weight", 700);
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio)).css("font-weight", 700);
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime())).addClass("active").css({'font-weight': "bold"});
                    }
                }
                else{    // chat does not exist
                    populateExistingChatRooms(chatNotifications.Username, chatNotifications.Image, chatNotifications.FirstName+" "+chatNotifications.LastName, chatNotifications.Classification, readRuneArrayThatWorks(chatNotifications.Bio), formatTime(chatNotifications.Time),chatNotifications.DocID );
                    if ($('li#'+$.escapeSelector(chatNotifications.DocID)).hasClass('active')){
                        $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio));
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime()));
                    }
                    else{
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-header').css("font-weight", 700);
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message').text(readRuneArrayThatWorks(chatNotifications.Bio)).css("font-weight", 700);
                            $('li#'+$.escapeSelector(chatNotifications.DocID)+' .group-message-time').text(formatTime(new Date(chatNotifications.Time).getTime())).addClass("active").css({'font-weight': "bold"});
                    }
                }
            }
            }// end on message
            
            roomSocket.onerror= function(err){
                if (err == 1001)roomSocket.close();
            }
            roomSocket.onclose= function(){
                //reconnect now
                if(!window.chattimerID){
                    window.chattimerID=setInterval(checkNotif, Math.floor(Math.random() * 20000) + 25000 );
                }
            };

            }//end try
            catch(exception){
                console.log('Error: '+exception);
        }
    } 
}
        
function checkNotif(){
    if(!roomSocket || roomSocket.readyState == 3){ 
        chatNotifstart();}
}

$(document).ready(function() {
    $("#notifDrop").on("show.bs.dropdown", function() {
        checkNotif();
    });
});