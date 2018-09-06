var editable = true;
var postnumber = 0;
var followedIcon = '<i class="fa fa-check"></i><i class="fa fa-user-o"></i>'; //experimental icon

/*function loadPost(idnumber, postType, postName, postTime, postMessage, postLikes, postComments, postShares) {
	//id number = POST ID
	//post type = Classification: Either Regular Post, Shared Post ( and the subset of the shared post: Original Post)
	//post name = Username of the post's poster
	//post time = Datetime of the post
	//post message = Content
	//post likes = # of likes
	//post comments = # of comments
	//post shares = # of shares

    var addedPost = $('<div id="' + idnumber + '"></div>');

    $('#wallPosts').append(addedPost);
    $(addedPost).prepend('<hr/>');
    if (postType == 'shared') {
        $(addedPost).load('wallload.html .post-shared', function () {
            $(this).prepend($('<hr/>'));
            $(this).find($('.post-time')).text(postTime);
            $(this).find($('.post-message')).text(postMessage);
            $(this).find($('.like-btn')).attr('title', postLikes);
            $(this).find($('.comment-btn')).attr('title', postComments);
            $(this).find($('.share-btn')).attr('title', postShares);
			
			// Loader function (remove Dummy function when usable)
			$.getJSON("/getpost", postnumber, function(data) {
				// data should be returned as a JournalEntry JSON object
				// post doesn't have a unique id, so this function needs to be modified to consider Unique-ness
				// username doesn't seem fetchable, first & last name are being used as a substitute
				
				//loadSharedPost(this, data.Element.PosterID, data.FirstName + ' ' + data.LastName, data.TimeStamp, data.Content);
			});
			
			// Replace Dummy Values
			loadSharedPost(this, 1, 'Poster Name', '0 Minutes Ago', 'postMessage');
            // Replace Dummy Values
			
            $(this).hide();
            $(this).show('slow');
            $('[data-toggle="tooltip"]').tooltip();
        });
    } else {
        $(addedPost).load('wallload.html .post-default', function () {
            $(this).prepend($('<hr/>'))
            $(this).find($('.post-name')).html($('<a href="profile.html#' + postName + '">' + postName + '</a>'));
            $(this).find($('.post-time')).text(postTime);
            $(this).find($('.post-message')).text(postMessage);
            $(this).find($('.like-btn')).attr('title', postLikes);
            $(this).find($('.comment-btn')).attr('title', postComments);
            $(this).find($('.share-btn')).attr('title', postShares);
            $(this).hide();
            $(this).show('slow');
            $('[data-toggle="tooltip"]').tooltip();
            console.log($(this).find(".share-btn"));
            loadNextPostContent($(this).parent().parent().parent().find(".comment-btn"));
            loadNextSharedPost($(this).parent().parent().parent().find(".share-btn"));
        });
    }
	
	postnumber++;
}

function loadSharedPost(sharedPost, idnumber, postName, postTime, postMessage) {
    // Load the shared/original post.
    var postType = 'original';
	
    var addedPost = $('<div id="' + idnumber + '"></div>');

    $(sharedPost).find($('.panel-body')).append(addedPost);
    $(addedPost).load('wallload.html .post-original', function () {
        $(this).find($('.post-name')).html($('<a href="profile.html">' + postName + '</a>'));
        $(this).find($('.post-time')).text(postTime);
        $(this).find($('.post-message')).text(postMessage);
        $(this).hide();
        $(this).slideDown('slow');
        $('[data-toggle="tooltip"]').tooltip();
        loadNextPostContent($(this).parent().parent().parent().find(".comment-btn"));
        loadNextSharedPost($(this).parent().parent().parent().find(".share-btn"));
    });
}

function loadNextSharedPost(sharedbtn) {
    $(sharedbtn).click(function () {
        var icon = $(this).parent().parent().parent().find(".media-object.img-rounded");
        var name = $(this).parent().parent().parent().find(".media-body .mt-0");
        var para = $(this).parent().parent().parent().find(".media-body p");
        var time = $(this).parent().parent().parent().find(".media-body h6");
        $("#share-modal .media-object.img-rounded").attr("src", icon.attr("src"));
        $("#share-modal .media-body .mt-0").text(name.text());
        $("#share-modal .media-body p").text(para.text());
        $("#share-modal .media-body h6").text(time.text());
        $('#share-modal').modal('show');
    });
}

function loadNextPostContent(commentbtn) {
    $(commentbtn).click(function () {
        var icon = $(this).parent().parent().parent().find(".media-object.img-rounded");
        var name = $(this).parent().parent().parent().find(".media-body .mt-0");
        var para = $(this).parent().parent().parent().find(".media-body p");
        var time = $(this).parent().parent().parent().find(".media-body h6");
        $($("#main-modal .media-object.img-rounded")[0]).attr("src", icon.attr("src"));
        $($("#main-modal .media-body .mt-0")[0]).text(name.text());
        $($("#main-modal .media-body p")[0]).text(para.text());
        $($("#main-modal .media-body h6")[0]).text(time.text());
        $('#main-modal').modal('show');
    });
}   

function createNextPostContent(icon, name, para, time, like, remove) {
    var nextMedia = $("<div></div>").addClass("media");
    var nextTime = $("<h6></h6>").addClass("pull-right text-muted time").text(time);
    var mediaLeft = $("<a></a>").addClass("media-left").attr("href", "#");
    var nextImg = $("<img>").css("height", "40px").addClass("img-rounded").attr("src", icon);
    var mediaBody = $("<div></div>").addClass("media-body");
    var newName = $("<h5></h5>").addClass("media-heading user_name").css("color", "cadetblue").text(name);
    var newPara = $("<p></p>").text(para);
    var newLike = $("<p></p>")
    var small1 = $("<small></small>");
    var aLike = $("<a></a>").addClass("comment-like").text(like);
    var small2 = $("<small></small>");
    var aRemove = $("<a></a>").addClass("confirmation-callback").text(remove);
    newLike.append(small1, " - ", small2);
    small1.append(aLike);
    small2.append(aRemove);
    mediaBody.append(newName, newPara, newLike);
    mediaLeft.append(nextImg);
    nextMedia.append(nextTime, mediaLeft, mediaBody);
    $(".comments-list").append(nextMedia);
}*/

 /*$(document).ready(function() {
   // follow button initial state
 if ($('#btn1').hasClass('following')) {
        //display following
        $('#btn1').text('Following');
    } else {
        //Do Follow
        $('#btn1').text('Follow');
    }
});*/

