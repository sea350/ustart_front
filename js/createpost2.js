

function makePostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares ,time){
	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr("id" + elementID);
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>', {'class':'pull-left'}).append([$('<img>', {'class':'media-object img-rounded'}).attr({'id': 'img','src':''}).each(function(){
			$(this).attr({"id":"id" + elementID,"src":image});
		}) ]),
		$('<div/>', {'class':'dropdown pull-right'}).append([
			$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown')
			.append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append(
				$('<a>', {'class':'dropdown-item editEntry'}).attr({"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
				$(this).attr({"data-target":"data-target" + elementID});
			}).append($('<h6>').text('Edit'))),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry'}).attr({"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr({'data-target':"data-target" + elementID});
			}).append($('<h6>').text('Delete'))),
			]),
		]),
		$('<div/>', {'class':'media-body'}).append([
			$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
				$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName+(' ')+(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).text(readRuneArrayThatWorks(content)).attr({"id":"id" + elementID}); 
		}) ]),
		$('<ul>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
				$(this).attr({"id" : "id" + elementID});
			})).append([$('<span>').append([
				$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
				$('<p>',{'class':'mt-0'}).each(function(){
					$(this).text(numLikes);
				})])
			
			])
			]),
			$('<li>').append([
				($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
					$(this).attr({"id":"id" + elementID,'data-target':"data-target" + elementID});
				})).append([$('<span>').append([
				($('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no comment.png')),
				($('<p>',{'class':'mt-0'}).attr('id','num-replies')).each(function(){
					$(this).text(numReplies).attr({'id':"id" + elementID});
				})])
				])

				]),
			$('<li>').append([
				($('<a>',{'class':'btn btn-sm share-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#share-modal'}).each(function(){
					$(this).attr({"id":$(this).attr("id" + (elementID)),'data-target':$(this).attr("data-target" + (elementID))});
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
			$(this).attr({"id":"id" + elementID});
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
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})
								])

								]),
						$('<br>'),$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({"name":"","id":"share-content","placeholder":"Say Something about this..."}).each(function(){
							$(this).attr("id",$(this).attr("id" + (elementID)));
						}))
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							})
							])

					])
				])
			])
		]);

	$('#editModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).append([
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
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr("id"+(elementID));
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).append([
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
						$(this).attr("id",$(this).attr("id" + (elementID)));
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);
	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr({"id":"id" + elementID});
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID))).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr({"id":"id" + elementID});
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comments-list').each(function(){
							$(this).attr({"id":"id" + elementID});
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
			$(this).attr({"id":"id" + elementID});
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>', {'class':'pull-left'}).append([$('<img>', {'class':'media-object img-rounded'}).attr('id', 'img').each(function(){
			$(this).attr({"id":"id" + elementID, 'src':image});
		})]),
		$('<div/>', {'class':'media-body'}).append([$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName+(' ')+(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).attr("id", $(this).attr("id" + (elementID))).text(readRuneArrayThatWorks(content));
		}) ]),
		$('<ul/>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
				$(this).attr("id", $(this).attr("id" + (elementID)));
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
				$(this).attr({"id": $(this).attr("id" + (elementID)),'data-target': $(this).attr("data-target" + (elementID))});

			})).append([$('<span>').append([
			$('<img>',{'class':'comment-btn-ico'}).attr('src', 'ustart_front/ico/no comment.png'),
			$('<p>',{'class':'mt-0'}).each(function(){
				$(this).text(numReplies);
			})
			])
			])
			]),
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm share-btn'}).attr({'data-toggle':'modal','data-target':'#share-modal'}).each(function(){
				$(this).attr("data-target", $(this).attr("data-target" + (elementID)));
			})) .append([$('<span>').append([
				$('<img>',{'class':'share-btn-ico'}).attr('src','/ustart_front/ico.not share.png'),
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
			$(this).attr('id',$(this).attr("id" + (elementID)));
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
								$(this).attr({'id':"id" + elementID,'src':image});
							}) ]) ,
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})

								]),
							$('<br>'),
							$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({'id':'shared-content','placeholder':'Say Something about this...'}).each(function(){
								$(this).attr('id',$(this).attr("id" + (elementID)));
							}))
							])
						]) ,
					$('<div>',{'class':'modal-footer'}).append([
						$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text('Post').each(function(){
							$(this).attr('id',$(this).attr("id" + (elementID)));
						})
						])
					])
				])
			])
		]);
	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr("id",$(this).attr("id" + (elementID)));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id":$(this).attr("id" + (elementID)),'src':$(this).attr("src" + (image))});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID))).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comments-list').each(function(){
							$(this).attr("id",$(this).attr("id" + (elementID)));
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
			$(this).attr("id", $(this).attr("id" + (elementID)));
		}).append([$('<div>', {'class' : 'media'})
		.append([
		$('<a>', {'class':'pull-left'}).append([$('<img>', {'class':'media-object img-rounded'}).attr({'id': 'img', 'src':''}).each(function(){
			$(this).attr({"id":"id" + elementID,'src':image});
		}) ]) ,
		$('<div/>', {'class':'dropdown pull-right'}).append([
			$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown').append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append([
				$('<a>', {'class':'dropdown-item editEntry'}).attr({"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
				$(this).attr("data-target", $(this).attr("data-target" + (elementID)));
			}).append($('<h6>').text('Edit'))]),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry'}).attr({"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr("data-target", $(this).attr("data-target" + (elementID)));
			}).append($('<h6>').text('Delete'))),
			]),
		]),
		$('<div/>', {'class':'media-body'}).append([
			$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
				$(this).text(timeSince(time));}),
		$('<h5>',{'class':'post-name mt-0'}).append($('<a>').each(function(){
			$(this).text(fName+(' ')+(lName));
		})),
		$('<p>',{'class':'post-message'}).attr('id','post-msg').each(function(){
			$(this).attr("id", $(this).attr("id" + (elementID))).text(readRuneArrayThatWorks(content));
		}) ]),
		$('<ul/>').append([
			$('<li>').append([
			($('<a>', {'class':'btn btn-sm like-btn'}).attr({'id':'like-btn', 'data-toggle':'modal'}).each(function(){
				$(this).attr("id", $(this).attr("id" + (elementID)));
			})).append([$('<span>').append([
			$('<img>',{'class':'like-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
			$('<p>',{'class':'mt-0'}).each(function(){
				$(this).text(numLikes);
			})
			])
			]),
			$('<li>').append([
				($('<a>', {'class':'btn btn-sm comment-btn'}).attr({'id':'','data-toggle':'modal','data-target':'#main-modal'}).each(function(){
					$(this).attr({"id":$(this).attr("id" + (elementID)),'data-target':$(this).attr("data-target" + (elementID))});
				})).append([$('<span>').append([
				($('<img>',{'class':'comment-btn-ico'}).attr('src', '/ustart_front/ico/no comment.png')),
				($('<p>',{'class':'mt-0'}).attr('id','num-replies')).each(function(){
					$(this).attr("id",$(this).attr("id" + (elementID))).text(numReplies);
				})
				])
				])
				]),
			$('<li>').append([
				($('<a>',{'class':'btn btn-sm share-btn'}).attr({'id':'', 'data-toggle':'modal','data-target':'#share-modal'}).each(function(){
					$(this).attr({"id":$(this).attr("id" + (elementID)),'data-target':$(this).attr("data-target" + (elementID))});
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
			$(this).attr("id",$(this).attr("id" + (elementID)));
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
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').each(function(){
									$(this).text(readRuneArrayThatWorks(content));
								})
								])

								]),
						$('<br>'),$('<div>',{'class':'form-group'}).append($('<textarea>',{'class':'form-control'}).attr({"name":"","id":"share-content","placeholder":"Say Something about this..."}).each(function(){
							$(this).attr("id",$(this).attr("id" + (elementID)));
						}))
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right share-postSubmit'}).attr('id','share-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							})
							])

					])
				])
			])
		]);

	$('#editModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).append([
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
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr("id"+(elementID));
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).append([
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
						$(this).attr("id",$(this).attr("id" + (elementID)));
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);

	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr("id",$(this).attr("id" + (elementID)));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id":"id" + elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID))).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id" + (elementID)));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','comments-list').each(function(){
							$(this).attr("id",$(this).attr("id" + (elementID)));
						})
						])
					])
				])
			])
		]);	
}

