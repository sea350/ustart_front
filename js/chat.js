function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
                     
function urlConfirm(event){
   if ( confirm('You are about the leave the great nation of U•START! Be careful out there!')){
       return true;
   }
   else{
       event.stopPropagation(); event.preventDefault();
   }
       
}

function objLength(obj){
  var i=0;
  for (var x in obj){
    if(obj.hasOwnProperty(x)){
      i++;
    }
  } 
  return i;
}

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dateFormat(time) {
	var datetime = new Date(time);
	var dateString = weekday[datetime.getDay()];
	dateString = dateString + ' ' + (datetime.getMonth() + 1) + '/' + datetime.getDate() + '/' + (datetime.getYear() + 1900); 
	return dateString;
}

function populateMemberList(name){
    var membericon = $("<div></div>").addClass('projectMembers').text(name.charAt(0).toUpperCase());
    var memberlist = $("<strong></strong>").text(name);
    $('<div/>', {
    class: 'sidebar-header'
    }).append(membericon,memberlist).appendTo('#sidebar');
}


function populateOfflineMessage(parentid, message, time) {
	var dateTime = dateFormat(time);
	if ($('#chat'+$.escapeSelector(parentid)).find(".message-timeline").last().text() !== dateTime) {
		var messageTimeline = $("<li></li>").addClass('message-timeline').text(dateTime);
		$('#chat'+$.escapeSelector(parentid)).append(messageTimeline);
	}
    var listMessage = $("<span></span>").addClass('message-user-message').text(message);
	var listItem = $("<li></li>").attr('class', "offline");
    listItem.addClass('message-user-right');
    listItem.append(listMessage);	
	$('#chat'+$.escapeSelector(parentid)).append(listItem);
	$(listItem).css('font-size', '0%').animate({
		"font-size": "100%"
	}, 100 , () => {
		$('.message-box').scrollTop($('.message-box')[0].scrollHeight);
	});
}


//create new function
function populateMessageModified(parentid, msgid, username, message, icon, time, originuser, prevSender) {
	var dateTime = dateFormat(time);
	if ($('#chat'+$.escapeSelector(parentid)).find(".message-timeline").last().text() !== dateTime) {
		var messageTimeline = $("<li></li>").addClass('message-timeline').text(dateTime);
		$('#chat'+$.escapeSelector(parentid)).append(messageTimeline);
	}
	var listTime = $("<div></div>").addClass('message-user-time collapse').text(formatTime(time));
    if (isUrlValid(message)){
        console.log("url found");
        var listMessage = $("<span></span>").addClass('message-user-message');
        var listURL = $("<a></a>").attr({'href':message, 'target':"_blank"}).text(message).on('click', function(e) { return urlConfirm(e) });
        listMessage.append(listURL);
    }
    else{
         var listMessage = $("<span></span>").addClass('message-user-message').text(message);
    }
	var listIcon = $("<img></img>").addClass('message-user-icon').attr('src', icon);
	var listName = $("<div></div>").addClass('message-user-name').text(username);
	var listItem = $("<li></li>").attr('sender', msgid);
	if (originuser) {
		// If the post is by the user, push to the right
		listItem.addClass('.message-user message-user-right');
		listItem.append(listMessage, listTime);
	} else {
		// If the post is not by the user, push to the left
		listItem.addClass('.message-user message-user-left');
        if (prevSender == ""){
            listItem.append(listName, listIcon, " ", listMessage, listTime);
        }
        else{
            if (prevSender == msgid){
                listItem.append(listIcon, " ", listMessage, listTime);
            }
            else{
                listItem.append(listName, listIcon, " ", listMessage, listTime);
            }
        }
	}
		
	$('#chat'+$.escapeSelector(parentid)).append(listItem);
    
	$(listItem).css('font-size', '0%').animate({
		"font-size": "100%"
	}, 'fast', () => {
		$('.message-box').scrollTop($('.message-box')[0].scrollHeight);
	});
}

$(document).on('click', '.message-user-message', function(e) { 
    $(e.currentTarget).next().collapse('toggle'); 

    console.log($('.message-user-message:last'));
    if ($(e.currentTarget).is( $('.message-user-message:last'))){
        $('.message-box').scrollTop($('.message-box')[0].scrollHeight);
    }
    else{
        $('.message-box').scrollTop($('.message-box').scrollTop()+(20));
    }
});