$(function () {
    /*$('body').confirmation({
        selector: '[data-toggle="confirmation"]'
    });

    $('.confirmation-callback').confirmation({
        onConfirm: function () {
            alert('confirm')
        },
        onCancel: function () {
            alert('cancel')
        }
    });*/
    
    //submit button for share
    $('body').on('click', '.odom-submit', function (e) {
        $('#shareCommentForm').submit();
    });
    //submit button for new posts
    $('body').on('click', '#new-postSubmit', function (e) {
		$('#post-msg').val('');
        $('#New-Post-Form').submit();
    });
    // like button
    $(".like-btn").click(function (e) {
		var likeBtnImg = $(this).find('img');
        if (likeBtnImg.attr('src') === "/ico/like.png") {
            likeBtnImg.attr('src', "/ico/liked.png");
        } else {
            likeBtnImg.attr('src', "/ico/like.png");
        }
        return false;
    });
    $(".comment-like").click(function (e) {
        if ($(this).html() == "Like") {
            $(this).html('Liked');
        } else {
            $(this).html('Like');
        }
        return false;
    });
    
    $(".comment-btn").hover(function (e) {
        var cmtBtnImg = $(this).find('img');
        cmtBtnImg.attr('src', "/ico/comment.png");     
     },function (e) {
        var cmtBtnImg = $(this).find('img');
        cmtBtnImg.attr('src', "/ico/no comment.png");     
     });
    
     $(".share-btn").hover(function (e) {
        var shrBtnImg = $(this).find('img');
        shrBtnImg.attr('src', "/ico/share.png");     
     },function (e) {
        var shrBtnImg = $(this).find('img');
        shrBtnImg.attr('src', "/ico/not share.png");     
     });
        
    //show main-modal
    /*$(".comment-btn").click(function (e) {
        $('#main-modal').modal('show');
    });
    $(".share-btn").click(function (e) {
        $('#share-modal').modal('show');
    });*/
	
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
	
    //disable post button
    $("#new-postSubmit").prop("disabled", true);
    $("#post-msg").focus(function (e) {
        var textbox = $("#post-msg");
        textbox.animate({
            height: "100px"
        }, 690);
        if (textbox.val().length == 0) {
            $("#new-postSubmit").prop("disabled", true);
        } else {
            $("#new-postSubmit").removeAttr("disabled");
        }
    });
    $("#post-msg").keyup(function (e) {
        var textbox = $("#post-msg");
        if (textbox.val().length == 0) {
            $("#new-postSubmit").prop("disabled", true);
        } else {
            $("#new-postSubmit").removeAttr("disabled");
        }
    });

    $("#post-msg").blur(function (e) {
        var textbox = $("#post-msg");
        textbox.animate({
            height: "50px"
        }, 690);
    });
});

