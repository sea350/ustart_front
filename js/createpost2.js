
//var data = $('.commentOfComment').data('replycount');

function makePostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares ,time){

	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr("id", $(this).attr("id").concat(elementID));
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>', {'class':'pull-left'}).append([$('<img>', {'class':'media-object img-rounded'}).attr({'id': 'img','src':''}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
		}) ]),
		$('<div/>', {'class':'dropdown pull-right'}).append([
			$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown')
			.append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append(
				
				$('<a>', {'class':'dropdown-item editEntry edit-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
					$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Edit'))),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry delete-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Delete'))),
			]),
		]),
		$('<div/>', {'class':'media-body'}).append([
			$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
				$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).html(readRuneArrayThatWorks(content)).attr({"id": $(this).attr("id").concat(elementID)}); 
		}) ]),
		$('<ul>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(elementID)});
			})).append([$('<span>').append([
				$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
				$('<p>',{'class':'mt-0'}).each(function(){
					$(this).text(numLikes);
				})])
			
			])
			]),
			$('<li>').append([
				($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': "#main-modal"+elementID});
				})).append([$('<span>').append([
				($('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no comment.png')),
				($('<p>',{'class':'mt-0'}).attr('id','num-replies')).each(function(){
					$(this).text(numReplies).attr({"id": $(this).attr("id").concat(elementID)});
				})])
				])

				]),
			$('<li>').append([
				($('<a>',{'class':'btn btn-sm share-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#share-modal'}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': $(this).attr("data-target").concat(elementID)});
				}).append([$('<span>').append([
					$('<img>',{'class':'share-btn-ico'}).attr('src','/ustart_front/ico/not share.png'),
					$('<p>',{'class':'mt-0'}).each(function(){
						$(this).text(numShares);
					})])

				]))
				])	//li append ends

			]) //ul append ends
		])
	])
		]);

	$('#shareModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'share-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'data-dismiss':'modal','type':'button'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Share on Your Profile")
						]),
						//HERE TO WORK FIRST
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"share-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})
								])

								]),
						$('<br>'),$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({"name":"content","id":"shared-content","placeholder":"Say Something about this..."}).each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID)}).keydown(function(event){
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
									if(!!document.documentMode){
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
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text("Post").each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)}); 

								



							})
							])


					])
				])
			])
		])
		

	$('#editModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'data-dismiss':'modal','type':'button'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Edit Post")
						]),
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"edit-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr({"id": $(this).attr("id").concat(elementID)});
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'})
				 .append([
				$('<div>',{'class':'modal-header'}).append([
					$('<span>').text("Confirm Deletion")
					]),
				$('<div>',{'class':'modal-body'}).append([
					$('<span>').text("Are you sure you want to delete this post?")
					]),
				$('<div>',{'class':'modal-footer'}).append([
					$('<button>',{'class':'btn btn-danger btn-ok deletePost'}).attr({'id':'delete-btn','type':'submit'}).text("Delete").each(function(){
						$(this).attr({"id": $(this).attr("id").concat(elementID)});
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);
	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID)).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comment-lists').each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID)});
						})
						])
					])
				])
			])
		]);	
}


function makeBasicPostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares,time){
	$('#wall-dataF').prepend([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"share-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
		$('<div/>', {'class':'media-body'}).append([$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).attr("id", $(this).attr("id").concat(elementID)).text(readRuneArrayThatWorks(content));
		}) ]),
		$('<ul/>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(elementID)});
			})).append([$('<span>').append([
			$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
			$('<p>',{'class':'mt-0'}).each(function(){
				$(this).text(numLikes);
			})
			])
			])
			]),
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': $(this).attr("data-target").concat(elementID)});

			})).append([$('<span>').append([
			$('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no-comment.png'),
			$('<p>',{'class':'mt-0'}).each(function(){
				$(this).text(numReplies);
			})
			])
			])
			]),
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm share-btn'}).attr({'data-toggle':'modal','data-target':'#share-modal'}).each(function(){
				$(this).attr({"data-target": $(this).attr("data-target").concat(elementID)});
			})) .append([$('<span>').append([
				$('<img>',{'class':'share-btn-ico'}).attr('src','/ustart_front/ico/not share.png'),
				$('<p>',{'class':'mt-0'}).each(function(){
					$(this).text(numShares);
				})
				]) ])

			])	//li ends
		]) //ul ends
	])
		])
		]);
	$('#shareModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'share-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
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
								$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
							}) ]) ,
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})

								]),
							$('<br>'),
							$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({'id':'shared-content','placeholder':'Say Something about that...'}).each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)}).keydown(function(event){
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
							$(this).attr({"id": $(this).attr("id").concat(elementID)}); 
						})
						])
					])
				])
			])
		]);
	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID)).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comment-lists').each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID)});
						})
						])
					])
				])
			])
		]);			

}
/* makeBasicPostApplications */

