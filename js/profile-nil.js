// globals
var port = location.port;
var flag = 1;
var IDArray = [];

document.addEventListener('DOMContentLoaded', function () { window.scrollTo(0, 200) });

window.___gcfg = { "parsetags": "explicit" };
$(function () {
   /* $("#LeftNavBar-placeholder").load("/ustart_front/leftnav-nil.html", function (e) {
        $("#leftNavProfile").addClass("theActive");
    });*/
    // Enables drag-n-drop list items (using the header)
    $("#sortable").sortable({
        handle: ".widgetTitle",
        revert: true,
        tolerance: "pointer",
        items: "> li.sortable",
        update: function(event, ui) {
            // Update {{.UserInfo.UserWidgets}} with $("#sortable").sortable("toArray")
            var asortedWidgets = $("#sortable").sortable("toArray");
            $.ajax({
                type: 'GET',
                url: 'http://ustart.today:'+port+'/sortUserWidgets/',
                contentType: "application/json; charset=utf-8",
                data: {sortedWidgets: JSON.stringify(asortedWidgets)},
                success: function(data) {
                    console.log('Sorted Widgets are probably saved: ');
                    console.log(data);
                },
                error: function(err) {
                    console.log('Sorted Widgets failed: ');
                    console.log(err);
                }
            });
        }
    });


    $('#projSortable').sortable();
    $('#projectWidget .widgetBody').sortable({
        cancel: ''
    }).disableSelection();
    $('#hashTagsBody').sortable({
        cancel: ''
    }).disableSelection();

    $('.links-container').sortable({
        cancel: ''
    }).disableSelection();
    /*
    // Enables resizable list items
    $("#sortable>li").resizable({
        animate: true,
        ghost: true,
        resize: function (event, ui) {
            ui.size.width = ui.originalSize.width;
        }
    });
    */
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

  //render posts
    $('body').on("click", "#Wall-loadAJAX", function(e) {
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
        $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/ajaxUserEntries/',
                    contentType: "application/json; charset=utf-8",
                    data: {userID:pageID},
                    success: function(data) {  
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                            var temp = $.parseJSON(jqXHR.responseText);
                            if (temp != null){
                                console.log(temp.length);
                                $('#wall-dataF').empty();
                                $('#shareModals').empty();
                                $('#editModals').empty();
                                $('#deleteModals').empty();
                                $('#commentModals').empty();
                                //if post greater than 5
                                if(temp.length > 5){
                                    for (i=temp.length - 1; i >=0; i--){
                                        if (userID == temp[i].Element.PosterID || userID == pageID ){
                                            if (temp[i].Element.Classification == 2){createSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );
                                            }
                                            else if (temp[i].Element.Classification == 0){
                                                 makePostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                            }
                                        }
                                        else{
                                            if (temp[i].Element.Classification == 2){createBasicSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );
                                            }
                                            else if (temp[i].Element.Classification == 0) {
                                                 makeBasicPostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                            }
                                        }
                                        $('#wall-dataF').append('<hr>');

                                    }
                                }
                                //if post less than 5 just render all
                                else{
                                    for (i=temp.length-1; i >= 0; i--){
                                        if (userID == temp[i].Element.PosterID || userID == pageID ){
                                            if (temp[i].Element.Classification == 2){
                                               console.log("rendering share post"); createSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );
                                            }
                                            else if (temp[i].Element.Classification == 0){
                                                 makePostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                            }
                                        }
                                        else{
                                            if (temp[i].Element.Classification == 2){
                                               console.log("rendering share post"); createBasicSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );
                                            }
                                            else if (temp[i].Element.Classification == 0) {
                                                 makeBasicPostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                            }
                                        }
                                        if (i != 0) {
                                            $('#wall-dataF').append('<hr>');
                                        }
                                    }
                                }
                            } 
                         }
                    },error: function(err) {
                        console.log('wall Load failed: ');
                        console.log(err);
                    }
        });
    });
     //render comments

     $('body').on("click", ".comment-btn", function(e) {
          var postID = e.currentTarget.id;
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/AjaxLoadComments/',
                    contentType: "application/json; charset=utf-8",
                    data: {postID:postID},
                    success: function(data) { 
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                            var temp = $.parseJSON(jqXHR.responseText); 
                            if (temp != null){
                                 $('#comments-list'+postID).empty();
                                 for (i=temp.length-1; i >= 0; i--){
                                     if (userID == temp[i].Element.PosterID || userID == pageID ){
                                        makeCommentApplications(postID, temp[i].Image, temp[i].FirstName, temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].NumReplies,temp[i].Element.TimeStamp);
                                     }
                                     else{
                                        makeBasicCommentApplications(postID, temp[i].Image, temp[i].FirstName, temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].NumReplies,temp[i].Element.TimeStamp);
                                     }
                                 }
                            }
                            else{
                                $('#comments-list'+postID).empty();
                            }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);
                    }
        });  
     });

     //render comment of comments
       $('body').on("click", ".view-replies", function(e) {
           var postID =  e.currentTarget.getAttribute('myvalue');
            $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/getComments/',
                    contentType: "application/json; charset=utf-8",
                    data: {PostID:postID, Pikachu:userID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                           if (temp != null){
                              $('#replies'+postID).empty();
                               $(e.currentTarget).hide();
                               for (i=temp.length-1; i >= 0; i--){
                                   if (userID == temp[i].Element.PosterID || userID == pageID ){
                                        makeCommentOfCommentsApplications(postID, temp[i].Image, temp[i].FirstName,temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].Element.TimeStamp);
                                   }
                                   else{
                                        makeBasicCommentOfCommentsApplications(postID, temp[i].Image, temp[i].FirstName,temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].Element.TimeStamp);
                                   }
                               }
                           }
                           else{
                               $('#replies'+postID).empty();
                           }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
      });

     //submit new post
      $('body').on("click", "#new-postSubmit", function(e) {
           var content = $("#post-msg").val();
           $('#new-postSubmit').prop('disabled', true);
           if (content != ""){
                $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/addPost/',
                        contentType: "application/json; charset=utf-8",
                        data: {docID:userID, text:content},
                        success: function(data) {
                        },complete: function (jqXHR,status) {
                             if(status == 'success' || status=='notmodified')
                             {
                               var temp = $.parseJSON(jqXHR.responseText);
                               if (temp != null){
                                    if ($(".wallPosts").length >= 1){
                                        $('#wall-dataF').prepend('<hr>');  
                                    }
                                    IDArray.push(temp[0].ElementID);
                                    makeNewPostApplications(temp[0].Image, temp[0].FirstName,temp[0].LastName,temp[0].Element.Content,temp[0].ElementID,temp[0].NumLikes, temp[0].NumReplies, temp[0].NumShares,temp[0].Element.TimeStamp);
                               }
                               $("#post-msg").empty();
                               $('#new-postSubmit').prop('disabled', false);

                              }
                        },error: function(err) {
                            console.log('comment Load failed: ');
                            console.log(err);
                        }
                });
               }
      });
     //submit new comment
      $('body').on("click", ".new-comment-submit", function(e) {
           var postID = e.currentTarget.id;
           var content = $("#commentContent"+postID).val();
           $(e.currentTarget).css("pointer-events", "none");
          if (content != ""){
            $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/AddComment2/',
                    contentType: "application/json; charset=utf-8",
                    data: {postID:postID, body:content},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                           if (temp != null){
                               makeNewCommentApplications(postID, temp[0].Image, temp[0].FirstName, temp[0].LastName, temp[0].Element.Content, temp[0].ElementID,temp[0].NumReplies,temp[0].Element.TimeStamp);
                               $("#commentContent"+postID).val('');
                               $(e.currentTarget).css("pointer-events", "auto"); 
                               var count = $(".standard-comment").length;
                               $("#num-replies"+postID).text(count);
                           }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
          }
      });

     //submit comment of comment
     $('body').on("click", ".new-comment-o-comment-submit", function(e) {
           var postID = e.currentTarget.id;
           var content = $("#comment2Content"+postID).val();
           $(e.currentTarget).css("pointer-events", "none");
           if (content != ""){
            $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/AddComment2/',
                    contentType: "application/json; charset=utf-8",
                    data: {postID:postID, body:content},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                           if (temp != null){
                             if ( $('#replies'+postID).is(':empty')){
                                 var repliesNum = $('#replies'+postID).data('replycount');
                                 var updated = repliesNum+1;
                                 $('#replies'+postID).data('replycount', updated);
                                 $("#comment2Content"+postID).val('');
                                 $("#openReplies"+postID).css({ 'display': 'block'});
                                 $("#openReplies"+postID).show();
                                 $("#openReplies"+postID).text("View "+updated+" Replies");
                             }
                             else{
                                  makeNewCommentOfCommentsApplications(postID, temp[0].Image, temp[0].FirstName,temp[0].LastName, temp[0].Element.Content, temp[0].ElementID,temp[0].Element.TimeStamp);   
                                  var repliesNum = $('#replies'+postID).data('replycount');
                                  var updated = repliesNum+1;
                                  $('#replies'+postID).data('replycount', updated);
                                  $("#comment2Content"+postID).val('');
                             }
                            $(e.currentTarget).css("pointer-events", "auto"); 
                           }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
           }
      });

     $('body').on("click", ".deletePost", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("delete-btn",'');
          $(e.currentTarget).prop('disabled', true);
          var x = document.getElementsByClassName("wallPosts");
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:postID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           for (i=0; i < x.length; i++){
                               if (x[i].id.substring(4) == postID){
                                   if (i==0){
                                        $("#Post"+postID).next("hr").remove();
                                   }
                                   else if (i==x.length-1){
                                       $("#Post"+postID).prev("hr").remove();
                                   }
                                   else{
                                        $("#Post"+postID).next("hr").remove();
                                   }
                               }
                           }
                           $("#delete-modal"+postID).modal('toggle'); 
                           for (i=0; i<IDArray.length; i++){
                               if (postID == IDArray[i]){
                                   IDArray.splice(i, 1);
                               }
                           }
                           $("#Post"+postID).remove();
                           $(e.currentTarget).prop('disabled', false);
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
     });

     $('body').on("click", ".share-postSubmit", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("share-btn",'');
          var content = $("#shared-content"+postID).val();
          $(e.currentTarget).prop('disabled', true);
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/shareEntry/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:postID, content:content},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                          $(e.currentTarget).prop('disabled', false);
                          $("#share-modal"+postID).modal('toggle'); 
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
     });

      $('body').on("click", ".edit-postSubmit", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("edit-btn",'');
          var content = $("#content"+postID).val();
          $(e.currentTarget).prop('disabled', true);
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/editPost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:postID, content:content},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                              if (temp != null){
                                    $("#post-msg"+postID).text(content);
                                    $(e.currentTarget).prop('disabled', false);
                                    $("#edit-modal"+postID).modal('toggle'); 
                              }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
     });

     $('body').on("click", ".remove-comment", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("removeComment",'');
          e.preventDefault();
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:postID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           $("#comment-media"+postID).remove();
                           var temp = jqXHR.responseText;
                              if (temp != null){
                                    var newcount = $(".standard-comment").length;
                                    $("#num-replies"+temp).text(newcount);
                              }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);
                    }
            });
     });

     $('body').on("click", ".remove-comment-o-comment", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("removecomment2",'');
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:postID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                             $("#commentOComment-media"+postID).remove();
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
     });
    //wall scroll code
     /*function element_in_scroll(elem)
     {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
     }
    (function($, window, undefined) {
        var InfiniteScroll = function() {
            this.initialize = function() {
                this.setupEvents();
            };

            this.setupEvents = function() {
                $(window).on(
                    'scroll',
                    this.handleScroll.bind(this)
                );
            };

            this.handleScroll = function() {
                var scrollTop = $(document).scrollTop();
                var windowHeight = $(window).height();
                var height = $(document).height() - windowHeight;
                var scrollPercentage = (scrollTop / height);

                // if the scroll is more than 90% from the top, load more content.
                if(scrollPercentage > 0.95) {
                    this.doSomething();
                }
            }

            this.doSomething = function() {
                // Do something.
                // Load data or whatever.
                if ($('#prof-wall').hasClass("in")){
                    var postLen = $(".wallPosts").length;
                    if ($(".wallPosts").length > 0 && IDArray.length > 5){
                        var postArr=[];
                        console.log(IDArray.length);
                        for (i=(IDArray.length-postLen-1); i >= Math.max(0,(IDArray.length-postLen-3)); i--){
                            postArr.push(IDArray[i]);
                        }
                if (flag == 1){
                    flag=0;
                     $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/AjaxLoadEntryArr/',
                        contentType: "application/json; charset=utf-8",
                        data: {userID:userID, postIndex:JSON.stringify(postArr)},
                        success: function(data) {   
                        },complete: function (jqXHR,status) {
                             flag=1;
                             if(status == 'success' || status=='notmodified')
                             {
                                var temp = $.parseJSON(jqXHR.responseText);
                                if (temp != null){
                                    for (i=0; i < temp.length ; i++){
                                            if (temp[i].Element.Classification == 2){
                                                if (userID == temp[i].Element.PosterID || userID == pageID ){createSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );
                                                }
                                                else{createBasicSharedPost(temp[i].ReferenceElement.Image,temp[i].FirstName,temp[i].LastName,temp[i].ElementID,temp[i].Element.Content,temp[i].ReferenceElement.Element.Content,temp[i].ReferenceElement.FirstName,temp[i].ReferenceElement.LastName,temp[i].NumLikes, temp[i].NumReplies,temp[i].ReferenceElement.Element.TimeStamp, temp[i].Element.TimeStamp );

                                                }
                                            }
                                            else if (temp[i].Element.Classification == 0){
                                                 if (userID == temp[i].Element.PosterID || userID == pageID ){
                                                 makePostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                                 }
                                                else{
                                                     makeBasicPostApplications(temp[i].Image, temp[i].FirstName,temp[i].LastName,temp[i].Element.Content,temp[i].ElementID,temp[i].NumLikes, temp[i].NumReplies, temp[i].NumShares,temp[i].Element.TimeStamp);
                                                }
                                            }
                                            if ($(".wallPosts").length < IDArray.length) {
                                                $('#wall-dataF').append('<hr>');
                                            }
                                    }
                                    postArr=[];
                                }
                             }
                        },error: function(err) {
                            console.log('wall Load failed: ');
                            console.log(err);
                        }
                    });
                }
                }
            }
            }

            this.initialize();
        }

        $(document).ready(function() {// Initialize scroll
                new InfiniteScroll();
        });
    })(jQuery, window);*/