var createNewCard = function (name, image_url) {
    var cardCont = document.createElement('div');
    $(cardCont).attr("class", "user-card");
    var dismissCont = document.createElement('div');
    $(dismissCont).attr("class", "dismiss");
    var dismissSpan = document.createElement('span');
    $(dismissSpan).attr("id", "dismiss").text('×');
    var contentCont = document.createElement('div');
    $(contentCont).attr("class", "content");
    var contentSpanAnch = document.createElement('a');
    $(contentSpanAnch).attr("href", "profile.html");
    var contentSpanAnchImg = document.createElement('img');
    $(contentSpanAnchImg).attr("class", "avatar").attr("src", image_url);
    var userCardInfo = document.createElement('div');
    $(userCardInfo).attr("class", "user-card-info");
    var nameStrong = document.createElement('strong');
    $(nameStrong).attr("class", "user-card-name").text(name);
    var followBtn = document.createElement('button');
    $(followBtn).attr("id", "btn-small").attr("class", "btn btnX").attr("rel", "6").text('Follow');


    cardCont.append(dismissCont);
    dismissCont.append(dismissSpan);
    cardCont.append(contentCont);
    contentCont.append(contentSpanAnchImg);
    contentCont.append(userCardInfo);
    userCardInfo.append(contentSpanAnch);
    contentSpanAnch.append(nameStrong);
    userCardInfo.append(document.createElement('br'));
    userCardInfo.append(followBtn);

    $('.suggested-users-cont').append(cardCont);
    $(cardCont).hide();
    $(cardCont).show('fast');
};
var createNewCardProj = function (name, proj_img) {
    var cardCont = document.createElement('div');
    $(cardCont).attr("class", "proj-card");
    var dismissCont = document.createElement('div');
    $(dismissCont).attr("class", "dismiss");
    var dismissSpan = document.createElement('span');
    $(dismissSpan).attr("id", "dismiss").text('×');
    var contentCont = document.createElement('div');
    $(contentCont).attr("class", "content");
    var contentSpan = document.createElement('span');
    $(contentSpan).attr("class", "proj-card-thumb");
    var contentSpanAnch = document.createElement('a');
    $(contentSpanAnch).attr("href", "projects.html");
    var contentSpanAnchImg = document.createElement('img');
    $(contentSpanAnchImg).attr("class", "avatar").attr("src", proj_img);
    var projCardInfo = document.createElement('div');
    $(projCardInfo).attr("class", "proj-card-info");
    var nameStrong = document.createElement('strong');
    $(nameStrong).attr("class", "proj-card-name").text(name);
    var followBtn = document.createElement('button');
    $(followBtn).attr("id", "btn-small").attr("class", "btn btnY").attr("rel", "6").text('Follow');


    cardCont.append(dismissCont);
    dismissCont.append(dismissSpan);
    cardCont.append(contentCont);
    contentCont.append(contentSpanAnchImg);
    contentCont.append(projCardInfo);
    projCardInfo.append(contentSpanAnch);
    contentSpanAnch.append(nameStrong);
    projCardInfo.append(document.createElement('br'));
    projCardInfo.append(followBtn);


    $('.suggested-projects-cont').append(cardCont);
    $(cardCont).hide();
    $(cardCont).slideDown('fast');
};

var removeThumbUsers = function () {
    console.log('removing');
    console.log($(this).html());
    $(this).parent().remove();
    createNewCard();
};

