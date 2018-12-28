var editor_project = true; // value is true if the user can edit the project
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
    $(masterElement).children('.member-projects').text(Math.floor(Math.random() * 30) + " Projects");

    $("#proj-team").append($(masterElement));

    $(masterElement).hover(function() {
        //$(this).children('.member-name').slideDown('fast');
        $(this).children('.member-title').slideDown('fast');
        $(this).children('.member-followers').slideDown('fast');
        $(this).children('.member-projects').slideDown('fast');
    }, function() {
        //$(this).children('.member-name').delay('slow').slideUp('fast');
        $(this).children('.member-title').delay('slow').slideUp('fast');
        $(this).children('.member-followers').delay('slow').slideUp('fast');
        $(this).children('.member-projects').delay('slow').slideUp('fast');
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
		$('#project-logo').css('margin-top', '-5em');
		$('.dashboard-top-mid').after($('.dasfhboard-top-left'));
		$('.dashboard-top .panel-body').addClass('flex-col');
		$('.dashboard-top-left').removeClass('flex');
		$('.dashboard-top-right').after($('.followers-cont'));
		$('.followers-cont').css('position', 'static');
		$('.followers-cont').css('min-width', '100%');
		$('.dashboard-top-mid').after($('#project-name'));
		//$('#content').prepend($('#head-image'));
    } else {
		// Reset to initial values
		$('#project-logo').css('margin-top', '-9em');
		$('.dashboard-top-mid').before($('.dashboard-top-left'));
		$('.dashboard-top .panel-body').removeClass('flex-col');
		$('.dashboard-top-left').addClass('flex');
		$('.dashboard-top').before($('.followers-cont'));
		$('.followers-cont').css('position', 'absolute');
		$('.followers-cont').css('min-width', '0');
		$('.dashboard-top .panel-body').after($('#project-name'));
		//$('.followers-cont').before($('#head-image'));
    }
}

$(document).ready(function() {
    $("#post-msg").keydown(function(event) {
        if (event.keyCode === 13 && event.metaKey) {
        $(this).siblings('#new-postSubmit').click();
        $('#post-msg').val('');
        }
        });

    if(followstatus == true){
         $('#projFollow').attr('class', 'proj-follow-btn following');
         $('.follow-btn-text').text('Following');
    }
    else{
        $('#projFollow').attr('class', 'proj-follow-btn');
        $('.follow-btn-text').text('Follow');
    } 
    $('#projFollow').hover(function () {
        var button = $(this);
        if (button.hasClass('following')) {
            button.addClass('unfollow');
            $('.follow-btn-text').text('Unfollow');
        }
        }, function () {
        if (button.hasClass('following')) {
            button.removeClass('unfollow');
            $('.follow-btn-text').text('Following');
        }
    });
    
    $('#projFollow').click(function(e) {
        $( "#projFollow" ).prop( "disabled", true );
        $.ajax({
            type: 'GET',  
            url: 'https://ustart.today:'+port+'/AjaxUserFollowProjectToggle/',
            contentType: "application/json; charset=utf-8",
            data: {projectID: pageID},
            success: function(data) {
                var totalFollowers = parseInt($('.follower-count').attr("followers"));
                console.log(followstatus);
                if ($('#projFollow').hasClass('following')) {
                    console.log("Let's Unfollow");
                    //$.ajax(); Do Unfollow
                    $('#projFollow').removeClass('following');
                    $('#projFollow').removeClass('unfollow');
                    $('#projFollow').text('Follow');
                    $('.follower-count').html(intToString(totalFollowers-1));
                    $('.follower-count').attr("followers", totalFollowers-1);
                    $("#followstat").val("no");
                    followstatus =false;
                } else {
                    console.log("Let's follow");
                    // $.ajax(); Do Follow
                    $('#projFollow').addClass('following');
                    $('#projFollow').text('Following');
                   $('.follower-count').attr("followers", totalFollowers+1);
                    $('.follower-count').html(intToString(totalFollowers+1));
                    $("#followstat").val("yes");
                    followstatus =true;
                }
                $( "#projFollow" ).prop( "disabled", false );
            },
            error: function(error) {
                console.log("It just doesn't work");
                console.log(error);
            }
        });
    });

    // Load members of the project.
    for (i = 1; i < 0; i++) {
        loadMembers(i);
    }

    $('.member').hover(function() {
        //$(this).children('.member-name').stop(true, false).slideDown('fast');
        $(this).children('.member-title').stop(true, false).slideDown('fast');
        $(this).children('.member-followers').stop(true, false).slideDown('fast');
        $(this).children('.member-projects').stop(true, false).slideDown('fast');
    }, function() {
        //$(this).children('.member-name').delay('slow').slideUp('fast');
        $(this).children('.member-title').delay('slow').slideUp('fast');
        $(this).children('.member-followers').delay('slow').slideUp('fast');
        $(this).children('.member-projects').delay('slow').slideUp('fast');
    });
	
    $(window).resize(function() {
		//fitDashboard();
    });
    //fitDashboard();
	
	$('#projectFollowerModal').on('shown.bs.modal', function() {
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
	var followerTag = '<li><a href="profile.html#' + followerUsername + '"><img src="' + followerProfilePic + '"/><div class="proj-modal-followers-name">' + followerUsername + '</div></a></li>';
	var followerElem = $(followerTag + " ").appendTo($('#proj-modal-followers-list'));
	followerElem.hide();
	followerElem.find('img').on('load', function(event) {
		$(this).parents('li').fadeIn('slow');
	});
}