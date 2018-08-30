var editor_event = true; // value is true if the user can edit the event
var followedIcon = '<i class="fa fa-check"></i><i class="fa fa-user-o"></i>'; //experimental icon
var firstload = true;

function loadMembers(userHandle) {
    // Load the user's avatar image from the paramter userHandle.
    var masterElement = $('.member').first().clone();
    // This will direct the user to the member's profile page.
    $(masterElement).attr('href', "profile.html#" + userHandle);
    // Avatar image replaces the URL. Use 'userhandle' to find avatar and stats.
    $(masterElement).children('img').attr('src', "https://www.fillmurray.com/20" + Math.floor(Math.random() * 10) + "/20" + Math.floor(Math.random() * 10));
    // Name goes here. Might utilize IRL name.
    $(masterElement).children('.member-name').text(randomText() + " " + randomText());

    // Filler attributes
    $(masterElement).children('.member-title').text("Developer");
    $(masterElement).children('.member-followers').text(Math.floor(Math.random() * 800) + " Followers");
    $(masterElement).children('.member-events').text(Math.floor(Math.random() * 30) + " Events");

    $("#event-team").append($(masterElement));

    $(masterElement).hover(function() {
        //$(this).children('.member-name').slideDown('fast');
        $(this).children('.member-title').slideDown('fast');
        $(this).children('.member-followers').slideDown('fast');
        $(this).children('.member-events').slideDown('fast');
    }, function() {
        //$(this).children('.member-name').delay('slow').slideUp('fast');
        $(this).children('.member-title').delay('slow').slideUp('fast');
        $(this).children('.member-followers').delay('slow').slideUp('fast');
        $(this).children('.member-events').delay('slow').slideUp('fast');
    });
}


function randomText() {
    var text = "";
    var alphabet = "abcdefghijklmnoprstu";
    var vowels = "aeoiu";

    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();

    for (var i = 0; i < 5; i++) {
        var temp = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        while (vowels.includes(text.substr(text.length - 1, text.length)) && vowels.includes(temp) || !vowels.includes(text.substr(text.length - 1, text.length)) && !vowels.includes(temp)) {
            temp = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        text += temp;
    }

    return text;
}

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
	$('#btn-message').click(function() {
		window.location.href = "inbox.html";
	});

    // Load members of the event.
    for (i = 1; i < 0; i++) {
        loadMembers(i);
    }

    $('.member').hover(function() {
        //$(this).children('.member-name').stop(true, false).slideDown('fast');
        $(this).children('.member-title').stop(true, false).slideDown('fast');
        $(this).children('.member-followers').stop(true, false).slideDown('fast');
        $(this).children('.member-events').stop(true, false).slideDown('fast');
    }, function() {
        //$(this).children('.member-name').delay('slow').slideUp('fast');
        $(this).children('.member-title').delay('slow').slideUp('fast');
        $(this).children('.member-followers').delay('slow').slideUp('fast');
        $(this).children('.member-events').delay('slow').slideUp('fast');
    });
	
    $(window).resize(function() {
		fitDashboard();
    });
   // fitDashboard();
	
	$('#eventFollowerModal').on('shown.bs.modal', function() {
		// Generate followers
		if (firstload) {
			populateFollowerList(791);
			populateFollowerList(792);
			populateFollowerList(800);
			for (i = 0; i < 17; i++) {
				populateFollowerList(Math.floor((Math.random() * 802) + 1));
			}
			firstload = false;
		}
	});
});

function populateFollowerList(num) {
	var generateurl = "https://cors.now.sh/http://pokeapi.co/api/v2/pokemon/" + num;
	$.getJSON(generateurl, function( data ) {
		followerCallback(data);
	});
}

function followerCallback(data) {
	var followerUsername = data.name;
	var followerProfilePic = data.sprites.front_default;
	var followerTag = '<li><a href="profile.html#' + followerUsername + '"><img src="' + followerProfilePic + '"/><div class="event-modal-followers-name">' + followerUsername + '</div></a></li>';
	var followerElem = $(followerTag + " ").appendTo($('#event-modal-followers-list'));
	followerElem.hide();
	followerElem.find('img').on('load', function(event) {
		$(this).parents('li').fadeIn('slow');
	});
}