//UNTIL HERE
////
function makeCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comments-list').attr({'id':parentID})
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr("id",'id'+(postID));
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id":"id"+postID,'src':image});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName+(' ')+(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'remove-comment'}).attr('id','removeComment').each(function(){
					$(this).attr("id",$(this).attr("id"+(postID))).text("Remove");
				})
				)
			]),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''}).each(function(){
					if(numReplies <= 0){
					$(this).hide();
				}else{$(this).attr({"id":$(this).attr("id"+(postID)),'myvalue':$(this).attr("myvalue"+(postID))}).text("View"+(numReplies)+("Replies"));}
			})
				)
			]),
		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':''}).each(function(){
			$(this).attr({"id":$(this).attr("id"+(postID)),'data-replycount':$(this).attr("data-replycount"+(numReplies))});
		}),
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID))).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID)));
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}
function makeBasicCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comments-list').attr({'id':parentID})
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr("id",$(this).attr("id"+(postID)));
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id":"id"+postID,'src':image});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName+(' ')+(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''}).each(function(){
					$(this).attr({"id":$(this).attr("id"+(postID)),'myvalue':$(this).attr("myvalue"+(postID))}).text(numReplies+(" Replies"));
				})
				)
			]),
		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':''}).each(function(){
			$(this).attr({"id":$(this).attr("id"+(postID)),'data-replycount':$(this).attr("data-replycount"+(numReplies))});
		}),
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID))).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID)));
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}

function makeNewCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
	$('#comments-list').attr({'id':parentID})
	.append([
	$('<div>',{'class':'media standard-comment'}).attr('id','comment-media').each(function(){
		$(this).attr("id",$(this).attr("id"+(postID)));
	}) .append([
	$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
		$(this).text(timeSince(time));
	}),
	$('<a>',{'class':'media-left'}).append([
		$('<img>',{'class':'img-rounded'}).attr({'src':'','id':'comment-element'}).each(function(){
			$(this).attr({"id":"id"+(postID),'src':image});
		})
		]),
	$('<div>',{'class':'media-body'}).append([
		$('<h5>',{'class':'media-heading user_name'}).each(function(){
			$(this).text(fName+(' ')+(lName));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(content));
		}),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'remove-comment'}).attr('id','revmoeComment').each(function(){
					$(this).attr("id",$(this).attr("id"+(postID))).text("Remove");
				})
				)
			]),
		$('<p>').append([
			$('<small>').append(
				$('<a>',{'class':'view-replies'}).attr({'id':'openReplies','name':'replies','myvalue':''}).each(function(){
					if(numReplies <= 0){
					$(this).hide();
				}else{$(this).attr({"id":$(this).attr("id"+(postID)),'myvalue':$(this).attr("myvalue"+(postID))}).text("View"+(numReplies)+("Replies"));}
			})
				)
			]),
		$('<div>',{'class':'commentOfComment'}).attr({'id':'replies','data-replycount':''}).each(function(){
			$(this).attr({"id":$(this).attr("id"+(postID)),'data-replycount':$(this).attr("data-replycount"+(numReplies))});
		}),
		$('<div>',{'class':'input-group'}).append([
			$('<input>',{'class':'form-control'}).attr({'placeholder':'Add a reply','type':'text','id':'comment2Content','name':'body'}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID))).keydown(function(event){
					if (event.keyCode === 13){
						$(this).siblings('.new-comment-o-comment-submit').click();
						console.log("working");						
					}
				}) ;
			}),
			$('<span>',{'class':'input-group-addon new-comment-o-comment-submit'}).attr({'placeholder':'Add a comment','id':''}).each(function(){
				$(this).attr("id",$(this).attr("id"+(postID)));
			}) .append($('<i>',{'class':'fa fa-edit'}))
			])
		])
	])
		]);
}

function makeCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies').attr({'id':parentID})
	.append([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr("id",$(this).attr("id"+(postID)));
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id":"id"+(postID),'src':image});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName+(' ')+(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			}),
			$('<p>').append(
				$('<small>').append(
					$('<a>',{'class':'remove-comment-o-comment'}).attr('id','removecomment2').text("Remove").each(function(){
						$(this).attr('id',$(this).attr('id'+(postID)));
					})
					)
				)
			])
		])
	]);
}
function makeBasicCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){

	$('#replies').attr({'id':parentID})
	.append([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr("id",$(this).attr("id"+(postID)));
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id":"id"+postID,'src':image});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName+(' ')+(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			})
			])
		])
	]);
}

function makeBasicCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies').attr({'id':parentID})
	.append([
		$('<div>',{'class':'media'}).attr({'id':'commentOComment-media'}).each(function(){
			$(this).attr("id",$(this).attr("id"+(postID)));
		}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append([
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"src":image});
			})
			]),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName+(' ')+(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			})
			])
			])
		]);
}


function makeNewCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
	$('#replies').attr({'id':parentID})
	.prepend([
	$('<div>',{'class':'media'}).attr({'id':'commentOCommnet-media'}).each(function(){
		$(this).attr("id",$(this).attr("id"+(postID)));
	}) .append([
		$('<h6>',{'class':'post-time pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<a>',{'class':'media-left'}).append(
			$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-o-comment-element','src':''}).each(function(){
				$(this).attr({"id":"id"+postID,'src':image});
			})
			),
		$('<div>',{'class':'media-body'}).append([
			$('<h5>',{'class':'media-heading user_name'}).each(function(){
				$(this).text(fName+(' ')+(lName));
			}),
			$('<p>').each(function(){
				$(this).text(readRuneArrayThatWorks(content));
			}),
			$('<p>').append(
				$('<small>').append(
					$('<a>',{'class':'remove-comment-o-comment'}).attr('id','removecomment2').text("Remove").each(function(){
						$(this).attr('id',$(this).attr('id'+(postID)));
					})
					)
				)
			])
		])
	]);
}


function createSharedPost(image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){
	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr("id", $(this).attr("id"+(elementID)));
		})
		.append([
		$('<div/>', {'class':'dropdown pull-right'}).append([$('<a>', {'class':'dropdown-toggle'}).attr('data-toggle','dropdown').append([
			$('<span>', {'class':'glyphicon glyphicon-cog'}),
			$('<span>', {'class':'caret'})
			]),
		$('<ul>', {'class':'dropdown-menu'}).append([
			$('<li/>').append(
				$('<a>', {'class':'dropdown-item editEntry'}).attr({"data-toggle": 'modal', "data-target":'#edit-modal'}).each(function(){
				$(this).attr("data-target", $(this).attr("data-target"+elementID));
			}).append($('<h6>').text('Edit'))),
			$('<li/>').append($('<a>', {'class':'dropdown-item deleteEntry'}).attr({"data-toggle": 'modal', "data-target":'#delete-modal'}).each(function(){
				$(this).attr("data-target", $(this).attr("data-target"+elementID));
			}).append($('<h6>').text('Delete'))),
			]),
		]),

		$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<h5>',{'class':'mt-0'}).each(function(){
			$(this).text(fName+(' ')+(lName)+('shared a post: '));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(sharedContent));
		}),
		$('<div>', {'class':'media'}).append([			
		$('<div>',{'class':'panel panel-default'}).append([
			$('<div>',{'class':'panel-body'}).append([
				$('<div>',{'class':'media'}).append([
					$('<a>',{'class':'pull-left'}).append([
						$('<img>',{'class':'media-object img-rounded'}).attr({'id':'img','src':''}).each(function(){
							$(this).attr({"id": $(this).attr("id"+elementID),'src': image});
						})
						]),
					$('<div>',{'class':'media-body'}).append([
						$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
							$(this).text(timeSince(originaltime));
						}),
						$('<h5>',{'class':'mt-0'}).each(function(){
							$(this).text(posterFname+(' ')+(posterLname));
						}),
						$('<p>').each(function(){
							$(this).text(readRuneArrayThatWorks(content));
						})
						])

					])
				])
			]),
			$('<ul>').append([
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
						$(this).attr("id", $(this).attr("id"+(elementID)));
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
						$(this).attr({"id":$(this).attr("id"+(elementID)),'data-target':$(this).attr('data-target'+(elementID))});
					}).append([$('<span>').append([
					$('<img>',{'class':'comment-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
					$('<p>',{'class':'mt-0'}).attr({'id':'num-replies'}).each(function(){
						$(this).attr("id", $(this).attr("id"+(elementID))).text(numReplies);
					})
					])
					])
					])

				])

		
		])
		])
	]);	

	$('#editModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'edit-modal','role':'dialog'}).append([
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
									$(this).attr({"id": "id"+elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([

								$('<div>',{'class':'form-group'}).append([
									$('<textarea>',{'class':'form-control'}).attr({'id':'content','placeholder':''}).each(function(){
										$(this).text(readRuneArrayThatWorks(content)).attr("id",$(this).attr("id"+(elementID)));
									})
									])
								])
								])
						
							]),
							$('<div>',{'class':'modal-footer'}).append([
							$('<button>',{'class':'btn btn-primary pull-right edit-postSubmit'}).attr('id','edit-btn').text("Post").each(function(){
								$(this).attr("id",$(this).attr("id"+(elementID)));
							})
							])

					])
				])
			])
		]);
	$('#deleteModals').append([
		$('<div>',{'class':'modal fade'}).attr({"id":'delete-modal','role':'dialog'}).append([
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
						$(this).attr("id",$(this).attr("id"+(elementID)));
					}),
					$('<button>',{'class':'btn btn-default'}).attr({'type':'button','data-dismiss':'modal'}).text("Cancel"),
					]),
				])
				])
			])
		]);

	$('#commentModals').append([
		$('<div>',{'class':'modal fade'}).attr({'id':'main-modal','role':'dialog'}).each(function(){
			$(this).attr("id",$(this).attr("id"+elementID));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id":"id"+elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id"+(elementID))).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id"+elementID));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','').each(function(){
							$(this).attr("id",$(this).attr("id"+elementID));
						})
						])
					])
				])
			])
		]);	
}

