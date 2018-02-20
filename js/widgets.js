var currentItem;
var twitterSetting;
var twitterSettingDown = '<i class="glyphicon glyphicon-menu-down"></i>';
var widgetScrollSpeed = 400;
var medUrlType = 0;
var galleryDefaultRemoveOption = '<option default selected>Select from your list of pictures here</option>';

/*function attachRemoveWidgetFunction() {
    $(".fa-trash").unbind('click');
    $(".fa-trash").click(function(e) {
        var el = $(e.target);
        el = el.parent().parent().parent();
        el.remove();
    });
}*/

function daRender(daUsername, daCount) {
	$('#widgetBodyDA').rss("https://backend.deviantart.com/rss.xml?q=gallery%3A" + daUsername, {
		limit: daCount,
		layoutTemplate: '<ul data-da-username="' + daUsername + '">{entries}</ul>',
		entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="dArt-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
		dateFormat: 'MMM Do, YYYY',
		effect: 'slideFastSynced',
		tokens: {
			imageURL: function(entry, tokens) { return entry.mediaContent }
		}
	});
}

function pinRender(pinURL) {
	var pinembed = pinURL;
	if (pinembed.indexOf('/pin/') >= 0) {
		$('#widgetBodyPin').append('<a data-pin-do="embedPin" href="' + pinembed + '"></a>');
	} else {
		$('#widgetBodyPin').append('<a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="' + pinembed + '"></a>');
	}
}

// ApplyTextModalID(this)

function ApplyTextModalID(element) {
	var parentElement = $(element).closest('li');
	$('#customTextModal input#editID').val(parentElement.attr('id'));
	$('#customTextModal input#customHeader').val(parentElement.find('#text-title')[0].innerText);
	$('#customTextModal input#customContent').html(parentElement.find('#text-box')[0].innerHTML);
	CKEDITOR.instances['customContent'].setData(parentElement.find('#text-box')[0].innerHTML);
	
	$('#customTextModal').modal();
}

function ApplyIDToModal(elementModal, elementWidget) {
	var listElement = $(elementWidget).closest('li');
	$('#' + elementModal + ' input#editID').val(listElement.attr('id'));
	$('#' + elementModal).modal();
}

function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

function mediumRender (medUsername, medPublication, medTag, medCount) {
	//$('#widgetBodyMed').html('');
	
	if (medUsername !== '') {
		$('#widgetBodyMed').rss("https://medium.com/feed/@" + medUsername, {
			limit: medCount,
			layoutTemplate: '<ul data-med-username="' + medUsername + '">{entries}</ul>',
			entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="medium-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
			dateFormat: 'MMM Do, YYYY',
			effect: 'slideFastSynced'
		});
	} else {
		var medTag = $('#med-embed-tag').val();
		if (medTag === '') {
			$('#widgetBodyMed').rss("https://medium.com/feed/@" + medPublication, {
				limit: medCount,
				layoutTemplate: '<ul data-med-publication="' + medPublication + '">{entries}</ul>',
				entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="medium-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
				dateFormat: 'MMM Do, YYYY',
				effect: 'slideFastSynced'
			});
		} else {
			$('#widgetBodyMed').rss("https://medium.com/feed/@" + medPublication + "/tagged/" + medTag, {
				limit: medCount,
				layoutTemplate: '<ul data-med-publication="' + medPublication + '" data-med-tag="' + medTag + '">{entries}</ul>',
				entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="medium-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
				dateFormat: 'MMM Do, YYYY',
				effect: 'slideFastSynced'
			});
		}
	}
	//$('#med-embed-input').val('');
}

function tumblrRender (tumblrUsername) {
	// Using RSS to render custom containers
	$('#widgetBodyTumblr').rss("https://" + tumblrUsername + ".tumblr.com/rss", {
		limit: 6,
		layoutTemplate: '<ul data-tumblr-username="' + tumblrUsername + '">{entries}</ul>',
		entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="tumblr-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
		dateFormat: 'MMM Do, YYYY',
		effect: 'slideFastSynced'
	});
}

