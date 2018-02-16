function populateGroups() {
	
}

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dateFormat(time) {
	var datetime = new Date(time);
	var dateString = weekday[datetime.getDay()];
	dateString = dateString + ' ' + (datetime.getMonth() + 1) + '/' + datetime.getDate() + '/' + (datetime.getYear() + 1900); 
	return dateString;
}

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

function populateGroupMessages() {
	
}

function composeNewGroup() {
	$('.active').removeClass('active');
	addBlankGroup();
	$('.box-chat').hide('fast');
	$('.box-compose').show('fast');
	$('#composer').focus();
}

function addBlankGroup() {
	if ($('.blank-group').length < 1) {	
		// Blank Icon
		var listItemIcon = $('<img/>').addClass('inbox-icon').attr('src', 'img/img1.png');
		var listItemHeader = $('<span></span>').addClass('group-header').text('New Message');
		var listItemTime = $('<span></span>').addClass('group-message-time');
		var listItemMessage = $('<span></span>').addClass('group-message');

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
}

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
	
	$('.box-chat .message-head').text(groupname);
	$('.box-compose').hide('fast');
	$('.box-chat').show('fast');
}

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
	
	$('#messager-form').submit(function(event) {
		event.preventDefault();
		if ($('#messager').val().length > 0) {
			var timeNow = new Date().getTime();
			
			populateMessage(Math.floor(Math.random() * 99999), 'Ash Ketchum',
			$('#messager').val(), 'img/img1.png', timeNow, true);
			$('.inbox-group.active .group-message').text("You: " + $('#messager').val());
			$('.inbox-group.active .group-message-time').text(formatTime(timeNow));
			
			// Save message to server
			// Time is stored as INT(32), representing Unix Timestamp
			
			$('#messager').val('');
			$('.message-box').scrollTop($('.message-box')[0].scrollHeight);
		}
	});
	
	$('#composer-form').submit(function(event) {
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
	});
	
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