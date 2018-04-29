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
 $('body').on("click", "a.like-btn", function(e) {
     var likeBtnImg = $(this).find('img');
    if (likeBtnImg.attr('src') === "/ustart_front/ico/like.png") {
        likeBtnImg.attr('src', "/ustart_front/ico/liked.png");
    } else {
        likeBtnImg.attr('src', "/ustart_front/ico/like.png");
    }
    return false;
 });

 $('body').on("mouseenter", "a.comment-btn", function(e) {
    var cmtBtnImg = $(this).find('img');
    cmtBtnImg.attr('src', "/ustart_front/ico/comment.png"); 
 });
 $('body').on("mouseleave", "a.comment-btn", function(e) {
    var cmtBtnImg = $(this).find('img');
    cmtBtnImg.attr('src', "/ustart_front/ico/no comment.png");
 });

 $('body').on("mouseenter", "a.share-btn", function(e) {
    var shrBtnImg = $(this).find('img');
    shrBtnImg.attr('src', "/ustart_front/ico/share.png"); 
 });

 $('body').on("mouseleave", "a.share-btn", function(e) {
     var shrBtnImg = $(this).find('img');
     shrBtnImg.attr('src', "/ustart_front/ico/not share.png"); 
 });
$(function () {
    $('body').confirmation({
        selector: '[data-toggle="confirmation"]'
    });

    $('.confirmation-callback').confirmation({
        onConfirm: function () {
            alert('confirm')
        },
        onCancel: function () {
            alert('cancel')
        }
    });
    
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
        if (likeBtnImg.attr('src') === "/www/ustart.tech/ico/like.png") {
            likeBtnImg.attr('src', "/www/ustart.tech/ico/liked.png");
        } else {
            likeBtnImg.attr('src', "/www/ustart.tech/ico/like.png");
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
        cmtBtnImg.attr('src', "/www/ustart.tech/ico/comment.png");     
     },function (e) {
        var cmtBtnImg = $(this).find('img');
        cmtBtnImg.attr('src', "/www/ustart.tech/ico/no comment.png");     
     });
    
     $(".share-btn").hover(function (e) {
        var shrBtnImg = $(this).find('img');
        shrBtnImg.attr('src', "/www/ustart.tech/ico/share.png");     
     },function (e) {
        var shrBtnImg = $(this).find('img');
        shrBtnImg.attr('src', "/www/ustart.tech/ico/not share.png");     
     });
    
    // button follow/unfollow
    $('#btn1').hover(function () {
        $button = $(this);
        if ($button.hasClass('following')) {
            $button.addClass('unfollow');
            $button.text('Unfollow');
        }
        }, function () {
        if ($button.hasClass('following')) {
            $button.removeClass('unfollow');
            $button.text('Following');
        }
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
};
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
};

$(document).ready(function () {
    $(".commentOfComment").css("display","none");
    $("img#head-image").on('error', function () {
        $(this).attr('src', "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
    });
    $('[data-toggle="tooltip"]').tooltip();

    $(window).scroll(function () {
        var scrollBuffer = $(window).height() * 0.1;
        if ($(window).scrollTop() + scrollBuffer >= ($(document).height() - $(window).height())) {
              // loadPost();

        }
    });

    //$(window).resize(function() {
    //  fitDashboard();
    //});
    //fitDashboard();

});