function createBasicSharedPost(image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){

	$('#wall-dataF').append([
		$('<div/>', {'class' : 'panel-body wallPosts'}).attr('id','Post').each(function(){
			$(this).attr("id", $(this).attr("id"+elementID));
		})
		.append([
		$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
			$(this).text(timeSince(time));
		}),
		$('<h5>',{'class':'mt-0'}).each(function(){
			$(this).text(fName+(' ')+(lName)+('shared a post: '));
		}),
		$('<p>').each(function(){
			$(this).text(readRuneArrayThatWorks(sharedContent));
		}),
		$('<div>', {'class':'media'}).append([			
		$('<div>',{'class':'panel panel-default'}).append([
			$('<div>',{'class':'panel-body'}).append([
				$('<div>',{'class':'media'}).append([
					$('<a>',{'class':'pull-left'}).append([
						$('<img>',{'class':'media-object img-rounded'}).attr({'id':'img','src':''}).each(function(){
							$(this).attr({"id":"id"+elementID,'src':image});
						})
						]),
					$('<div>',{'class':'media-body'}).append([
						$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
							$(this).text(timeSince(originaltime));
						}),
						$('<h5>',{'class':'mt-0'}).each(function(){
							$(this).text(posterFname+(' ')+(posterLname));
						}),
						$('<p>').each(function(){
							$(this).text(readRuneArrayThatWorks(content));
						})
						])

					])
				])
			]),
			$('<ul>').append([
				$('<li>').append([
					$('<a>',{'class':'btn btn-sm like-btn'}).attr({'id':'like-btn','data-toggle':'modal'}).each(function(){
						$(this).attr("id", $(this).attr("id"+(elementID)));
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
						$(this).attr({"id":$(this).attr("id"+(elementID)),'data-target':$(this).attr('data-target'+(elementID))});
					}).append([$('<span>').append([
					$('<img>',{'class':'comment-btn-ico'}).attr('src','/ustart_front/ico/like.png'),
					$('<p>',{'class':'mt-0'}).attr({'id':'num-replies'}).each(function(){
						$(this).attr("id", $(this).attr("id"+(elementID))).text(numReplies);
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
			$(this).attr("id",$(this).attr("id"+elementID));
		}) .append([
			$('<div>',{'class':'modal-dialog'}).append([
				$('<div>',{'class':'modal-content'}).append([
					$('<div>',{'class':'modal-header'}).append([
						$('<button>',{"class":'close'}).attr({'type':'button','data-dismiss':'modal'}).html("&times;"),
						$('<div>',{'class':'media'}).append([
							$('<a>',{'class':'pull-left'}).attr('href',"#").append([
								$('<img>',{'class':'media-object img-rounded'}).attr({'id':'comment-img','src':''}).each(function(){
									$(this).attr({"id":"id"+elementID,'src':image});
								})
								]),
							$('<div>',{'class':'media-body'}).append([
								$('<h6>',{'class':'pull-right text-muted time'}).each(function(){
									$(this).text(timeSince(time));
								}) ,
								$('<h5>',{'class':'mt-0'}).each(function(){
									$(this).text(fName+(' ')+(lName));
								}) ,
								$('<p>').text(readRuneArrayThatWorks(content))
								])
							])
						]) ,
					$('<div>',{'class':'modal-body'}).append([
						$('<div>',{'class':'input-group'}).append([
							$('<input>',{'class':'form-control'}).attr({'id':'commentContent','name':'commentz','placeholder':'Add a comment'}).each(function(){
								$(this).attr("id",$(this).attr("id"+(elementID))).keydown(function(event){
									if (event.keyCode === 13){
										$(this).siblings('.new-comment-submit').click();
										console.log("working");
									}
								});
							}),
							$('<span>',{'class':'input-group-addon new-comment-submit'}).attr('id','').each(function(){
								$(this).attr("id",$(this).attr("id"+(elementID)));
							}) .append($('<i>',{'class':'fa fa-edit'}))
							]) ,
						$('<br>'),
						
						$('<div>',{'class':'comment-lists'}).attr('id','').each(function(){ /* comments-list*/
							$(this).attr("id",$(this).attr("id"+(elementID)));
						})
						])
					])
				])
			])
		]);	

}