function fitDashboard() {
    var widthLength = 1200,
        widthLength2 = 499;
    var scrollFlag = $(document).height() > $(window).height();
    if (scrollFlag) {
        // To account for the width of the scrollbar that appears when the document is lengthy.
        widthLength = widthLength - 17;
        widthLength2 = widthLength2 - 17;
    }
    if ($(window).innerWidth() < widthLength) {
        $('.dashboard-left').append($('.dashboard-right'));
    } else {
        $('.dashboard-right').insertAfter($('.menu-wrap-inner'));
    }
    if ($(window).innerWidth() < widthLength2) {
        $('#menu').append($('#box'));
        $('.container-btn-box').hide();
    } else {
        $('.container-btn-box').append($('#box'));
        $('.container-btn-box').show();
    }
}
/* FOR FUTURE REF */
/*function formatTime1(time) {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date(time);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var day = weekday[date.getDay()];
    var amPm = "AM";
    if (hour >= 12) {
        hour = hour - 12;
        amPm = "PM";
    }
    if (hour == 0) {
        hour = 12;
    }
    var dateString = day + ", " + hour + ":" + minutes + " " + amPM;
    return dateString;
}*/
function formatTime(time) {
    var time = new Date(time).getTime();
    var currentTime = new Date().getTime() - time;
    var unitTime = "blank"
    if (currentTime < 1000) {
        return "Now";
    }
    if (currentTime < 60000) {
        return Math.floor(currentTime / 1000) + " s";
    }
    if (currentTime < 3600000) {
        return Math.floor(currentTime / 60000) + " m";
    }
    if (currentTime < 86400000) {
        return Math.floor(currentTime / 3600000) + " h";
    }
    if (currentTime < 604800000) {
        return Math.floor(currentTime / 86400000) + " d";
    }
    if (currentTime < 2592000000) {
        return Math.floor(currentTime / 604800000) + " w";
    }
    if (currentTime < 31104000000) {
        return Math.floor(currentTime / 2592000000) + " m";
    }
    return Math.floor(currentTime / 31104000000) + " y";
}

