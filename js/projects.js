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
		$('.dashboard-top-mid').after($('.dashboard-top-left'));
		$('.dashboard-top .panel-body').addClass('flex-col');
		$('.dashboard-top-left').removeClass('flex');
		$('.dashboard-top-right').after($('.followers-cont'));
		$('.followers-cont').css('position', 'static');
		$('.followers-cont').css('min-width', '100%');
		$('#content').prepend($('#head-image'));
    } else {
		// Reset to initial values
		$('#project-logo').css('margin-top', '-9em');
		$('.dashboard-top-mid').before($('.dashboard-top-left'));
		$('.dashboard-top .panel-body').removeClass('flex-col');
		$('.dashboard-top-left').addClass('flex');
		$('.dashboard-top').before($('.followers-cont'));
		$('.followers-cont').css('position', 'absolute');
		$('.followers-cont').css('min-width', '0');
		$('.followers-cont').before($('#head-image'));
    }
}

$(document).ready(function() {
    // Follow/Unfollow logic
	$('#btn1').click(function(e) {
		if (!$(this).hasClass('unfollow')) {
			/*
			// Do Follow
			$.ajax({
				type: 'GET',  
				url: 'http://ustart.today:5000/callme/',
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
				url: 'http://ustart.today:5000/callme/',
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

    // Load members of the project.
    for (i = 1; i < 8; i++) {
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

    if (editor_project) {
		/*
        CKEDITOR.disableAutoInline = true;
        $('#project-name').attr('contenteditable', true);
        CKEDITOR.inline('project-name', {
			on: {
				blur: function( event ) {
					var params = {
						page_id: $(".project-name").val(),
						body_text: event.editor.getData()
					};

					$.ajax({
						url: 'php_file_to_post_to.php',
						global: false,
						type: "POST",
						dataType: "text json",
						data: params,
						success: function(result) {
							console.log(result);
						}
					});
					
					alert('project-name');
				}
			}
		});
        $('#project-desc').attr('contenteditable', true);
        CKEDITOR.inline('project-desc', {
			on: {
				blur: function( event ) {
					var params = {
						page_id: $(".project-desc").val(),
						body_text: event.editor.getData()
					};

					$.ajax({
						url: 'php_file_to_post_to.php',
						global: false,
						type: "POST",
						dataType: "text json",
						data: params,
						success: function(result) {
							console.log(result);
						}
					});
					
					alert('project-desc');
				}
			}
		});
        $('#project-location').attr('contenteditable', true);
        CKEDITOR.inline('project-location', {
			on: {
				blur: function( event ) {
					var params = {
						page_id: $(".project-location").val(),
						body_text: event.editor.getData()
					};

					$.ajax({
						url: 'php_file_to_post_to.php',
						global: false,
						type: "POST",
						dataType: "text json",
						data: params,
						success: function(result) {
							console.log(result);
						}
					});
					
					alert('project-location');
				}
			}
		});
        $('#project-category').attr('contenteditable', true);
        CKEDITOR.inline('project-category', {
			on: {
				blur: function( event ) {
					var params = {
						page_id: $(".project-category").val(),
						body_text: event.editor.getData()
					};

					$.ajax({
						url: 'php_file_to_post_to.php',
						global: false,
						type: "POST",
						dataType: "text json",
						data: params,
						success: function(result) {
							console.log(result);
						}
					});
					
					alert('project-category');
				}
			}
		});

        $('#editLink').click(function() {
            var editedlink = prompt("Please enter the new website address", $('#project-website').attr('href'));
            if (editedlink !== null && editedlink !== "") {
                try {
                    var editedURL = new URL(encodeURI(editedlink));
                    $('#project-website').attr('href', editedURL);
                    $('#project-website').text(editedURL);
                } catch (e) {
                    console.log(e);
                    alert('We\'ve encountered an error with your link. You might missing the HTTP protocol.');
                }
            }
        });
		*/
	
		$.contextMenu({
			selector: '#project-logo',
			callback: function(key, options) {
				if (key === 'upload-logo') {
					alert(0);
				}
			},
			items: {
				"upload-logo": {name: "Upload New Logo", icon: "fa-camera"}
			},
			trigger: 'left'
		});
		
		$.contextMenu({
			selector: '#head-image',
			callback: function(key, options) {
				if (key === 'upload-banner') {
					alert(0);
				}
			},
			items: {
				"upload-banner": {name: "Upload New Banner", icon: "fa-camera-retro"}
			},
			trigger: 'left'
		});
    }

    $(window).resize(function() {
		fitDashboard();
    });
    fitDashboard();
	
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