//NEEDS TO WORK ON THIS FUNCTION//
// makeNewPostApplications
function makeNewPostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares ,time){
	$('#wall-dataF').prepend([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>', {'class':'pull-left'}).append([$('<img>', {'class':'media-object img-rounded'}).attr({'id': 'img', 'src':''}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
		}) ]) ,
		$('<div/>', {'class':'dropdown pull-right'}).append([
			$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown').append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append(
				//hereModify
				$('<a>', {'class':'dropdown-item editEntry edit-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
					$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Edit'))),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry delete-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Delete'))),
			]),
		]),
		$('<div/>', {'class':'media-body'}).append([
			$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
				$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).attr("id", $(this).attr("id").concat(elementID)).text(readRuneArrayThatWorks(content));
		}) ]),
		$('<ul/>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn', 'data-toggle':'modal'}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(elementID)});
			})).append([$('<span>').append([
			$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
			$('<p>',{'class':'mt-0'}).each(function(){
				$(this).text(numLikes);
			})
			])
			]),
			$('<li>').append([
				($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': $(this).attr("data-target").concat(elementID)});
				})).append([$('<span>').append([
				($('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no-comment.png')),
				($('<p>',{'class':'mt-0'}).attr('id','num-replies')).each(function(){
					$(this).attr("id",$(this).attr("id").concat(elementID)).text(numReplies);
				})
				])
				])
				]),
			$('<li>').append([
				($('<a>',{'class':'btn btn-sm share-btn'}).attr({'id':'', 'data-toggle':'modal','data-target':'#share-modal'}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': $(this).attr("data-target").concat(elementID)});
				}).append([$('<span>').append([
					$('<img>',{'class':'share-btn-ico'}).attr('src','/ustart_front/ico/not share.png'),
					$('<p>',{'class':'mt-0'}).each(function(){
						$(this).text(numShares);
					})])

				]))
				]) //li ends	
			]) //ul ends
		])
	])
		])
		]);

	$('#shareModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'share-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'data-dismiss':'modal','type':'button'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Share on Your Profile")
						]),
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"share-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})
								])

								]),
						$('<br>'),$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({"name":"content","id":"shared-content","placeholder":"Say Something about this..."}).each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID)});
						}))
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text("Post").each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							})
							])

					])
				])
			])
		]);

	$('#editModals').append([
		//changeMade
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'data-dismiss':'modal','type':'button'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Edit Post")
						]),
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"edit-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr({'id':$(this).attr('id').concat(elementID)});
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'})
				 .append([
				$('<div>',{'class':'modal-header'}).append([
					$('<span>').text("Confirm Deletion")
					]),
				$('<div>',{'class':'modal-body'}).append([
					$('<span>').text("Are you sure you want to delete this post?")
					]),
				$('<div>',{'class':'modal-footer'}).append([
					$('<button>',{'class':'btn btn-danger btn-ok deletePost'}).attr({'id':'delete-btn','type':'submit'}).text("Delete").each(function(){
						$(this).attr({"id": $(this).attr("id").concat(elementID)});
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);

	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr("id",$(this).attr("id").concat(elementID));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)}).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr({"id": $(this).attr("id").concat(elementID)});
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comment-lists').each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID)});
						})
						])
					])
				])
			])
		]);	
}