/*//create new function
function populateMessage(msgid, username, message, icon, time, originuser) {
	var dateTime = dateFormat(time);
	if ($('.message-timeline').last().text() !== dateTime) {
		var messageTimeline = $("<li></li>").addClass('message-timeline').text(dateTime);
		$(".message-box").append(messageTimeline);
	}
	
	var listTime = $("<div></div>").addClass('message-user-time collapse').text(formatTime(time));
	var listMessage = $("<span></span>").addClass('message-user-message').text(message);
	listMessage.attr('data-toggle', 'collapse');
	listMessage.attr('data-target', '#' + msgid + ' .collapse');
	var listIcon = $("<img></img>").addClass('message-user-icon').attr('src', icon);
	var listName = $("<div></div>").addClass('message-user-name').text(username);
	var listItem = $("<li></li>").attr('id', msgid);
	if (originuser) {
		// If the post is by the user, push to the right
		listItem.addClass('message-user-right');
		listItem.append(listMessage, listTime);
	} else {
		// If the post is not by the user, push to the left
		listItem.addClass('message-user-left');
		listItem.append(listName, listIcon, " ", listMessage, listTime);
	}
		
	$(".message-box").append(listItem);
	$(listItem).css('font-size', '0%').animate({
		"font-size": "100%"
	}, 'fast', () => {
		$('.message-box').scrollTop($('.message-box')[0].scrollHeight);
	});
}


function composeNewGroup() {
	$('.active').removeClass('active');
	addBlankGroup();
	$('.box-chat').hide('fast');
	$('.box-compose').show('fast');
	$('#composer').focus();
}

function addBlankGroup() {
    console.log("swapping group");
	if ($('.blank-group').length < 1) {	
		// Blank Icon
		var listItemIcon = $('<img/>').addClass('inbox-icon').attr('src', 'img/img1.png');
		var listItemHeader = $('<span></span>').addClass('group-header').text('New Message');
		var listItemTime = $('<span></span>').addClass('group-message-time');
		var listItemMessage = $('<span></span>').addClass('group-message');
        var showMembers = '<a id="sidebarCollapse" data-toggle="tooltip" data-placement="top" title="Members" style="float:right;">\
				            <i class="fa fa-angle-double-left" style="color:#00ac7d;"></i>\
						</a>';
		var listItem = $('<li></li>').addClass('inbox-group blank-group')
		.append(listItemIcon, listItemHeader, listItemTime, $('<br/>'), listItemMessage);

		$('#inbox-groups').prepend(listItem);
		$(listItem).click(function() {
			composeNewGroup();
		}).css('font-size', '0%').animate({
			"font-size": "100%"
		}, 'fast');
	}
	$('.blank-group').addClass('active');
}*/

function formatTime(datetime) {
	// Add custom time text here
	
	var time = new Date(datetime);
	var timeHour = time.getHours() % 12;
	if (timeHour < 1)
		timeHour = 12;
	var timeMinute = time.getMinutes();
	if (timeMinute < 10)
		timeMinute = '0' + timeMinute;
	var timeString = timeHour + ':' + timeMinute;
	if (time.getHours() < 12)
		timeString = timeString + " AM";
	else
		timeString = timeString + " PM";
	return timeString;
}

function loadGroup(groupname) {
	// Clear message-box
	$('.message-box').empty();
    var showMembers = '<a id="sidebarCollapse" data-toggle="tooltip" data-placement="top" title="Members" style="float:right;">\
				            <i class="fa fa-angle-double-left" style="color:#00ac7d;"></i>\
						</a>';
	$('.box-chat .message-head').text(groupname).append(showMembers);
	$('.box-compose').hide('fast');
	$('.box-chat').show('fast');
}

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
	
     $('#sidebarCollapse').on('click', function (e) {
         e.preventDefault();
        $('#sidebar').toggleClass('active');
    });
    
    
    
    
    //test function for message 
	/*$('#messager-form').submit(function(event) {
		event.preventDefault();
		if ($('#messager').val().length > 0) {
			var timeNow = new Date().getTime();
			
			populateMessageModified(1, Math.floor(Math.random() * 99999), 'Ash Ketchum',
			$('#messager').val(), 'img/img1.png', timeNow, true);
			$('.inbox-group.active .group-message').text("You: " + $('#messager').val());
			$('.inbox-group.active .group-message-time').text(formatTime(timeNow));
			
			// Save message to server
			// Time is stored as INT(32), representing Unix Timestamp
			
			$('#messager').val('');
			$('.message-box').scrollTop($('.message-box')[0].scrollHeight);
		}
	});*/
    
	
	/*$('#composer-form').submit(function(event) {
		event.preventDefault();
		
		// Edit blank group into new group
		if ($('#composer').val().length > 0) {
			$('.blank-group .group-header').text($('#composer').val());
			loadGroup($('#composer').val());
			$('.blank-group').removeClass('blank-group').off('click').click(function(event) {
				if (!$(this).hasClass('active')) {
					$('.active').not(this).removeClass('active');
					$(this).addClass('active');
					loadGroup($('.active .group-header').text());
					$('.box-compose').hide('fast');
					$('.box-chat').show('fast');
				}
			});
		}
	});*/
	
	$('.box-compose').hide();
	
	$('.inbox-compose-new').click(function(event) {
		composeNewGroup();
	});
	
	$('.inbox-group').click(function(event) {
		if (!$(this).hasClass('active')) {
			$('.active').not(this).removeClass('active');
			$(this).addClass('active');
			loadGroup($('.active .group-header').text());
			$('.box-compose').hide('fast');
			$('.box-chat').show('fast');
		}
	});
});