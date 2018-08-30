var editor_event = true; // value is true if the user can edit the event
var followedIcon = '<i class="fa fa-check"></i><i class="fa fa-user-o"></i>'; //experimental icon
var firstload = true;

function fitDashboard() {
    var widthLength = 500;
    var scrollFlag = $(document).height() > $(window).height();
    if (scrollFlag) {
        // To account for the width of the scrollbar that appears when the document is lengthy.
        widthLength = widthLength - 17;
    }
    if ($(window).innerWidth() < widthLength) {
		$('#event-logo').css('margin-top', '1em');
		$('.dashboard-top-mid').after($('.dashboard-top-left'));
		$('.dashboard-top .panel-body').addClass('flex-col');
		$('.dashboard-top-left').removeClass('flex');
		$('.dashboard-top-right').after($('.followers-cont'));
		$('.followers-cont').css('position', 'static');
		$('.followers-cont').css('min-width', '100%');
		$('.dashboard-top-mid').after($('#event-name'));
		//$('#content').prepend($('#head-image'));
    } else {
		// Reset to initial values
		$('#event-logo').css('margin-top', '-9em');
		$('.dashboard-top-mid').before($('.dashboard-top-left'));
		$('.dashboard-top .panel-body').removeClass('flex-col');
		$('.dashboard-top-left').addClass('flex');
		$('.dashboard-top').before($('.followers-cont'));
		$('.followers-cont').css('position', 'absolute');
		$('.followers-cont').css('min-width', '0');
		$('.dashboard-top .panel-body').after($('#event-name'));
		//$('.followers-cont').before($('#head-image'));
    }
}

$(document).ready(function() {
	//word count limiter
	var maxLength = 5000;
	$('textarea').keyup(function() {
	  var length = $(this).val().length;
	  var length = maxLength-length;
	  $('#chars').text(length);
	});	
    // Follow/Unfollow logic
	$('#btn1').click(function(e) {
		if (!$(this).hasClass('unfollow')) {
			/*
			// Do Follow
			$.ajax({
				type: 'GET',  
				url: 'http://ustart.today:5002/callme/',
				contentType: "application/json; charset=utf-8",
				data: {userID:"123"},
				dataType: "json",
				success: function(data) {*/
					$('#btn1').addClass('following').removeClass('unfollow').html(followedIcon).css('width', '4em');
					$('#btn-message').show('fast');/*
				},
			});*/
		} else if ($(this).hasClass('unfollow')) {
			/*
			// Do Unfollow
			$.ajax({
				type: 'GET',  
				url: 'http://ustart.today:5002/callme/',
				contentType: "application/json; charset=utf-8",
				data: {userID:"123"},
				dataType: "json",
				success: function(data) {*/
					$('#btn1').removeClass('following').html('Unfollowed').css('width', '8em');
					$('#btn-message').hide('fast');/*
				},
			});*/
		}
	});
    $('#btn1').hover(function () {
        $button = $(this);
        if ($button.hasClass('following')) {
            $button.addClass('unfollow');
            $button.html('Unfollow').css('width', '8em');
        }
	}, function () {
        if ($button.hasClass('following')) {
            $button.removeClass('unfollow');
            $button.html(followedIcon).css('width', '4em');
        } else {
            $button.removeClass('unfollow');
            $button.html('Follow').css('width', '8em');
		}
    });
	
    $(window).resize(function() {
		fitDashboard();
    });
	fitDashboard();

	addingAutoComplete();
});

function runeArrayToString(runeArray) {
	console.log(runeArray)
	return runeArray;
}

function addingAutoComplete() {
	var magicSource = ["Magic Johnson, Magic Johnson"];
	$("#eventMemberName").autocomplete({
		source: function () {
			$.ajax("/FindEventMember/")
			.done(function(data) {
				alert(runeArrayToString(data));
			});
		}
	});
	$("#eventProjectName").autocomplete({
		source:  function () {
			$.ajax("/FindEventProject/")
			.done(function(data) {
				alert(runeArrayToString(data));
			});
		}
	});
	$("#eventGuestName").autocomplete({
		source:  function () {
			$.ajax("/FindEventGuest/")
			.done(function(data) {
				alert(runeArrayToString(data));
			});
		}
	});
}