$(document).ready(function () {
    //modal box
    $('#menu-item-about').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(100);
        $("#box").text("About");
        $("#box").css('max-width', '30em');
    }, function () {
        $("#box").css('max-width', '0');
    });
    $('#menu-item-proj').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(100);
        $("#box").text("Projects");
        $("#box").css('max-width', '30em');
    }, function () {
        $("#box").css('max-width', '0');
    });
    $('#menu-item-link').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(100);
        $("#box").text("Links");
        $("#box").css('max-width', '30em');
    }, function () {
        $("#box").css('max-width', '0');
    });
    $('#menu-item-tags').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(100);
        $("#box").text("Tags");
        $("#box").css('max-width', '30em');
    }, function () {
        $("#box").css('max-width', '0');
    });
    $('#menu-item-message').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(100);
        $("#box").text("Message");
        $("#box").css('max-width', '30em');
    }, function () {
        $("#box").css('max-width', '0');
    });
    $("#leftNavProfile").addClass("theActive");
    $(".commentOfComment").css("display","none");
    $("img#head-image").on('error', function () {
        $(this).attr('src', "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
    });
    $('[data-toggle="tooltip"]').tooltip();

    var followstatus=document.getElementById("followstat").value;
    if(followstatus == "yes"){
         $('#btn1').attr('class', 'btn followButton following');
         $('#btn1').text('Following');
    }
    else{
        $('#btn1').attr('class', 'btn followButton');
        $('#btn1').text('Follow');
    } 
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

     $('#btn1').click(function(e) {
        console.log('follow clicked');
        $.ajax({
            type: 'GET',  
            url: 'http://ustart.today:'+port+'/callme/',
            contentType: "application/json; charset=utf-8",
            data: {userID:pageID, Following:followstatus,Pikachu:userID},
            success: function(data) {
                console.log(data);
                var totalFollowers = parseInt($('#num-followers').html());
                if ($('#btn1').hasClass('following')) {
                    console.log("Let's Unfollow");
                    //$.ajax(); Do Unfollow
                    $('#btn1').removeClass('following');
                    $('#btn1').removeClass('unfollow');
                    $('#btn1').text('Follow');
                    $('#num-followers').html(totalFollowers-1);
                    $("#followstat").val("no");
                    followstatus ="no";
                } else {
                    console.log("Let's follow");
                    // $.ajax(); Do Follow
                    $('#btn1').addClass('following');
                    $('#btn1').text('Following');
                    $('#num-followers').html(totalFollowers+1);
                    $("#followstat").val("yes");
                    followstatus ="yes";
                }
            },
            error: function(error) {
                console.log("It just doesn't work");
                console.log(error);
            }
        });
    });
    
    //$(window).resize(function() {
    //  fitDashboard();
    //});
    //fitDashboard();
});