function anchorEditor(element) {
	if ($('.anchor-feed').length > 0)
		$('#ar-modal #editID').val($('.anchor-feed').closest('li').attr('id'));
	else
		$('#ar-modal #editID').val(0);
	
	$('#ar-modal').on('show.bs.modal', function() {
		// Clean List Items
		$('#ar-edit-list').children('li').remove();
		
		// Add List Items
		$('.anchor-feed').each(function(idx, element) {
			var arSource = new URL($(this).children('iframe').attr('src'));
			var arListItem = '<li><form action="/deleteLinkFromWidget/" method="POST"><input name="deleteURL" type="text" value="'+ arSource.pathname +'"/> <input name="editID" type="hidden" value="' + $('#ar-modal #editID').val() + '" readonly="readonly" /><button type="submit"><i class="fa fa-times"></i></button></form></li>'
			$('#ar-edit-list').append(arListItem);
		});
		
		// Show/hide the text above the list
		if ($('#ar-edit-list').children('li').length == 0) {
			$('#ar-list-title').hide();
		} else {
			$('#ar-list-title').show();
		}
		
		// Add the Remove functionality for each Anchor Item
		$('#ar-edit-list').find('.fa-times').click(function(){
			var idx = $('#ar-edit-list').find('.fa-times').index(this);
			$('.anchor-feed').eq(idx).remove();
			$('#ar-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});;
			
			if ($('#ar-edit-list').children('li').length == 0) {
				$('#ar-list-title').hide();
			} else {
				$('#ar-list-title').show();
			}
		});
	});
	$('#ar-modal').on('shown.bs.modal', function() {
		$('#ar-embed-input').focus();
	});
	$('#ar-modal').modal();
}

function pinterestEditor(element) {
	if ($('#widgetBodyPin>span').length > 0)
		$('#pin-modal #editID').val($('#widgetBodyPin>span').closest('li').attr('id'));
	else
		$('#pin-modal #editID').val(0);
	
	$('#pin-modal').on('show.bs.modal', function() {
		// Clean List Items
		$('#pin-edit-list').children('li').remove();
		
		// Add List Items
		$('#widgetBodyPin>span').each(function(idx, element) {
			var igSource = $(element).children('span').attr('data-pin-href');
            console.log(igSource);
			var igListItem = '<li><form action="/deleteLinkFromWidget/" method="POST"><input name="deleteURL" type="text" value="'+ igSource +'"/> <input name="editID" type="hidden" value="' + $('#pin-modal #editID').val() + '" readonly="readonly" /><button type="submit"><i class="fa fa-times"></i></button></form></li>';
			$('#pin-edit-list').append(igListItem);
		});
		
		// Show/hide the text above the list
		if ($('#pin-edit-list').children('li').length == 0) {
			$('#pin-list-title').hide();
		} else {
			$('#pin-list-title').show();
		}
		
		// Add the Remove functionality for each Pinterest Item
		$('#pin-edit-list').find('.fa-times').click(function(){
			var idx = $('#pin-edit-list').find('.fa-times').index(this);
			$('#widgetBodyPin>span').eq(idx).remove();
			$('#pin-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});
			
			if ($('#pin-edit-list').children('li').length == 0) {
				$('#pin-list-title').hide();
			} else {
				$('#pin-list-title').show();
			}
		});
	});
	$('#pin-modal').on('shown.bs.modal', function() {
		$('#pin-embed-input').focus();
	});
	$('#pin-modal').modal();
}

function instagramEditor(element) {
	if ($('.insta-feed').length > 0)
		$('#ig-modal #editID').val($('.insta-feed').closest('li').attr('id'));
	else
		$('#ig-modal #editID').val(0);
	
	$('#ig-modal').on('show.bs.modal', function() {
		// Clean List Items
		$('#ig-edit-list').children('li').remove();
		
		// Add List Items
		$('.insta-feed').each(function(idx, element) {
			var igSource = $(this).children('iframe')[0].src;
			var igListItem = '<li><form action="/deleteLinkFromWidget/"><input name="deleteURL" type="text" value="' + igSource.substring(0, igSource.indexOf('embed')) + '" readonly="readonly"/> <button type="submit"><i class="fa fa-times"></i></button><input name="editID" type="hidden" value="' + $('#ig-modal #editID').val() + '" /></form></li>';
			$('#ig-edit-list').append(igListItem);
		});
		
		// Show/hide the text above the list
		if ($('#ig-edit-list').children('li').length == 0) {
			$('#ig-list-title').hide();
		} else {
			$('#ig-list-title').show();
		}
		
		// Add the Remove functionality for each Instagram Item
		$('#ig-edit-list').find('.fa-times').click(function(){
			var idx = $('#ig-edit-list').find('.fa-times').index(this);
			$('.insta-feed').eq(idx).remove();
			$('#ig-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});;
			
			if ($('#ig-edit-list').children('li').length == 0) {
				$('#ig-list-title').hide();
			} else {
				$('#ig-list-title').show();
			}
		});
	});
	$('#ig-modal').on('shown.bs.modal', function() {
		$('#ig-embed-input').focus();
	});
	$('#ig-modal').modal();
}

function spotifyEditor(element) {
	if ($('#widgetBodySpot iframe').length > 0)
		$('#spot-modal #editID').val($('#widgetBodySpot').closest('li').attr('id'));
	else
		$('#spot-modal #editID').val(0);
	
	$('#spot-modal').on('show.bs.modal', function() {
		// Clean List Items
		$('#spot-edit-list').children('li').remove();
		
		// Add List Items
		$('#widgetBodySpot iframe').each(function(idx, element) {
			var spotSource = $(this).attr('src');
			var spotListItem = '<li><form action="/deleteLinkFromWidget/"><input name="deleteURL" type="text" value="' + spotSource + '" readonly="readonly"/> <button type="submit"><i class="fa fa-times"></i></button><input name="editID" type="hidden" value="' + $('#spot-modal #editID').val() + '" /></form></li>';
			$('#spot-edit-list').append(spotListItem);
		});
		
		// Show/hide the text above the list
		if ($('#spot-edit-list').children('li').length == 0) {
			$('#spot-list-title').hide();
		} else {
			$('#spot-list-title').show();
		}
		
		// Add the Remove functionality for each Spotify Item
		$('#spot-edit-list').find('.fa-times').click(function(){
			var idx = $('#spot-edit-list').find('.fa-times').index(this);
			$('#widgetBodySpot iframe').eq(idx).remove();
			$('#spot-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});;
			
			if ($('#spot-edit-list').children('li').length == 0) {
				$('#spot-list-title').hide();
			} else {
				$('#spot-list-title').show();
			}
		});
	});
	$('#spot-modal').on('shown.bs.modal', function() {
		$('#spot-embed-input').focus();
	});
	$('#spot-modal').modal();
}

$(document).ready(function() {
	if($('#customContent').length) {
		CKEDITOR.replace('customContent');
    }
    
    //submit button handling for text widget
	$('#customTextForm').submit(function(event) {	
        //header to be stored into database
        //var textHeader =$('#customHeader').val();
        //content to be stored into database, note this is in html
        //var textContent =CKEDITOR.instances['customContent'].getData();
       /* var pageID= $('#pageiden').val();
        $('#pageID').val(pageID);*/
         /*$.ajax({
            type: 'GET',  
            url: 'http://ustart.today:5000/addWidget/',
            contentType: "application/json; charset=utf-8",
            data: {userID:pageID, title:textHeader, description:textContent},
            success: function(data) {
                 //show it on the widget
                var htmlText = `<li class="ui-state-default widgetListItem sortable">
                        <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil"></span>
                                <h4 name="textEditorHeader">
                                    Custom Text
                                </h4>
                            </div>
                            <div class="widgetBody">
                                <div class="text-box" name="textEditorBody">
                                    Edit this text by clicking on the Pencil icon.
                                </div>
                            </div>
                        </div>
                    </li>
                    `;
                currentItem = addWidgetByHTML(htmlText)
                currentItem.find('.fa-pencil').click(function() {
                    currentItem = $(this).parent().parent().parent();	// return to the list item
                    $('#customTextModal').modal();
                });
                $(currentItem).find('[name="textEditorHeader"]').text($('#customHeader').val());
                $(currentItem).find('[name="textEditorBody"]').html(CKEDITOR.instances['customContent'].getData());
                $('#customTextModal').modal('hide');
                alert("overhere");
            }//end success function
        }); //end ajax  */
        
	});
    

	
    //attachRemoveWidgetFunction();
    $('#addTextWidget').click(function() {
		$('#customTextModal').modal();
        //textEditFun();
    });
    $('#addCodePenWidget').click(function() {
        $('#code-modal').modal();
		/*if($('#code-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#code-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#code-modal').modal();
				});
			return;
		}
        var htmlText = `<li class="ui-state-default widgetListItem sortable">
                            <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil id="code-edit" data-toggle="modal" data-target="#code-modal""></span>
                                <h4 name="textEditorHeader">
                                    CodePen
                                </h4>
                            </div>

                            <div class="modal fade" id="code-modal" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Embed CodePen</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Please paste the CodePen embed code in here:</p>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="code-embed-input">

                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" id="code-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="widgetBodyCode" class="widgetBody cpEmbeded">
                                <p data-height="265" data-theme-id="dark" data-slug-hash="gGWbQB" data-default-tab="result" data-user="short" data-embed-version="2" data-pen-title="campfire" class="codepen"></p>
								<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
                            </div>
                        </div>
                        </li>
                        `;
        addWidgetByHTML(htmlText);
        $('#code-submit-btn').click(function() {

            var value = $('#code-embed-input').val();
            //alert(value);
			$('#widgetBodyCode').html(value);
            //$(value).appendTo($('#widgetBodyCode'));
            $('#code-embed-input').val('');
        });*/
		$('#code-modal').on('shown.bs.modal', function() {
            $('#code-embed-input').focus();
		});
    });
    $('#addTumblrWidget').click(function() {
        $('#tumblr-modal').modal();
        /*
		if($('#tumblr-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#tumblr-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#tumblr-modal').modal();
				});
			return;
		}
        var htmlText = `<li class="ui-state-default widgetListItem sortable">
                            <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil" id="tumblr-edit" data-toggle="modal" data-target="#tumblr-modal"></span>
                                <h4 name="textEditorHeader">
                                    Tumblr
                                </h4>
                            </div>

                            <div class="modal fade" id="tumblr-modal" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Embed Tumblr</h4>
                                        </div>
                                        <div class="modal-body">
											<span id="tumblr-list-title">Removable Tumblr Posts</span>
											<ul id="tumblr-edit-list"></ul>
                                            <p>Please paste the Tumblr embed code in here:</p>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="tumblr-embed-input">

                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" id="tumblr-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
							<div id= "widgetBodyTumblr" class="widgetBody"></div>
                            </div>
                        </li>
                        `;
        addWidgetByHTML(htmlText);
        $('#tumblr-submit-btn').click(function() {
            var value = $('#tumblr-embed-input').val();
            alert(value);
            $(value).appendTo($('#widgetBodyTumblr'));
            $('#tumblr-embed-input').val('');
        });*/
    });
    $('#addPinterestWidget').click(function() {
        $('#pin-modal').modal();
		/*if($('#pin-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#pin-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#pin-modal').modal();
				});
			return;
		}
        var htmlText = `<li class="ui-state-default widgetListItem sortable">
                            <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil" id="pin-edit" data-toggle="modal" data-target="#pin-modal"></span>
                                <h4 name="textEditorHeader">
                                    Pinterest
                                </h4>
                            </div>

                            <div class="modal fade" id="pin-modal" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Embed Pinterest</h4>
                                        </div>
                                        <div class="modal-body">
											<span id="pin-list-title">Removable Pins</span>
											<ul id="pin-edit-list"></ul>
                                            <p>Please paste the Pinterest Pin URL here:</p>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="pin-embed-input">

                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" id="pin-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div id="widgetBodyPin" class="widgetBody">
							
                            </div>
                        </div>
                        </li>

                        `;
        addWidgetByHTML(htmlText);
        $('#pin-submit-btn').click(function() {
            var pinembed = $('#pin-embed-input').val();
			if (pinembed.indexOf('/pin/') >= 0) {
				$('#widgetBodyPin').append('<a data-pin-do="embedPin" href="' + pinembed + '"></a>');
			} else {
				$('#widgetBodyPin').append('<a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="' + pinembed + '"></a>');
			}
            $('#pin-embed-input').val('');
			doBuild();
        });
		
		$('#pin-modal').on('show.bs.modal', function() {
			// Clean List Items
			$('#pin-edit-list').children('li').remove();
			
			// Add List Items
			$('#widgetBodyPin>span').each(function(idx, element) {
				var igSource = $(this).children('span').attr('data-pin-href');
				var igListItem = '<li><span>' + igSource + '</span> <i class="fa fa-times"></i></li>';
				$('#pin-edit-list').append(igListItem);
			});
			
			// Show/hide the text above the list
			if ($('#pin-edit-list').children('li').length == 0) {
				$('#pin-list-title').hide();
			} else {
				$('#pin-list-title').show();
			}
			
			// Add the Remove functionality for each Pinterest Item
			$('#pin-edit-list').find('.fa-times').click(function(){
				var idx = $('#pin-edit-list').find('.fa-times').index(this);
				$('#widgetBodyPin>span').eq(idx).remove();
				$('#pin-edit-list').children('li').eq(idx).hide('fast', function() {
					$(this).remove();
				});
				
				if ($('#pin-edit-list').children('li').length == 0) {
					$('#pin-list-title').hide();
				} else {
					$('#pin-list-title').show();
				}
			});
		});
		$('#pin-modal').on('shown.bs.modal', function() {
            $('#pin-embed-input').focus();
		});
		$('#pin-modal').modal();*/
    });
    // $("#addGooglePlusWidget").click(function() {
    //     var htmlText = `<li class="ui-state-default widgetListItem sortable">
    //                         <div class="projectsWidgetCont">
    //                             <div class="widgetTitle">
    //                                 <span class="pull-right fa fa-2x fa-sort"></span>
    //                                 <span class="pull-right fa fa-2x fa-trash"></span>
    //                                 <span class="pull-right fa fa-2x fa-pencil"></span>
    //                                 <h4 name="textEditorHeader">
    //                                     Pinterest
    //                                 </h4>
    //                             </div>
    //                             <div class="widgetBody">
    //                                 <div id="google-widg"></div>
    //                             </div>
    //                         </div>
    //                     </li>
    // `;
    //     gapi.post.render("google-widg", { 'href': 'https://plus.google.com/109813896768294978296/posts/hdbPtrsqMXQ' });
    // });
    $('#addSpotifyWidget').click(function() {
       spotifyEditor(this);
		/*if($('#spot-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#spot-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#spot-modal').modal();
				});
			return;
		}*/
        /*var htmlText = `<li class="ui-state-default widgetListItem sortable">
                            <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil" id="spot-edit" data-toggle="modal" data-target="#spot-modal"></span>

                                    <div class="modal fade" id="spot-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Spotify</h4>
                                                </div>
                                                <div class="modal-body">
													<span id="spot-list-title">Removable Spotify Sounds</span>
													<ul id="spot-edit-list"></ul>
                                                    <p>Please paste the Spotify embed code in here:</p>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="spot-embed-input">

                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="spot-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 


                                <h4 name="textEditorHeader">
                                    Spotify
                                </h4>
                            </div>
                            <div id="widgetBodySpot" class="widgetBody"></div>
                            </div>
                        </li>
                        `;
        addWidgetByHTML(htmlText);
        $('#spot-submit-btn').click(function() {
            var value = $('#spot-embed-input').val();
            $(value).appendTo($('#widgetBodySpot'));
            $('#spot-embed-input').val('');
        });*/
		/*$('#spot-modal').on('show.bs.modal', function() {
			// Clean List Items
			$('#spot-edit-list').children('li').remove();
			
			// Add List Items
			$('.spotifyIframe').each(function(idx, element) {
				var spotSource = $(this).attr('src');
				var spotListItem = '<li><span>' + spotSource + '</span> <i class="fa fa-times"></i></li>';
				$('#spot-edit-list').append(spotListItem);
			});
			
			// Show/hide the text above the list
			if ($('#spot-edit-list').children('li').length == 0) {
				$('#spot-list-title').hide();
			} else {
				$('#spot-list-title').show();
			}
			
			// Add the Remove functionality for each Spotify Item
			$('#spot-edit-list').find('.fa-times').click(function(){
				var idx = $('#spot-edit-list').find('.fa-times').index(this);
				$('.spotifyIframe').eq(idx).remove();
				$('#spot-edit-list').children('li').eq(idx).hide('fast', function() {
					$(this).remove();
				});;
				
				if ($('#spot-edit-list').children('li').length == 0) {
					$('#spot-list-title').hide();
				} else {
					$('#spot-list-title').show();
				}
			});
		});
		$('#spot-modal').on('shown.bs.modal', function() {
            $('#spot-embed-input').focus();
		});
		$('#spot-modal').modal();*/
    });

    $('#addLinksWidget').click(function() {
		if($('#linksWidget').length > 0) {
			$('html, body').animate({
				scrollTop: $("#linksWidget").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#linksWidget').modal();
				});
			return;
		}
        var htmlLinks = `<li class="ui-state-default widgetListItem sortable">
                                <div id="linksWidget" class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                        <span class="pull-right fa fa-2x fa-sort"></span>
                                        <span class="pull-right fa fa-2x fa-trash"></span>
                                        <span class="pull-right fa fa-2x fa-pencil" data-toggle="modal" data-target="#addLinkModal"></span>
                                        <h4>Links</h4>
                                    </div>
                                    <div class="widgetBody">
                                        <div class="links-container"></div>
                                        <div class="numLinks">
                                            <span id="linkCountIndicator">16 Links Remaining</span>
                                        </div>
                                    </div>
                                    <!-- Add Link Modal -->
                                    <div class="modal fade" id="addLinkModal" role="dialog">
                                        <div class="modal-dialog">
                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Add Link</h4>
                                                </div>
                                                <form id="addLinkForm">
                                                    <div class="modal-body">
                                                        <p>
                                                            <span class="modal-cell">Title</span>
                                                            <input type="text" class="link-input-read" name="webTitle" placeholder="example: 'My LinkedIn'" spellcheck="false" required autofocus/>
                                                        </p>
                                                        <p>
                                                            <span class="modal-cell">URL</span>
                                                            <input type="text" class="link-input-read" name="webURL" placeholder="example: 'https://www.linkedin.com'" spellcheck="false" required/>
                                                        </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="btn-group">
                                                            <input type="submit" class="btn btn-primary btn-add-link" />
                                                            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <!-- End of Modals for user -->
                                    </div>
                                    <script src="js/jquery.validate.min.js"></script>
                                    <script src="js/layout_links.js"></script>
                                </div>
                            </li>
                            `;


        addWidgetByHTML(htmlLinks);

		$('.links-container').sortable({
			cancel: ''
		}).disableSelection();
		$('#addLinkModal').on('shown.bs.modal', function() {
            $('#link-input-read').focus();
		});
    });
    $('#igWidgetBtn').click(function() {
        instagramEditor(this);
		/*
		if($('#ig-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#ig-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#ig-modal').modal();
				});
			return;
		}
        var htmlIG = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                        <span class="pull-right fa fa-2x fa-sort"></span>
                                        <span class="pull-right fa fa-2x fa-trash"></span>
                                        <span class="pull-right fa fa-2x fa-pencil" id="ig-edit" data-toggle="modal" data-target="#ig-modal"></span>
                                        <h4>Instagram</h4>
                                    </div>
                                    <div class="modal fade" id="ig-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Instagram Posts</h4>
                                                </div>
												<form>
													<div class="modal-body">
														<span id="ig-list-title">Removable Instagram posts</span>
														<ul id="ig-edit-list"></ul>
														<label>Please paste the Instagram post here</label>
														<input type="text" class="form-control" id="ig-embed-input" placeholder="https://www.instagram.com/p/BageGbgD05c/" required/>
													</div>
													<div class="modal-footer">
														<button type="submit" id="ig-submit-btn" class="btn btn-default">Submit</button>
													</div>
												</form>
                                            </div>
                                        </div>
                                    </div> 
                                    <div id="widgetBodyID" class="widgetBody">
                                    </div>
                                </div>
                            </li>`;
        addWidgetByHTML(htmlIG);
        $('#ig-modal form').submit(function(event) {
			// Submission
			event.preventDefault();
			
            var embedValue = $('#ig-embed-input').val();
			var htmlIGpost;
			if ($('#ig-embed-caption').prop("checked")) {
				// Has caption under
				htmlIGpost = '<div class="insta-feed"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="' + embedValue + '" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank"></a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by DIY CRAFTS FOOD LIFE HACKS ?? (@diy.learning) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-10-20T04:28:48+00:00">Oct 19, 2017 at 9:28pm PDT</time></p></div></blockquote> <script async defer src="//platform.instagram.com/en_US/embeds.js"></script></div>';
            } else {
				// Exclude caption under
				htmlIGpost = '<div class="insta-feed"><blockquote class="instagram-media" data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:62.5% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="' + embedValue + '" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Bosslogic (@bosslogic)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-10-20T04:10:48+00:00">Oct 19, 2017 at 9:10pm PDT</time></p></div></blockquote> <script async defer src="//platform.instagram.com/en_US/embeds.js"></script></div>';
			}
			$(htmlIGpost).appendTo($('#widgetBodyID'));
            $('#ig-embed-input').val('');
			
			instgrm.Embeds.process();
			$('#ig-modal').modal('hide');
        });
		*/
    });
	$('#ig-modal form').submit(function(event) {
		if ($('.insta-feed').length >= 12) {
			event.preventDefault();
		}
	});

    $('#scWidgetBtn').click(function() {
		/*if($('#sc-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#sc-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#sc-modal').modal();
				});
			return;
		}
        var htmlSc = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="sc-edit" data-toggle="modal" data-target="#sc-modal"></span>
                                        <h4>Soundcloud</h4>
                                    </div>

                                    <div class="modal fade" id="sc-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Soundclouds</h4>
                                                </div>
                                                <div class="modal-body">
													<span id="sc-list-title">Removable Soundclouds</span>
													<ul id="sc-edit-list"></ul>
                                                    <p>Insert the Soundcloud URL:</p>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="sc-embed-input" placeholder="ex: https://soundcloud.com/user-808868756">
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="sc-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id= "widgetBodySC" class="widgetBody"></div>
                                </div>
                            </li>`;

        addWidgetByHTML(htmlSc);*/
        $('#sc-submit-btn').click(function() {
			/*// Frame Add
            var scURL = $('#sc-embed-input').val();
            var htmlIGpost = '<div class="soundcloud-feed"><iframe width="100%" height="300" scrolling="yes" frameborder="no" src="https://w.soundcloud.com/player/?url=' + scURL + '&amp;color=00cc11&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe></div>';
            $(htmlIGpost).appendTo($('#widgetBodySC'));
            $('#sc-embed-input').val(''); */
        });
		$('#sc-modal').on('show.bs.modal', function() {
			// Clean List Items
			$('#sc-edit-list').children('li').remove();
			
			// Add List Items
			$('.soundcloud-feed').each(function(idx, element) {
				var scSource = new URL($(this).children('iframe').attr('src'));
				var scListItem = '<li><span>' + scSource.searchParams.get('url') + '</span> <i class="fa fa-times"></i></li>';
				$('#sc-edit-list').append(scListItem);
			});
			
			// Show/hide the text above the list
			if ($('#sc-edit-list').children('li').length == 0) {
				$('#sc-list-title').hide();
			} else {
				$('#sc-list-title').show();
			}
			
			// Add the Remove functionality for each Soundcloud Item
			$('#sc-edit-list').find('.fa-times').click(function(){
				var idx = $('#sc-edit-list').find('.fa-times').index(this);
				$('.soundcloud-feed').eq(idx).remove();
				$('#sc-edit-list').children('li').eq(idx).hide('fast', function() {
					$(this).remove();
				});;
				
				if ($('#sc-edit-list').children('li').length == 0) {
					$('#sc-list-title').hide();
				} else {
					$('#sc-list-title').show();
				}
			});
		});
		$('#sc-modal').on('shown.bs.modal', function() {
            $('#sc-embed-input').focus();
		});
		$('#sc-modal').modal();
    });

    $('#ytWidgetBtn').click(function() {
        $('#youtubeModal').modal();
        /*$('#youtubeLink').val('');
        $('#youtubeModal .btn-done').unbind().click(function() {
            var embedcode = YouTubeGetID($('#youtubeLink').val());

            if (embedcode !== '') {
                var htmlYT = `<li class="ui-state-default widgetListItem sortable">
                                        <div class="projectsWidgetCont">
                                            <div class="widgetTitle">
												<span class="pull-right fa fa-2x fa-sort"></span>
												<span class="pull-right fa fa-2x fa-trash"></span>
												<span class="pull-right fa fa-2x fa-pencil" code="` + embedcode + `"></span>
                                                <h4>Youtube</h4>
                                            </div>
                                            <div class="widgetBody">
                                                <div class="youtube-feed">
                                                    <iframe src="https://www.youtube.com/embed/` + embedcode + `" frameborder="0" allowfullscreen></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </li>`;
                htmlYT = addWidgetByHTML(htmlYT);
                htmlYT.find('.fa-pencil').click(function() {
					currentItem = this;
                    $('#youtubeModal').modal();
                    $('#youtubeLink').val("https://www.youtube.com/embed/" + $(this).attr('code'));
                    $('#youtubeModal .btn-done').unbind().click(function() {
                        $(currentItem).parent().parent().find('.youtube-feed iframe').attr('src', "https://www.youtube.com/embed/" + YouTubeGetID($('#youtubeLink').val()));
                    });
                });
            }
        });*/
		$('#youtubeModal').on('shown.bs.modal', function() {
			$('#youtubeLink').focus();
		});
    });
	
    $('#twitWidgetBtn').click(function() {
		if($('#twit-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#twit-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#twit-modal').modal();
				});
			return;
		}
        var htmlSc = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="twit-edit" data-toggle="modal" data-target="#twit-modal"></span>
                                        <h4>Twitter</h4>
                                    </div>

                                    <div class="modal fade" id="twit-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Twitter</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <label for="twit-embed-input">Place your Twitter content below</label>
                                                    <div class="input-group">
														<div class="input-group-btn">
															<button id="twitter-setting" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																Profile Timeline
																<i class="glyphicon glyphicon-menu-down"></i>
															</button>
															<div class="dropdown-menu">
																<a id="twitter-setting-prof" class="dropdown-item" style="display:block;">Profile Timeline</a>
																<a id="twitter-setting-list" class="dropdown-item" style="display:block;">List Timeline</a>
																<a id="twitter-setting-colt" class="dropdown-item" style="display:block;">Collection</a>
																<a id="twitter-setting-momt" class="dropdown-item" style="display:block;">Moments</a>
															</div>
														</div>
                                                        <input type="text" class="form-control" id="twit-embed-input" required/>
                                                    </div>
													<br/>
													<label for="twit-embed-list-hash"></label>
                                                    <div class="input-group">
														<span class="input-group-addon">Hashtag</span>
														<input type="text" class="form-control" id="twit-embed-list-hash" required disabled placeholder="Without the #"/>
                                                    </div>
													<br/>
													<label>Dark Theme</label>
													<input type="checkbox" class="form-check" id="twit-dark"/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="twit-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id= "widgetBodyTwit" class="widgetBody">
                                    </div>
                                </div>
                            </li>`;

        htmlSc = addWidgetByHTML(htmlSc);
		twitterSetting = "prof-time";
		$("#twit-embed-list-hash").parent().hide();
		$("#twitter-setting-prof").click(function() {
			twitterSetting = "prof-time";
			$("#twitter-setting").html('Profile Timeline ' + twitterSettingDown);
			$("#twit-embed-list-hash").parent().hide('fast');
			$("#twit-embed-list-hash").attr('disabled', 'disabled');
			$('#twit-embed-input').val('');
			$('#twit-embed-input').attr('placeholder', 'Twitter Username');
		});
		$("#twitter-setting-list").click(function() {
			twitterSetting = "list-time";
			$("#twitter-setting").html('List Timeline ' + twitterSettingDown);
			$("#twit-embed-list-hash").val('');
			$("#twit-embed-list-hash").parent().show('fast');
			$("#twit-embed-list-hash").removeAttr('disabled');
			$('#twit-embed-input').val('');
			$('#twit-embed-input').attr('placeholder', 'Twitter Username');
		});
		$("#twitter-setting-colt").click(function() {
			twitterSetting = "twit-colt";
			$("#twitter-setting").html('Collection ' + twitterSettingDown);
			$("#twit-embed-list-hash").parent().hide('fast');
			$("#twit-embed-list-hash").attr('disabled', 'disabled');
			$('#twit-embed-input').val('');
			$('#twit-embed-input').attr('placeholder', 'Twitter Collection ID');
		});
		$("#twitter-setting-momt").click(function() {
			twitterSetting = "twit-momt";
			$("#twitter-setting").html('Moments ' + twitterSettingDown);
			$("#twit-embed-list-hash").parent().hide('fast');
			$("#twit-embed-list-hash").attr('disabled', 'disabled');
			$('#twit-embed-input').val('');
			$('#twit-embed-input').attr('placeholder', 'Twitter Moment ID');
		});
		
        $('#twit-submit-btn').click(function() {
			var themeType = ($('#twit-dark').prop("checked") ? "dark" : "light");
			// Frame Add
            var scURL = $('#twit-embed-input').val();
			var widgetHeight = 400;
			$('#widgetBodyTwit').html('');
			switch(twitterSetting) {
				case "prof-time":
					twttr.widgets.createTimeline(
					  {
						sourceType: "profile",
						screenName: scURL
					  },
					  $('#widgetBodyTwit')[0],
					  {
						height: widgetHeight,
						chrome: "nofooter",
						linkColor: "#820bbb",
						borderColor: "#a80000",
						theme: themeType
					  }
					);
					break;
				case "list-time":
					twttr.widgets.createTimeline(
					  {
						sourceType: "list",
						screenName: scURL,
						slug: $("#twit-embed-list-hash").val()
					  },
					  $('#widgetBodyTwit')[0],
					  {
						height: widgetHeight,
						chrome: "nofooter",
						linkColor: "#820bbb",
						borderColor: "#a80000",
						theme: themeType
					  }
					);
					break;
				case "twit-colt":
					twttr.widgets.createTimeline(
					  {
						sourceType: "collection",
						id: scURL
					  },
					  $('#widgetBodyTwit')[0],
					  {
						height: widgetHeight,
						chrome: "nofooter",
						linkColor: "#820bbb",
						borderColor: "#a80000",
						theme: themeType
					  }
					);
					break;
				case "twit-momt":
					twttr.widgets.createMoment(
					  scURL,
					  $('#widgetBodyTwit')[0],
					  {
						height: widgetHeight,
						chrome: "nofooter",
						linkColor: "#820bbb",
						borderColor: "#a80000",
						theme: themeType
					  }, {
						limit: 3
					  }
					);
					break;
			}
            $('#twit-embed-input').val('');
        });
		$('#twit-modal').on('shown.bs.modal', function() {
            $('#twit-embed-input').focus();
		});
		$('#twit-modal').modal();
    });

	// Anchor Widget (Radio)
    $('#arWidgetBtn').click(function() {
		anchorEditor(this);
		/*
		if($('#ar-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#ar-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#ar-modal').modal();
				});
			return;
		}
        var htmlAR = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="ar-edit" data-toggle="modal" data-target="#ar-modal"></span>
                                        <h4>Anchor</h4>
                                    </div>

                                    <div class="modal fade" id="ar-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Anchors</h4>
                                                </div>
                                                <div class="modal-body">
													<span id="ar-list-title">Removable Anchors</span>
													<ul id="ar-edit-list"></ul>
                                                    <p>Insert the Anchor Code in the URL:</p>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="ar-embed-input">

                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="ar-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id= "widgetBodyAR" class="widgetBody"></div>
                                </div>
                            </li>`;

        addWidgetByHTML(htmlAR);
        $('#ar-submit-btn').click(function() {
			// Frame Add
            var arURL = $('#ar-embed-input').val();
            var htmlARpost = '<div class="anchor-feed"><iframe src="https://anchor.fm/e/' + arURL + '" height="270px" width="400px" frameborder="0" scrolling="no"></iframe></div>';
            $(htmlARpost).appendTo($('#widgetBodyAR'));
            $('#ar-embed-input').val('');
        });
		$('#ar-modal').on('show.bs.modal', function() {
			// Clean List Items
			$('#ar-edit-list').children('li').remove();
			
			// Add List Items
			$('.anchor-feed').each(function(idx, element) {
				var arSource = new URL($(this).children('iframe').attr('src'));
				var arListItem = '<li><span>' + arSource.pathname + '</span> <i class="fa fa-times"></i></li>';
				$('#ar-edit-list').append(arListItem);
			});
			
			// Show/hide the text above the list
			if ($('#ar-edit-list').children('li').length == 0) {
				$('#ar-list-title').hide();
			} else {
				$('#ar-list-title').show();
			}
			
			// Add the Remove functionality for each Anchor Item
			$('#ar-edit-list').find('.fa-times').click(function(){
				var idx = $('#ar-edit-list').find('.fa-times').index(this);
				$('.anchor-feed').eq(idx).remove();
				$('#ar-edit-list').children('li').eq(idx).hide('fast', function() {
					$(this).remove();
				});;
				
				if ($('#ar-edit-list').children('li').length == 0) {
					$('#ar-list-title').hide();
				} else {
					$('#ar-list-title').show();
				}
			});
		});*/
		$('#ar-modal').on('shown.bs.modal', function() {
            $('#ar-embed-input').focus();
		});
		//$('#ar-modal').modal();
    });

	// Medium Widget (Writer Blogs)
    $('#mediumWidgetBtn').click(function() {
		/*
		if($('#med-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#med-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#med-modal').modal();
				});
			return;
		}
        var htmlMed = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="med-edit" data-toggle="modal" data-target="#med-modal"></span>
                                        <h4>Medium</h4>
                                    </div>

                                    <div class="modal fade" id="med-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Medium</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Select a Medium import option, either your username, or your publication name</p>
                                                    <div class="input-group">
														<div class="input-group-btn">
															<button id="med-setting" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																Username <i class="glyphicon glyphicon-menu-down"></i>
															</button>
															<div class="dropdown-menu">
																<a id="med-setting-user" class="dropdown-item" style="display:block;">Username</a>
																<a id="med-setting-pub" class="dropdown-item" style="display:block;">Publication</a>
															</div>
														</div>
                                                        <input type="text" class="form-control" id="med-embed-username"/>
                                                        <input type="text" class="form-control" id="med-embed-publication" disabled/>
                                                    </div>
													<br/>
                                                    <div class="input-group">
														<span class="input-group-addon">Publication Tag</span>
														<input type="text" class="form-control" id="med-embed-tag" disabled placeholder="(Optional)"/>
                                                    </div>
													<br/>
                                                    <div class="input-group">
														<span class="input-group-addon">Article Count</span>
														<input type="number" class="form-control" id="med-count" min='1' max='12' value='4'/>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="med-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id="widgetBodyMed" class="widgetBody"></div>
                                </div>
                            </li>`;

        addWidgetByHTML(htmlMed);*/
		$('#med-embed-publication').hide();
		$('#med-embed-tag').parent().hide();
		
		$('#med-setting-user').click(function() {
			$('#med-setting').html('Username <i class="glyphicon glyphicon-menu-down"></i>');
			$('#med-embed-username').prop('disabled', false).show();
			$('#med-embed-publication').prop('disabled', true).hide();
			$('#med-embed-tag').prop('disabled', true).parent().hide();
		});
		$('#med-setting-pub').click(function() {
			$('#med-setting').html('Publication <i class="glyphicon glyphicon-menu-down"></i>');
			$('#med-embed-username').prop('disabled', true).hide();
			$('#med-embed-publication').prop('disabled', false).show();
			$('#med-embed-tag').prop('disabled', false).parent().show();
			$('#med-embed-publication').val('');
		});
		
        $('#med-submit-btn').click(function() {
			var medUsername = $('#med-embed-username').val();
			var medPublication = $('#med-embed-publication').val();
			var medCount = $('#med-count').val();
			mediumRender(medUsername);
        });
		$('#med-modal').on('show.bs.modal', function() {
			// Add the Remove functionality for each Medium Item
			$('#med-edit-list').find('.fa-times').click(function(){
				var idx = $('#med-edit-list').find('.fa-times').index(this);
				$('.med-feed').eq(idx).remove();
				$('#med-edit-list').children('li').eq(idx).hide('fast', function() {
					$(this).remove();
				});;
				
				if ($('#med-edit-list').children('li').length == 0) {
					$('#med-list-title').hide();
				} else {
					$('#med-list-title').show();
				}
			});
		});
		$('#med-modal').on('shown.bs.modal', function() {
            $('#med-embed-input').focus();
		});
		$('#med-modal').modal();
    });
	
	// DeviantArt Widget
    $('#daWidgetBtn').click(function() {
		/*
		if($('#da-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#da-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#da-modal').modal();
				});
			return;
		}
        var htmlDA = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="da-edit" data-toggle="modal" data-target="#da-modal"></span>
                                        <h4>DeviantArt</h4>
                                    </div>

                                    <div class="modal fade" id="da-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed DeviantArt</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Put your DeviantArt username here to share your newest deviations:</p>
                                                    <div class="input-group">
														<div class="input-group-btn">
															<button id="da-setting" type="button" class="btn btn-secondary" aria-expanded="false">
																Username
															</button>
														</div>
                                                        <input type="text" class="form-control" id="da-embed-username"/>
                                                    </div>
													<br/>
                                                    <div class="input-group">
														<span class="input-group-addon">Article Count</span>
														<input type="number" class="form-control" id="da-count" min='1' max='12' value='4'/>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="da-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id="widgetBodyDA" class="widgetBody"></div>
                                </div>
                            </li>`;
        addWidgetByHTML(htmlDA);
		
        $('#da-submit-btn').click(function() {
			$('#widgetBodyDA').html('');
			
			var daUsername = $('#da-embed-username').val();
			$('#widgetBodyDA').rss("https://backend.deviantart.com/rss.xml?q=gallery%3A" + daUsername, {
				limit: $('#da-count').val(),
				layoutTemplate: '<ul data-da-username="' + daUsername + '">{entries}</ul>',
				entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="dArt-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
				dateFormat: 'MMM Do, YYYY',
				effect: 'slideFastSynced'
			});
			
            $('#da-embed-input').val('');
        });*/
		$('#da-modal').on('shown.bs.modal', function() {
            $('#da-embed-input').focus();
		});
		$('#da-modal').modal();
    });
	
	// Twitch Widget
    $('#twitchWidgetBtn').click(function() {
		/*if($('#twitch-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#twitch-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#twitch-modal').modal();
				});
			return;
		}
        var htmlTwitch = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="twitch-edit" data-toggle="modal" data-target="#twitch-modal"></span>
                                        <h4>Twitch</h4>
                                    </div>

                                    <div class="modal fade" id="twitch-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Twitch</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Put your Twitch username here to broadcast yourself whenever you stream live:</p>
                                                    <div class="input-group">
														<div class="input-group-btn">
															<button id="twitch-setting" type="button" class="btn btn-secondary" aria-expanded="false">
																Username
															</button>
														</div>
                                                        <input type="text" class="form-control" id="twitch-embed-username"/>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="twitch-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id="widgetBodyTwitch" class="widgetBody"></div>
                                </div>
                            </li>`;
        addWidgetByHTML(htmlTwitch);
		
        $('#twitch-submit-btn').click(function() {
			var twitchUsername = $('#twitch-embed-username').val();
			
			$('#widgetBodyTwitch').html('<iframe src="https://player.twitch.tv/?channel=' + twitchUsername + '" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe><a href="https://www.twitch.tv/' + twitchUsername + '?tt_content=text_link&tt_medium=live_embed" style="padding:2px 0px 4px; display:inline-block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;">Watch live video from ' + twitchUsername + ' on www.twitch.tv</a>');
			
            $('#twitch-embed-input').val('');
        });*/
		$('#twitch-modal').on('shown.bs.modal', function() {
            $('#twitch-embed-input').focus();
		});
		$('#twitch-modal').modal();
    });

	$('#addGithubWidget').click(function() {
		if($('#git-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#git-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#git-modal').modal();
				});
			return;
		}
		
		// Do Edits for Github
        var htmlGit = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                    <span class="pull-right fa fa-2x fa-sort"></span>
                                    <span class="pull-right fa fa-2x fa-trash"></span>
                                    <span class="pull-right fa fa-2x fa-pencil" id="git-edit" data-toggle="modal" data-target="#git-modal"></span>
                                        <h4>Github</h4>
                                    </div>

                                    <div class="modal fade" id="da-modal" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Embed Github</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Put your Github username here to publish your code:</p>
                                                    <div class="input-group">
														<div class="input-group-btn">
															<button id="git-setting" type="button" class="btn btn-secondary" aria-expanded="false">
																Username
															</button>
														</div>
                                                        <input type="text" class="form-control" id="git-embed-username"/>
                                                    </div>
													<br/>
                                                    <div class="input-group">
														<span class="input-group-addon">Shown Projects Count</span>
														<input type="number" class="form-control" id="da-count" min='1' max='12' value='4'/>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="git-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div id="widgetBodyGit" class="widgetBody"></div>
                                </div>
                            </li>`;
        addWidgetByHTML(htmlGit);
		
        $('#git-submit-btn').click(function() {
			$('#widgetBodyGit').html('');
			
			var gitUsername = $('#git-embed-username').val();
			
			$.ajax({
				url : 'https://api.github.com/users/tastyegg/repos',
				dataType: 'json',
				success: function(data) {
					$(data).each(function(index, element) {
						
					});
				},
				error: function(err) {
					$('#widgetBodyGit').html('Git Username not found');
				}
			});
			
            $('#git-embed-input').val('');
        });
		$('#git-modal').on('shown.bs.modal', function() {
            $('#git-embed-input').focus();
		});
		$('#git-modal').modal();
	});
	
    $('#galleryWidgetBtn').click(function() {
		if($('#editGalleryModal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#editGalleryModal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#editGalleryModal').modal();
				});
			return;
		}
        var htmlGallery = `<li class="ui-state-default widgetListItem sortable">
                                <div class="projectsWidgetCont">
                                    <div class="widgetTitle">
                                        <span class="pull-right fa fa-2x fa-sort"></span>
                                        <span class="pull-right fa fa-2x fa-trash"></span>
                                        <span class="pull-right fa fa-2x fa-pencil" data-toggle="modal" data-target="#editGalleryModal"></span>
                                        <span id="galleryPause" class="pull-right fa fa-2x fa-pause"></span>
                                        <span id="galleryPlay" class="pull-right fa fa-2x fa-play"></span>
                                        <h4>Gallery</h4>
                                    </div>
                                    <div class="widgetBody">
										<div class="gallery-display">
											<img/>
										</div>
                                        <div class="gallery-slider slider-nav">
                                            <div><img src="https://img00.deviantart.net/96b0/i/2010/222/1/f/little_swallow_by_knites.png" /></div>
                                            <div><img src="https://img00.deviantart.net/759e/i/2012/170/d/a/spring_memories_by_eliseenchanted-d540nqm.jpg" /></div>
                                            <div><img src="https://i.pinimg.com/originals/66/e7/c9/66e7c920ea4efcb7abe935769bd19265.jpg" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="editGalleryModal" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h3>Gallery</h3>
                                            </div>
                                            <div class="modal-body">
												<label for="galleryURL">Add Pictures</label>
												<div class="input-group">
													<input id="galleryURL" class="form-control" type="text" placeholder="Place your image URL here"/>
													<span class="input-group-btn">
														<button id="galleryAdd" class="btn btn-default"><i class="fa fa-plus"></i></button>
													</span>
												</div>
												<label for="gallerySelect">Removes Pictures</label>
												<div class="input-group">
													<select id="gallerySelect" class="form-control" type="text"></select>
													<span class="input-group-btn">
														<button id="gallerySub" class="btn btn-default"><i class="fa fa-minus"></i></button>
													</span>
												</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
        addWidgetByHTML(htmlGallery);
        buildGalleryWidget();
		
		$('#editGalleryModal').on('show.bs.modal', function() {
			buildGalleryList();
		});
		$('#editGalleryModal').modal();
    });

    $('.widgetTitle .fa-trash-o').click(function() {
        $(this).parents('.ui-state-default').remove();
    });

    var projectWidgetItems = $('#projectWidget .columnImage');
    projectWidgetItems.each(function(idx) {
        var liItemProject = $("<li class='sort-project'></li>");
        liItemProject.append(projectWidgetItems.eq(idx).clone());
        $('#projSortable').append(liItemProject);

        liItemProject.find('a').replaceWith(function() {
            return $('<span/>', {
                html: this.innerHTML
            });
        });

        liItemProject.bind('click', function() {
            $(this).toggleClass('invisible-tag');
        });
    });
	
	$('#med-embed-publication').hide();
		$('#med-embed-tag').parent().hide();
		
		$('#med-setting-user').click(function() {
			$('#med-setting').html('Username <i class="glyphicon glyphicon-menu-down"></i>');
			$('#med-embed-username').prop('disabled', false).show();
			$('#med-embed-publication').prop('disabled', true).hide();
			$('#med-embed-tag').prop('disabled', true).parent().hide();
		});
		$('#med-setting-pub').click(function() {
			$('#med-setting').html('Publication <i class="glyphicon glyphicon-menu-down"></i>');
			$('#med-embed-username').prop('disabled', true).hide();
			$('#med-embed-publication').prop('disabled', false).show();
			$('#med-embed-tag').prop('disabled', false).parent().show();
			$('#med-embed-publication').val('');
		});
});

function addWidgetByHTML(h) {
    h = $(h).appendTo($('#sortable'));
    var widgetListItems = document.getElementsByClassName('widgetListItem');
    widgetListItems[widgetListItems.length - 1].scrollIntoView();

    $(h).find('.fa-trash').click(function() {
        $(this).parents('.ui-state-default').remove();
    });
    //attachRemoveWidgetFunction();
	
	return h;
}