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
                               if (temp != null){
                                    console.log(temp.length);
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