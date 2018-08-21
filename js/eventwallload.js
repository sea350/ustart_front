$(document).ready(function() {
    $('body').on("click", "#Wall-event-loadAJAX", function(e) {
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
                    url: 'http://ustart.today:'+port+'/AjaxLoadEventEntries/',
                    contentType: "application/json; charset=utf-8",
                    data: {userID:pageID, scrollID:""},
                    success: function(data) {  
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                            var temp = $.parseJSON(jqXHR.responseText);
                            if (temp.JournalEntries!= null){
                                eventscrollID = temp.ScrollID;
                                maxHits = temp.TotalHits;
                                $('#wall-dataF').empty();
                                $('#shareModals').empty();
                                $('#editModals').empty();
                                $('#deleteModals').empty();
                                $('#commentModals').empty();
                                for (i=0; i < temp.JournalEntries.length; i++){
                                     if ((permission != -1 || (permission == 1) || (permission ==0))){
                                        if (temp.JournalEntries[i].Element.Classification == 5){
                                           console.log("rendering share post"); createSharedPost(temp.JournalEntries[i].Image, temp.JournalEntries[i].ReferenceElement.Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );
                                        }
                                        else if (temp.JournalEntries[i].Element.Classification == 3){
                                             makePostApplications(temp.JournalEntries[i].Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares,temp.JournalEntries[i].Element.TimeStamp);
                                        }
                                    }
                                    else{
                                        if (temp.JournalEntries[i].Element.Classification == 5){
                                           console.log("rendering share post"); createBasicSharedPost(temp.JournalEntries[i].Image,temp.JournalEntries[i].ReferenceElement.Image,temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );
                                        }
                                        else if (temp.JournalEntries[i].Element.Classification == 3) {
                                             makeBasicPostApplications(temp.JournalEntries[i].Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares,temp.JournalEntries[i].Element.TimeStamp);
                                        }
                                    }
                                        var likeBtnImg =  $("#like-btn"+temp.JournalEntries[i].ElementID).find('img');
                                        if (temp.JournalEntries[i].Liked === true){
                                            likeBtnImg.attr('src', "/ustart_front/ico/liked.png");      
                                        }
                                        else{
                                            likeBtnImg.attr('src', "/ustart_front/ico/like.png");  
                                        }
                                     if ($(".wallPosts").length < temp.JournalEntries.length) {
                                        $('#wall-dataF').append('<hr>');
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
         
    });
    
      //like post
        $('body').on("click", "a.like-btn", function(e) {
               $(e.currentTarget).prop('disabled', true);
              var temp = e.currentTarget.id;
              var postID = temp.replace("like-btn",'');
               $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/Like/',
                        contentType: "application/json; charset=utf-8",
                        data: {PostID:postID},
                        success: function(data) {
                           var likeBtnImg = $(e.currentTarget).find('img');
                           if (likeBtnImg.attr('src') === "/ustart_front/ico/like.png") {
                             likeBtnImg.attr('src', "/ustart_front/ico/liked.png");
                           } else {
                             likeBtnImg.attr('src', "/ustart_front/ico/like.png");
                           }
                           $(e.currentTarget).find('p').text(data);
                           $(e.currentTarget).prop('disabled', false);
                        },error: function(err) {
                            console.log('comment Load failed: ');
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
                                 console.log(temp);
                                 $('#comments-list'+postID).empty();
                                 for (i=temp.length-1; i >= 0; i--){
                                      if ((permission != -1 || (permission == 1) || (permission ==0))){
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
                    data: {PostID:postID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                           if (temp != null){
                              $('#replies'+postID).empty();
                               $(e.currentTarget).hide();
                               for (i=temp.length-1; i >= 0; i--){
                                   if ((permission != -1 || (permission == 1) || (permission ==0))){
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
    
     //submit new post
      $('body').on("click", "#new-postSubmit", function(e) {
           var content = $("#post-msg").val();
           $('#new-postSubmit').prop('disabled', true);
           if (content != ""){
                $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/EventMakeEntry/',
                        contentType: "application/json; charset=utf-8",
                        data: {docID:pageID, text:content},
                        success: function(data) {
                        },complete: function (jqXHR,status) {
                             if(status == 'success' || status=='notmodified')
                             {
                               var temp = $.parseJSON(jqXHR.responseText);
                               if (temp != null){
                                    if ($(".wallPosts").length >= 1){
                                        $('#wall-dataF').prepend('<hr>');  
                                    }
                                    IDArray.push(temp.ElementID);
                                    makeNewPostApplications(temp.Image, temp.FirstName,temp.LastName,temp.Element.Content,temp.ElementID,temp.NumLikes, temp.NumReplies, temp.NumShares,temp.Element.TimeStamp);
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
                    url: 'http://ustart.today:'+port+'/AjaxDeleteEventEntry/',
                    contentType: "application/json; charset=utf-8",
                    data: {eventID:pageID, entryID:postID},
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
                                   console.log(temp);
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
     function element_in_scroll(elem)
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
                if (flag == 1){
                    flag=0;
                     if ($(".wallPosts").length < maxHits){
                     $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/AjaxLoadEventEntries/',
                        contentType: "application/json; charset=utf-8",
                        data: {userID:pageID, scrollID: eventscrollID},
                        success: function(data) {   
                        },complete: function (jqXHR,status) {
                             flag=1;
                             if(status == 'success' || status=='notmodified')
                             {
                                var temp = $.parseJSON(jqXHR.responseText);
                                  if (temp.JournalEntries!= null){
                                    eventscrollID = temp.ScrollID;
                                    maxHits = temp.TotalHits;
                                    console.log(permission);
                                    for (i=0; i < temp.JournalEntries.length ; i++){
                                            if (temp.JournalEntries[i].Element.Classification == 5){
                                               if ((permission != -1 || (permission == 1) || (permission ==0))){createSharedPost(temp.JournalEntries[i].Image, temp.JournalEntries[i].ReferenceElement.Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );}
                                                else{
                                                    createBasicSharedPost(temp.JournalEntries[i].Image,temp.JournalEntries[i].ReferenceElement.Image,temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );
                                                }
                                            }
                                            else if (temp.JournalEntries[i].Element.Classification == 3){
                                                 if ((permission != -1 || (permission == 1) || (permission ==0))){
                                                 makePostApplications(temp.JournalEntries[i].Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares,temp.JournalEntries[i].Element.TimeStamp);
                                                 }
                                                else{
                                                    makeBasicPostApplications(temp.JournalEntries[i].Image, temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares,temp.JournalEntries[i].Element.TimeStamp);
                                                }
                                            }
                                            var likeBtnImg =  $("#like-btn"+temp.JournalEntries[i].ElementID).find('img');
                                            if (temp.JournalEntries[i].Liked === true){
                                                likeBtnImg.attr('src', "/ustart_front/ico/liked.png");      
                                            }
                                            else{
                                                likeBtnImg.attr('src', "/ustart_front/ico/like.png");  
                                            }
                                            if ($(".wallPosts").length < maxHits) {
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
                    else flag=1; 
                }
                
            }
            }
    
            this.initialize();
        }
    
        $(document).ready(function() {// Initialize scroll
                new InfiniteScroll();
        });
    })(jQuery, window);