//UNTIL HERE
////FIRST COMMENT
function makeCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comment-lists'+parentID)
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'remove-comment'}).attr('id','removeComment').each(function(){
					$(this).attr({"id": $(this).attr("id").concat(postID)}).text("Remove");
				})
				)
			]),
		$('<p>').append([
			$('<small>').append(
				//data-replycount
				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''+postID,'data-replycount':numReplies}).each(function(){
					$(this).attr({"id":$(this).attr("id").concat(postID)})
					if(numReplies <= 0)
					$(this).hide();
				//}else{
					//$(this).attr({"id": $(this).attr("id").concat(postID),'myvalue': $(this).attr("myvalue").concat(postID)}).text("view ".concat(numReplies).concat(" Replies"));
					$(this).text("view ".concat(numReplies).concat(" Replies"));
			//}
			}
			)
				)
			]),
		
			//var data = $('.commentOfComment').data('replycount');
			//'data-replycount':numReplies
		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':numReplies}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID)});
		}) ,
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id").concat(postID)).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(postID)});
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}
function makeBasicCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comment-lists'+parentID)
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				//changeNOW
				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''+postID,'data-replycount':numReplies}).each(function(){
					//$(this).attr({"id": $(this).attr("id").concat(postID),'myvalue': $(this).attr("myvalue").concat(postID)}).text(numReplies.concat(' Replies'));
					$(this).attr({"id":$(this).attr("id").concat(postID),'myvalue':$(this).attr("myvalue").concat(postID)});
					$(this).text(numReplies.concat(' Replies'));
                    if(numReplies <= 0)
					$(this).hide();
				})
				)
			]),
		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':numReplies}).each(function(){
			$(this).attr("id",$(this).attr("id").concat(postID));
		}) ,
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id").concat(postID)).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(postID)});
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}
//HERE PROBLEM
function makeNewCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comment-lists'+parentID)
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName.concat(' ').concat(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'remove-comment'}).attr('id','removeComment').each(function(){

					$(this).attr("id",$(this).attr("id").concat(postID)).text("Remove");
				})
				)
			]),
		$('<p>').append([
			//PROBLEM
			$('<small>').append(


				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''+postID,'data-replycount':numReplies}).each(function(){
					$(this).attr({"id":$(this).attr("id").concat(postID)})
					//if(numReplies <= 0){
					//$(this).hide();
				//}else{
					//$(this).attr({"id":$(this).attr("id").concat(postID),'myvalue':$(this).attr("myvalue").concat(postID)}).text("View".concat(numReplies).concat("Replies"));}
					$(this).text("View ".concat(numReplies).concat(" Replies"));}
					
					//0 replies
			//}
			)
				)
			]),


   


		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':numReplies}).each(function(){
			$(this).attr("id",$(this).attr("id").concat(postID))
		}) ,
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id").concat(postID)).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr("id",$(this).attr("id").concat(postID));
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}

function makeCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies'+parentID)
	.append([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName.concat(' ').concat(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			}),
			$('<p>').append(
				$('<small>').append(
					$('<a>',{'class':'remove-comment-o-comment'}).attr('id','removecomment2').text("Remove").each(function(){
						$(this).attr({"id": $(this).attr("id").concat(postID)});
					})
					)
				)
			])
		])
	]);
}
function makeBasicCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){

	$('#replies'+parentID)
	.append([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName.concat(' ').concat(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			})
			])
		])
	]);
}

function makeBasicCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies'+parentID)
	.append([
		$('<div>',{'class':'media'}).attr({'id':'commentOComment-media'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(postID)});
		}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append([
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({'src': $(this).attr("src").concat(image)});
			})
			]),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName.concat(' ').concat(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			})
			])
			])
		]);
}


function makeNewCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies'+parentID)
	.prepend([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr({"id": $(this).attr("id").concat(postID)});
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(postID),'src': $(this).attr("src").concat(image)});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName.concat(' ').concat(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			}),
			$('<p>').append(
				$('<small>').append(
					$('<a>',{'class':'remove-comment-o-comment'}).attr('id','removecomment2').text("Remove").each(function(){
						$(this).attr({"id": $(this).attr("id").concat(postID)});
					})
					)
				)
			])
		])
	]);
}


