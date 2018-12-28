 function makeDashPostApplications(postID, username, firstname, lastname, image, content, time, numLikes, numReplies, numShares, liked){
     var rule = '<hr />';
     var dashPostOuterDiv = $('<div></div>').addClass('feedPost').attr("id", postID);
     var dashPostHead = $('<div></div>').addClass('feedPostHead');
     var dashPostTitle = $('<div></div>').addClass('feedPostHeadTitle').text(firstname+" "+lastname);
     var dashPostImageOuterDiv = $('<div></div>').addClass('feedPostHeadIcon');
     var dashPostAnchor = $('<a></a>').attr('href', "/profile/"+username);
     var dashPostImage = $('<img></img>').attr('src', image);
     var dashPostTime = $('<div></div>').addClass('feedPostHeadTime').text(timeSince(time));
     dashPostAnchor.append(dashPostImage);
     dashPostImageOuterDiv.append(dashPostAnchor);
     dashPostHead.append(dashPostTitle,dashPostImageOuterDiv, dashPostTime);
     var dashPostContent = $('<div></div>').addClass('feedPostBody').text(readRuneArrayThatWorks(content));
     var dashPostCommentSection = $('<ul></ul>').addClass('comment-section');
     if (liked === true){
         if(numLikes > 1){
            dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/liked.png"></a><p class="mt-0" style="font-size:70%"><b>Jack Ryan</b> and '+parseInt(numLikes-1)+' others</p></span>'));
         }
         else if (numLikes == 1){
             dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/liked.png"></a><p class="mt-0" style="font-size:70%">'+numLikes+'</p></span>'));
         }
         else{
              dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/liked.png"></a><p class="mt-0" style="font-size:70%"></p></span>'));
         }
     }
     else{
          if(numLikes > 1){
            dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/like.png"></a><p class="mt-0" style="font-size:70%"><b>Jack Ryan</b> and '+parseInt(numLikes-1)+' others</p></span>'));
         }
         else if (numLikes == 1){
             dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/like.png"></a><p class="mt-0" style="font-size:70%">'+numLikes+'</p></span>'));
         }
         else{
              dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/like.png"></a><p class="mt-0" style="font-size:70%"></p></span>'));
         }
         
     }
     dashPostCommentSection.append([
            $('<li>').css("float","right").append([
            ($('<a>',{'class':'btn btn-sm share-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#share-modal'}).each(function(){
                $(this).attr({"id": $(this).attr("id").concat(postID),'data-target': $(this).attr("data-target").concat(postID)});
            }).append([$('<span>').append([
                $('<img>',{'class':'share-btn-ico'}).attr('src','/ustart_front/ico/not share.png'),
                $('<p>',{'class':'mt-0'}).each(function(){
                    $(this).text(numShares);
                })])

            ]))
            ]),
        $('<li>').css("float","right").append([
            ($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
                $(this).attr({"id": $(this).attr("id").concat(postID),'data-target': "#main-modal"+postID});
            })).append([$('<span>').append([
            ($('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no comment.png')),
            ($('<p>',{'class':'mt-0'}).attr('id','num-replies')).each(function(){
                $(this).text(numReplies).attr({"id": $(this).attr("id").concat(postID)});
            })])
            ])
            ])
	//li append ends

        ]) //ul append ends;
     dashPostOuterDiv.append(dashPostHead, rule, dashPostContent, rule, dashPostCommentSection)
     $('#dash-posts').append(dashPostOuterDiv);
     $('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(firstname.concat(' ').concat(lastname));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id").concat(postID)).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr({"id": $(this).attr("id").concat(postID)});
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comment-lists').each(function(){
							$(this).attr({"id": $(this).attr("id").concat(postID)});
						})
						])
					])
				])
			])
		]);	
     
     
     	$('#shareModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'share-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Share on Your Profile")
						]) , 
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([$('<img>',{'class':'media-object img-rounded'}).attr({'id':'share-img',"src":''}).each(function(){
								$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
							}) ]) ,
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(firstname.concat(' ').concat(lastname));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})

								]),
							$('<br>'),
							$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({'id':'shared-content','placeholder':'Say Something about that...'}).each(function(){
								$(this).attr({"id": $(this).attr("id").concat(postID)}).keydown(function(event){
									var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
									if (mac) {
										console.log('it is mac');
										//BrowserDetection();
										//OPERA
										if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
											if (event.keyCode == 17 && event.keyCode == 13){
												$(this).siblings('.share-postSubmit').click();  
												console.log("working FINE");                                                                                                        
											}
										}
										//FireFox
										if(typeof InstallTrigger !== 'undefined'){
											if (event.keyCode == 224 && event.keyCode == 13){
												$(this).siblings('.share-postSubmit').click();  
												console.log("working FINE");                                                                                                        
											}											

										}
										//Safari
										if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))){
											if (event.keyCode == 91 || event.keyCode == 93 && event.keyCode == 13){
												$(this).siblings('.share-postSubmit').click();  
												console.log("working FINE");                                                                                                        
											}  
										}
										//IE
										if(/*@cc_on!@*/false || !!document.documentMode){
											if (event.ctrlKey && event.keyCode == 13){
												$(this).siblings('.share-postSubmit').click();	
												console.log("working FINE");																										
											}
										}
										/*
										//Edge
										if(!isIE && !!window.StyleMedia){

										}
										*/
										//Chrome
										if(!!window.chrome && !!window.chrome.webstore){
											if (event.keyCode == 91 || event.keyCode == 93 && event.keyCode == 13){
												$(this).siblings('.share-postSubmit').click();  
												console.log("working FINE");                                                                                                        
											}  
										}



									}
									//NOT mac
									else{
										if (event.ctrlKey && event.keyCode == 13){
											$(this).siblings('.share-postSubmit').click();	
											console.log("working FINE");																										
										}
									}
								});
							}))
							])
						]) ,
					$('<div>',{'class':'modal-footer'}).append([
						$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text('Post').each(function(){
							$(this).attr({"id": $(this).attr("id").concat(postID)}); 
						})
						])
					])
				])
			])
		]);
 }


   //render comments
     $('body').on("click", ".comment-btn", function(e) {
          var postID = e.currentTarget.id;
         console.log(postID);
           $(e.currentTarget).prop('disabled', true);
           $("#main-modal"+postID).modal();
          $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/AjaxLoadComments/',
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
           var likepostID = $(this).closest('.feedPost').attr('id');
           $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/Like/',
                    contentType: "application/json; charset=utf-8",
                    data: {PostID:likepostID},
                    success: function(data) {
                       var likeBtnImg = $(e.currentTarget).find('img');
                       if (likeBtnImg.attr('src') === "/ustart_front/ico/like.png") {
                         likeBtnImg.attr('src', "/ustart_front/ico/liked.png");
                       } else {
                         likeBtnImg.attr('src', "/ustart_front/ico/like.png");
                       }
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
                    url: 'https://ustart.today:'+port+'/getComments/',
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
                        url: 'https://ustart.today:'+port+'/addPost/',
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
           $("#commentContent"+postID).val('');
           $(e.currentTarget).css("pointer-events", "none");
          if (content != ""){
            $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/AddComment2/',
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
                               var count = $(".standard-comment").length;
                               $("#num-replies"+postID).text(count);
                           }
                           $(e.currentTarget).css("pointer-events", "auto"); 
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
           $("#comment2Content"+postID).val('');
           $(e.currentTarget).css("pointer-events", "none");
           if (content != ""){
            $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/AddComment2/',
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
                           }
                         }
                    },error: function(err) {
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
           }
      });



     $('body').on("click", ".share-postSubmit", function(e) {
          var temp = e.currentTarget.id;
          var postID = temp.replace("share-btn",'');
          var content = $("#shared-content"+postID).val();
          $(e.currentTarget).prop('disabled', true);
          $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/shareEntry/',
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


     $('body').on("click", ".remove-comment", function(e) {
          var temp = e.currentTarget.id;
          var tempID = temp.replace("removeComment",'');
          e.preventDefault();
          $(e.currentTarget).css("pointer-events", "none");
           $(this).prop('disabled', true);
           $(this).unbind( "click" );
          $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/deletePost/',
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
           $(this).prop('disabled', true);
           $(this).unbind( "click" );
          $.ajax({
                    type: 'GET',
                    url: 'https://ustart.today:'+port+'/deletePost/',
                    contentType: "application/json; charset=utf-8",
                    data: {postid:tempID},
                    success: function(data) {
                    },complete: function (jqXHR,status) {
                         if(status == 'success' || status=='notmodified')
                         {
                             //CHANGE FROM tempID
                             $("#commentOCommnet-media"+tempID).remove();
                              $(e.currentTarget).css("pointer-events", "auto");
                                    $(this).prop('disabled', false);
                                    $(this).bind( "click" );
                         }
                    },error: function(err) {
                        //here problem
                        console.log('comment Load failed: ');
                        console.log(err);

                    }
            });
     });

 $.ajax({
    type: 'GET',
    url: 'https://ustart.today:'+port+'/AjaxDash/',
    contentType: "application/json; charset=utf-8",
    data: {},
    success: function(data) {
    },complete: function (jqXHR,status) {
        if(status == 'success' || status=='notmodified')
        {
        var temp = $.parseJSON(jqXHR.responseText);
            dashTotalHits=temp.TotalHits;
            dashScrollID = temp.ScrollID;
            if (temp != null){
                for (i=0; i < temp.JournalEntries.length; i++){
                    if (temp.JournalEntries[i].Element.Classification == 0){
                    makeDashPostApplications(temp.JournalEntries[i].ElementID, temp.JournalEntries[i].Username,temp.JournalEntries[i].FirstName, temp.JournalEntries[i].LastName, temp.JournalEntries[i].Image, temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].Element.TimeStamp, temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares, temp.JournalEntries[i].Liked );
                    }
                }
            }
        }
    }
    ,error: function(err) {
        console.log('chat initial chat failed: ');
        console.log(err);
    }
});

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
            console.log(dashTotalHits);
          if (dashflag == 1){
                 dashflag=0;
                 if ( $('.feedPost').length < dashTotalHits){
                     console.log("here2")
                     $.ajax({
                        type: 'GET',
                        url: 'https://ustart.today:'+port+'/AjaxDash/',
                        contentType: "application/json; charset=utf-8",
                        data: {scrollID: dashScrollID},
                        success: function(data) {  
                        },complete: function (jqXHR,status) {
                             dashflag=1;
                             if(status == 'success' || status=='notmodified')
                             {
                                var temp = $.parseJSON(jqXHR.responseText);
                                if(temp != null){
                                      for (i=0; i < temp.JournalEntries.length; i++){
                                          if (temp.JournalEntries[i].Element.Classification == 0){
                                            makeDashPostApplications(temp.JournalEntries[i].ElementID, temp.JournalEntries[i].Username,temp.JournalEntries[i].FirstName, temp.JournalEntries[i].LastName, temp.JournalEntries[i].Image, temp.JournalEntries[i].Element.Content,temp.JournalEntries[i].Element.TimeStamp, temp.JournalEntries[i].NumLikes, temp.JournalEntries[i].NumReplies, temp.JournalEntries[i].NumShares,temp.JournalEntries[i].Liked);
                                          }
                                        }
                                }
                             }
                        },error: function(err) {
                            console.log('chat Load failed: ');
                            console.log(err);
                        }
                    });
                }
               else dashflag=1;  


         }
        }

        this.initialize();
    }

    $(document).ready(function() {// Initialize scroll
            new InfiniteScroll();
    });
})(jQuery, window);