 function makeDashPostApplications(postID, username, firstname, lastname, image, content, time, numLikes, numReplies, numShares){
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
     if(numLikes > 0){
        dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/like.png"></a><p class="mt-0" style="font-size:70%"><b>Jack Ryan</b> and '+numLikes+' others</p></span>'));
     }
     else{
          dashPostCommentSection.append($('<li>').append('<span><a class="btn btn-sm like-btn"><img class="like-btn-ico" src="/ustart_front/ico/like.png"></a><p class="mt-0" style="font-size:70%"></p></span>'));
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