function createSharedPost(parentImage, image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){
	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		})
		.append([
		$('<div/>', {'class':'dropdown pull-right'}).append([$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown').append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append(
				//hereOriginal
				$('<a>', {'class':'dropdown-item editEntry edit-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
					$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Edit'))),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry delete-btn btn'}).attr({'id':'',"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr({"data-target": $(this).attr("data-target").concat(elementID),'id': $(this).attr("id").concat(elementID)});
			}).append($('<h6>').text('Delete'))),
			]),
		]),

		$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<h5>',{'class':'mt-0'}).each(function(){
			$(this).text(fName.concat(' ').concat(lName).concat(' shared a post: '));
		}),
		$('<p>').each(function(){
			     $(this).text(readRuneArrayThatWorks(content));
		}),
		$('<div>', {'class':'media'}).append([			
		$('<div>',{'class':'panel panel-default'}).append([
			$('<div>',{'class':'panel-body'}).append([
				$('<div>',{'class':'media'}).append([
					$('<a>',{'class':'pull-left'}).append([
						$('<img>',{'class':'media-object img-rounded'}).attr({'id':'img','src':''}).each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
						})
						]),
					$('<div>',{'class':'media-body'}).append([
						$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
                            if (sharedContent != null){
							 $(this).text(timeSince(originaltime));
                            }
						}),
						$('<h5>',{'class':'mt-0'}).each(function(){
							$(this).text(posterFname.concat(' ').concat(posterLname));
						}),
						$('<p>').each(function(){
                            if (sharedContent != null){
                                 $(this).text(readRuneArrayThatWorks(sharedContent));
                            }
                            else{
                               $(this).text("Content has been deleted"); 
                            }
						})
						])

					])
				])
			]),
			$('<ul>').append([
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
						$(this).attr({"id": $(this).attr("id").concat(elementID)});
					}).append([$('<span>').append([
					$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
					$('<p>',{'class':'mt-0'}).each(function(){
						$(this).text(numLikes);
					})
					])
					])
					]),
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
						$(this).attr({"id": $(this).attr("id").concat(elementID),'data-target': $(this).attr("data-target").concat(elementID)});
					}).append([$('<span>').append([
					$('<img>',{'class':'comment-btn-ico'}).attr('src','/ustart_front/ico/no-comment.png'),
					$('<p>',{'class':'mt-0'}).attr({'id':'num-replies'}).each(function(){
						$(this).attr("id", $(this).attr("id").concat(elementID)).text(numReplies);
					})
					])
					])
					])

				])

		
		])
		])
	]);	

	$('#editModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}).append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{'class':'close'}).attr({'data-dismiss':'modal','type':'button'}).html("&times;"),
						$('<h4>',{'class':'modal-title'}).text("Edit Post")
						]),
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':"edit-img","src":""}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(parentImage)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr("id",$(this).attr("id").concat(elementID));
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID));
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'})
				 .append([
				$('<div>',{'class':'modal-header'}).append([
					$('<span>').text("Confirm Deletion")
					]),
				$('<div>',{'class':'modal-body'}).append([
					$('<span>').text("Are you sure you want to delete this post?")
					]),
				$('<div>',{'class':'modal-footer'}).append([
					$('<button>',{'class':'btn btn-danger btn-ok deletePost'}).attr({'id':'delete-btn','type':'submit'}).text("Delete").each(function(){
						$(this).attr("id",$(this).attr("id").concat(elementID));
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);

	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr("id",$(this).attr("id").concat(elementID));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(parentImage)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID)).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','').each(function(){
							$(this).attr("id","comment-lists"+(elementID));
						})
						])
					])
				])
			])
		]);	
}

function createBasicSharedPost(parentImage,image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){

	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr("id", $(this).attr("id").concat(elementID));
		})
		.append([
		$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
			 $(this).text(timeSince(time));
		}),
		$('<h5>',{'class':'mt-0'}).each(function(){
			$(this).text(fName.concat(' ').concat(lName).concat('shared a post: '));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<div>', {'class':'media'}).append([			
		$('<div>',{'class':'panel panel-default'}).append([
			$('<div>',{'class':'panel-body'}).append([
				$('<div>',{'class':'media'}).append([
					$('<a>',{'class':'pull-left'}).append([
						$('<img>',{'class':'media-object img-rounded'}).attr({'id':'img','src':''}).each(function(){
							$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(image)});
						})
						]),
					$('<div>',{'class':'media-body'}).append([
						$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
                            if (sharedContent != null){
							     $(this).text(timeSince(originaltime));
                            }
						}),
						$('<h5>',{'class':'mt-0'}).each(function(){
                             if (sharedContent != null){
							     $(this).text(posterFname.concat(' ').concat(posterLname));
                             }
						}),
						$('<p>').each(function(){
                            if (sharedContent != null){
							    $(this).text(readRuneArrayThatWorks(sharedContent));
                            }
                            else{
                                $(this).text("Content has been removed");
                            }
						})
						])

					])
				])
			]),
			$('<ul>').append([
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
						$(this).attr({"id": $(this).attr("id").concat(elementID)});
					}).append([$('<span>').append([
					$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
					$('<p>',{'class':'mt-0'}).each(function(){
						$(this).text(numLikes);
					})
					])
					])
					]),
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
						$(this).attr({"id":$(this).attr("id").concat(elementID),'data-target':$(this).attr('data-target').concat(elementID)});
					}).append([$('<span>').append([
					$('<img>',{'class':'comment-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
					$('<p>',{'class':'mt-0'}).attr({'id':'num-replies'}).each(function(){
						$(this).attr("id", $(this).attr("id").concat(elementID)).text(numReplies);
					})
					])
					])
					])

				])
		])
		])
	]);	

	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr({"id": $(this).attr("id").concat(elementID)});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id": $(this).attr("id").concat(elementID),'src': $(this).attr("src").concat(parentImage)});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName.concat(' ').concat(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID)).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id").concat(elementID));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','').each(function(){
							$(this).attr("id","comment-lists"+(elementID));
						})
						])
					])
				])
			])
		]);	

}