$(document).ready(function () {
    $("img#head-image").on('error', function () {
        $(this).attr('src', "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
    });
    $('[data-toggle="tooltip"]').tooltip();

    $(window).scroll(function () {
        var scrollBuffer = $(window).height() * 0.1;
        if ($(window).scrollTop() + scrollBuffer >= ($(document).height() - $(window).height())) {
			// Loader function (remove Dummy function when usable)
			$.getJSON("/getpost", postnumber, function(data) {
				// data should be returned as a JournalEntry JSON object
				// post doesn't have a unique id, so this function needs to be modified to consider Unique-ness
				// username doesn't seem fetchable, first & last name are being used as a substitute
				
				//loadPost(data.Element.PosterID, data.Classification, data.FirstName + ' ' + data.LastName, data.TimeStamp, data.Content, data.Likes.length, data.ReplyIDs, data.ShareIDs.length);
			});
			
			// Replace Dummy Values
			//loadPost(0, 'default', 'Poster Name', '0 Minutes Ago', 'postMessage', 3000, 30, 300);
			// Replace Dummy Values
        }
    });

    $(window).resize(function() {
      //fitDashboard();
    });
    //fitDashboard();

    $(document).on("click", '.dismiss', function () {
        var max = 9,
            min = 0;
        var user_names = ["Nasir Memon", "Phyllis Frankyl", "Boris Aronov", "Linda Sellie", "Itay Tal", "Daniel Katz-Braunchweig", "Guido Gerig", "Justin Cappos", "Lisa Hellerstein", "Keith W. Ross"];
        var user_img = ["http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-336.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-310.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-474.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5953.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5952.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-197.jpg",
            "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5945.jpg", "http://engineering.nyu.edu/files/imagecache/img_col_3_140/pictures/picture-4253.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-328.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-362.jpg"
        ];
        var proj_names = ["Google", "Pied Piper", "MTA Project: Faster Trains", "MTA: Cheaper Fairs", "UBER", "Project Pizza", "Project Kitty", "Project Water", "Android", "Microsoft"];
        var proj_img = ["https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z_400x400.jpg", "http://www.piedpiper.com/app/themes/pied-piper/dist/images/logo.svg", "http://www.mta.info/sites/all/themes/mta/images/mta_info.gif", "http://www.mta.info/sites/all/themes/mta/images/mta_info.gif", "https://pbs.twimg.com/profile_images/839711043056132097/2F8DZeeB_400x400.jpg", "https://pbs.twimg.com/profile_images/847417284641476617/WIScfa4Q_400x400.jpg", "https://pbs.twimg.com/profile_images/848471660860538880/pevXVsIp_400x400.jpg", "https://pbs.twimg.com/profile_images/553653588690362368/g0zxIbu8_400x400.png", "https://pbs.twimg.com/profile_images/875443327835025408/ZvmtaSXW_400x400.jpg", "https://pbs.twimg.com/profile_images/875388334003986432/eUsjmVRJ_400x400.jpg"]

        var index = Math.floor(Math.random() * (max - min + 1) + min);

        if ($(this).parent().attr("class") == "user-card") {
            $(this).parent().remove();
            console.log(user_names[index] + ' ' + user_img[index]);
            createNewCard(user_names[index], user_img[index]);
            console.log('new card confirm');
        } else {
            console.log('new project')
            $(this).parent().remove();
            createNewCardProj(proj_names[index], proj_img[index]);

        }
    });

    $(document).on("click", '.btn.btnX', function () {
        var max = 9,
            min = 0;
        var user_names = ["Nasir Memon", "Phyllis Frankyl", "Boris Aronov", "Linda Sellie", "Itay Tal", "Daniel Katz-Braunchweig", "Guido Gerig", "Justin Cappos", "Lisa Hellerstein", "Keith W. Ross"];
        var user_img = ["http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-336.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-310.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-474.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5953.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5952.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-197.jpg",
            "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-5945.jpg", "http://engineering.nyu.edu/files/imagecache/img_col_3_140/pictures/picture-4253.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-328.jpg", "http://engineering.nyu.edu/files/imagecache/profile_full/pictures/picture-362.jpg"
        ];
        var index = Math.floor(Math.random() * (max - min + 1) + min);

        $(this).parent().parent().parent().remove();
        console.log('after remove confirm');
        createNewCard(user_names[index], user_img[index]);
    });
    $(document).on("click", '.btn.btnY', function () {
        var max = 9,
            min = 0;
        console.log($(this).parent().parent().parent().html());
        var proj_names = ["Google", "Pied Piper", "MTA Project: Faster Trains", "MTA: Cheaper Fairs", "UBER", "Project Pizza", "Project Kitty", "Project Water", "Android", "Microsoft"];
        var proj_img = ["https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z_400x400.jpg", "http://www.piedpiper.com/app/themes/pied-piper/dist/images/logo.svg", "http://www.mta.info/sites/all/themes/mta/images/mta_info.gif", "http://www.mta.info/sites/all/themes/mta/images/mta_info.gif", "https://pbs.twimg.com/profile_images/839711043056132097/2F8DZeeB_400x400.jpg", "https://pbs.twimg.com/profile_images/847417284641476617/WIScfa4Q_400x400.jpg", "https://pbs.twimg.com/profile_images/848471660860538880/pevXVsIp_400x400.jpg", "https://pbs.twimg.com/profile_images/553653588690362368/g0zxIbu8_400x400.png", "https://pbs.twimg.com/profile_images/875443327835025408/ZvmtaSXW_400x400.jpg", "https://pbs.twimg.com/profile_images/875388334003986432/eUsjmVRJ_400x400.jpg"]

        var index = Math.floor(Math.random() * (max - min + 1) + min);

        $(this).parent().parent().parent().remove();
        console.log('after remove confirm');
        createNewCardProj(proj_names[index], proj_img[index]);

    });

    //loadNextPostContent($(".comment-btn"));
    //loadNextSharedPost($(".share-btn"));
    $("#commentform").submit(function (event) {
        event.preventDefault();
        createNextPostContent("https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/12514060_499384470233859_6798591731419500290_o.jpg?oh=329ea2ff03ab981dad7b19d9172152b7&oe=5A2D7F0D", "Ryan Rozbiani", $("#commentform input").val(), formatTime(new Date().getTime()), "Like", "Remove");
        $("#commentform input.form-control").val('');
    });
	
	// Block user
	var isBlocked = false;
	
	$('#block-user').click(function() {
		isBlocked = !isBlocked;
		if (isBlocked) {
			$('#block-user .block-user-text').text('ed');
		} else {
			$('#block-user .block-user-text').text('');
		}
	});
});