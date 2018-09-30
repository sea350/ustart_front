 $(document).ready(function() {
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
                    data: {userID:userID, scrollID:""},
                    success: function(data) {  
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                            var tem = $.parseJSON(jqXHR.responseText);
                            if (tem.JournalEntries!= null){
                                console.log(tem);
                                scrollID = tem.ScrollID;
                                totalHits = tem.TotalHits;
                                $('#wall-dataF').empty();
                                $('#shareModals').empty();
                                $('#editModals').empty();
                                $('#deleteModals').empty();
                                $('#commentModals').empty();
                                for (i=0; i <tem.JournalEntries.length; i++){
                                    if (doc == tem.JournalEntries[i].Element.PosterID){
                                        if (tem.JournalEntries[i].Element.Classification == 2){
                                         if (tem.JournalEntries[i].ReferenceElement != null){createSharedPost(tem.JournalEntries[i].Image,tem.JournalEntries[i].ReferenceElement.Image,tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].Element.Content,tem.JournalEntries[i].ReferenceElement.Element.Content,tem.JournalEntries[i].ReferenceElement.FirstName,tem.JournalEntries[i].ReferenceElement.LastName,tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies,tem.JournalEntries[i].ReferenceElement.Element.TimeStamp, tem.JournalEntries[i].Element.TimeStamp); 
                                         }
                                        else{
                                            createSharedPost(tem.JournalEntries[i].Image,"",tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].Element.Content,0,"","",tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies,"", tem.JournalEntries[i].Element.TimeStamp)   
                                        }
                                        }
                                        else if (tem.JournalEntries[i].Element.Classification == 0){
                                             makePostApplications(tem.JournalEntries[i].Image, tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].Element.Content,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies, tem.JournalEntries[i].NumShares,tem.JournalEntries[i].Element.TimeStamp);
                                        }
                                    }
                                    else{
                                        if (tem.JournalEntries[i].Element.Classification == 2){
                                           if (tem.JournalEntries[i].ReferenceElement != null){ createBasicSharedPost(tem.JournalEntries[i].Image,tem.JournalEntries[i].ReferenceElement.Image,tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].Element.Content,tem.JournalEntries[i].ReferenceElement.Element.Content,tem.JournalEntries[i].ReferenceElement.FirstName,tem.JournalEntries[i].ReferenceElement.LastName,tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies,tem.JournalEntries[i].ReferenceElement.Element.TimeStamp, tem.JournalEntries[i].Element.TimeStamp );
                                            }
                                            else{
                                             createBasicSharedPost(tem.JournalEntries[i].Image,"",tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].Element.Content,0,"","",tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies,"", tem.JournalEntries[i].Element.TimeStamp );
                                            }
                                        }
                                        else if (tem.JournalEntries[i].Element.Classification == 0) {
                                             makeBasicPostApplications(tem.JournalEntries[i].Image, tem.JournalEntries[i].FirstName,tem.JournalEntries[i].LastName,tem.JournalEntries[i].Element.Content,tem.JournalEntries[i].ElementID,tem.JournalEntries[i].NumLikes, tem.JournalEntries[i].NumReplies, tem.JournalEntries[i].NumShares,tem.JournalEntries[i].Element.TimeStamp);
                                        }
                                    }
                                    var likeBtnImg =  $("#like-btn"+tem.JournalEntries[i].ElementID).find('img');
                                    if (tem.JournalEntries[i].Liked === true){
                                        likeBtnImg.attr('src', "/ustart_front/ico/liked.png");      
                                    }
                                    else{
                                        likeBtnImg.attr('src', "/ustart_front/ico/like.png");  
                                    }
                                    if ($(".wallPosts").length < tem.JournalEntries.length) {
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
     //render comments
     $('body').on("click", ".comment-btn", function(e) {
          var postID = e.currentTarget.id;
           $(e.currentTarget).prop('disabled', true);
           $("#main-modal"+postID).modal();
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
                            console.log(temp);
                            if (temp != null){
                                 $('#comment-lists'+postID).empty();
                                 for (i=temp.length-1; i >= 0; i--){
                                     if (doc == temp[i].Element.PosterID){
                                        makeCommentApplications(postID, temp[i].Image, temp[i].FirstName, temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].NumReplies,temp[i].Element.TimeStamp);
                                     }
                                     else{
                                         
                                        makeBasicCommentApplications(postID, temp[i].Image, temp[i].FirstName, temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].NumReplies,temp[i].Element.TimeStamp);
                                     }
                                 }
                            }
                            else{
                                $('#comment-lists'+postID).empty();
                            }
                            $(e.currentTarget).prop('disabled', false);
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);
                        $(e.currentTarget).prop('disabled', false);
                    }
        });  
     });

    //like-button
     $('body').on("click", "a.like-btn", function(e) {
          $(e.currentTarget).prop('disabled', true);
          var temp = e.currentTarget.id;
          var likepostID = temp.replace("like-btn",'');
           $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/Like/',
                    contentType: "application/json; charset=utf-8",
                    data: {PostID:likepostID},
                    success: function(data) {
                       var likeBtnImg = $(e.currentTarget).find('img');
                       console.log(likeBtnImg);
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

     //render comment of comments
       $('body').on("click", ".view-replies", function(e) {
           var postValue =  e.currentTarget.getAttribute('myvalue');
            $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/getComments/',
                    contentType: "application/json; charset=utf-8",
                    data: {PostID:postValue},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                           if (temp != null){
                              $('#replies'+postValue).empty();
                               $(e.currentTarget).hide();
                               for (i=temp.length-1; i >= 0; i--){
                                   if (doc == temp[i].Element.PosterID ){
                                        makeCommentOfCommentsApplications(postValue, temp[i].Image, temp[i].FirstName,temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].Element.TimeStamp);
                                   }
                                   else{
                                        makeBasicCommentOfCommentsApplications(postValue, temp[i].Image, temp[i].FirstName,temp[i].LastName, temp[i].Element.Content, temp[i].ElementID,temp[i].Element.TimeStamp);
                                   }
                               }
                           }
                           else{
                               $('#replies'+postValue).empty();
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
           $('#new-postSubmit').prop('disabled', true);
           var content = $("#post-msg").val();
           if (content != ""){
                $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/addPost/',
                        contentType: "application/json; charset=utf-8",
                        data: {text:content},
                        success: function(data) {
                        },complete: function (jqXHR,status) {
                             if(status == 'success' || status=='notmodified')
                             {
                               var temp = $.parseJSON(jqXHR.responseText);
                              console.log(temp);
                               if (temp != null){
                                    if ($(".wallPosts").length >= 1){
                                        $('#wall-dataF').prepend('<hr>');  
                                    }
                                    makeNewPostApplications(temp.Image, temp.FirstName,temp.LastName,temp.Element.Content,temp.ElementID,temp.NumLikes, temp.NumReplies, temp.NumShares,temp.Element.TimeStamp);
                               }
                               $("#post-msg").val('');
                               $('#new-postSubmit').prop('disabled', false);
                               $('#textarea_counter').html('5000 characters remaining.');
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
           $(e.currentTarget).unbind("click");
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
                               console.log(temp);
                               makeNewCommentApplications(postID, temp[0].Image, temp[0].FirstName, temp[0].LastName, temp[0].Element.Content, temp[0].ElementID,temp[0].NumReplies,temp[0].Element.TimeStamp);
                               $("#commentContent"+postID).val('');
                               var count = $(".standard-comment").length;
                               $("#num-replies"+postID).text(count);
                           }
                           $(e.currentTarget).css("pointer-events", "auto"); 
                           $(e.currentTarget).bind("click");
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
           $(e.currentTarget).unbind("click");
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
                                 var repliesNum = $('#replies'+postID).attr('data-replycount');
                                 var updated = parseInt(repliesNum)+1;
                                 $('#replies'+postID).attr('data-replycount', updated);
                                 $("#comment2Content"+postID).val('');
                                 $("#openReplies"+postID).css({ 'display': 'block'});
                                 $("#openReplies"+postID).show();
                                 $("#openReplies"+postID).text("View "+updated+" Replies");
                             }
                             else{
                                makeNewCommentOfCommentsApplications(postID, temp[0].Image, temp[0].FirstName,temp[0].LastName, temp[0].Element.Content, temp[0].ElementID,temp[0].Element.TimeStamp);   
                                  var repliesNum = $('#replies'+postID).attr('data-replycount');
                                  var updated = parseInt(repliesNum)+1;
                                  $('#replies'+postID).attr('data-replycount', updated);
                                  $("#comment2Content"+postID).val('');
                             }
                            $(e.currentTarget).css("pointer-events", "auto"); 
                            $(e.currentTarget).bind("click");
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
//
      $('body').on("click", ".edit-postSubmit", function(e) {
          var temp = e.currentTarget.id;
          var tempID = temp.replace("edit-btn",'');
          var content = $("#content"+tempID).val();
          $(e.currentTarget).prop('disabled', true);
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/editPost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:tempID, content:content},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                           var temp = $.parseJSON(jqXHR.responseText);
                              if (temp != null){
                                    console.log(temp);
                                    $("#post-msg"+tempID).text(content);
                                    $(e.currentTarget).prop('disabled', false);
                                    $("#edit-modal"+tempID).modal('toggle'); 
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
          var tempID = temp.replace("removeComment",'');
          e.preventDefault();
          $(e.currentTarget).css("pointer-events", "none");
           $(this).prop('disabled', true);
           $(this).unbind( "click" );
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    //CHANGE FROM postid
                    data: {postid:tempID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                             //tempID --> postID
                           $("#comment-media"+tempID).remove();
                           var temp = jqXHR.responseText;
                              if (temp != null){
                                    var newcount = $(".standard-comment").length;
                                    $("#num-replies"+temp).text(newcount);
                                   $(e.currentTarget).css("pointer-events", "auto");
                                    $(this).prop('disabled', false);
                                    $(this).bind( "click" );
                              }
                         }
                    },error: function(err) {
                        //here error
                        console.log('comment Load failed: ');
                        console.log(err);
                    }
            });
     });

     $('body').on("click", ".remove-comment-o-comment", function(e) {
          var temp = e.currentTarget.id;
          var tempID = temp.replace("removecomment2",'');
           e.preventDefault();
          $(e.currentTarget).css("pointer-events", "none");
          $(e.currentTarget).prop('disabled', true);
          $.ajax({
                    type: 'GET',
                    url: 'http://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:tempID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                             //CHANGE FROM tempID
                             $("#commentOCommnet-media"+tempID).remove();
                              $(e.currentTarget).css("pointer-events", "auto");
                        $(e.currentTarget).prop('disabled', false);
                         }
                    },error: function(err) {
                        //here problem
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
                if ($('#prof-wall').hasClass("in")){
                        if (flag == 1){
                            flag=0;
                             if ($(".wallPosts").length < totalHits){
                             $.ajax({
                                type: 'GET',
                                url: 'http://ustart.today:'+port+'/ajaxUserEntries/',
                                contentType: "application/json; charset=utf-8",
                                data: {userID:userID, scrollID: scrollID},
                                success: function(data) {   
                                },complete: function (jqXHR,status) {
                                     flag=1;
                                     if(status == 'success' || status=='notmodified')
                                     {
                                        var temp = $.parseJSON(jqXHR.responseText);
                                        if (temp.JournalEntries != null){
                                            totalHits = temp.TotalHits;
                                            console.log("loading more....");
                                            for (i=0; i < temp.JournalEntries.length ; i++){       
                                                    if (temp.JournalEntries[i].Element.Classification == 2){
                                                        if (doc == temp.JournalEntries[i].Element.PosterID ){
                                                            if (temp.JournalEntries[i].ReferenceElement !=null){
                                                            createSharedPost(temp.JournalEntries[i].Image, temp.JournalEntries[i].ReferenceElement.Image,temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );
                                                            }
                                                            else{
                                                                createSharedPost(temp.JournalEntries[i].Image, "",temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,0,"","",temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,"", temp.JournalEntries[i].Element.TimeStamp );
                                                            }
                                                        }
                                                        else{
                                                            if (temp.JournalEntries[i].ReferenceElement !=null){ createBasicSharedPost(temp.JournalEntries[i].Image,temp.JournalEntries[i].ReferenceElement.Image,temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].ReferenceElement.Element.Content,temp.JournalEntries[i].ReferenceElement.FirstName,temp.JournalEntries[i].ReferenceElement.LastName,temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,temp.JournalEntries[i].ReferenceElement.Element.TimeStamp, temp.JournalEntries[i].Element.TimeStamp );
                                                            }
                                                            else{
                                                                createBasicSharedPost(temp.JournalEntries[i].Image,"",temp.JournalEntries[i].FirstName,temp.JournalEntries[i].LastName,temp.JournalEntries[i].ElementID,temp.JournalEntries[i].Element.Content,0,"","",temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies,"", temp.JournalEntries[i].Element.TimeStamp );
                                                            }
                                                        }
                                                    }
                                                    else if (temp.JournalEntries[i].Element.Classification == 0){
                                                         if (doc == temp.JournalEntries[i].Element.PosterID ){
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
                                                    if ($(".wallPosts").length < totalHits) {
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