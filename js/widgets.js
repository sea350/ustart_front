var currentItem;
var twitterSetting;
var twitterSettingDown = '<i class="glyphicon glyphicon-menu-down"></i>';
var widgetScrollSpeed = 400;
var medUrlType = 0;
var instaARR=[];

function escapeOutput(toOutput){
    return toOutput.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27')
        .replace(/\//g, '&#x2F');
}



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
	/*$('#widgetBodyDA').rss("https://backend.deviantart.com/rss.xml?q=gallery%3A" + encodeURI(daUsername), {
		limit: daCount,
		layoutTemplate: '<ul data-da-username="' + daUsername + '">{entries}</ul>',
		entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="dArt-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
		dateFormat: 'MMM Do, YYYY',
		effect: 'slideFastSynced',
		tokens: {
			imageURL: function(entry, tokens) { return entry.mediaContent }
		},
		error: function() {
			$('#widgetBodyDA').text("The URL didn't work");
		}
	});*/
    $('#widgetBodyDA').FeedEk({
      FeedUrl:"https://backend.deviantart.com/rss.xml?q=gallery%3A" + encodeURI(daUsername),
      MaxCount : daCount
    });
}

function pinRender(pinURL) {
	var pinembed = pinURL;
	if (pinembed.indexOf('/pin/') >= 0) {
		$('#widgetBodyPin').append('<a data-pin-do="embed_pin" href="' + encodeURI(pinembed) + '"></a>');
	} else {
		$('#widgetBodyPin').append('<a data-pin-do="embedUser" data-pin-board-width="100%" data-pin-scale-height="280" data-pin-scale-width="80" href="' + encodeURI(pinembed) + '"></a>');
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

function YoutubeRender(youtubeID, widgetID) {
    var youtubeURL = YouTubeGetID(youtubeID);
    var divprefix = "#player";
    var finalDest = divprefix.concat(widgetID);
    var youtubeurlprefix="https://www.youtube.com/embed/";
    var finalURL = youtubeurlprefix.concat(youtubeURL);
    var iframe = document.createElement( "iframe" );
    iframe.setAttribute( "frameborder", "0" );
    iframe.setAttribute( "allowfullscreen", "" );
    iframe.setAttribute( "src", encodeURI(finalURL));
    $(finalDest).append(iframe);
}


function getSpotifyURL(url){
    if(/\.spotify\.com/.test(url))
    {
     // contains spotify
        var part = url.split("https://open.spotify.com")[1];
        return part;
    }
    else{
        return null;
    }
}
function spotifyRender(spotifyURL){
     var spotifyID = getSpotifyURL(spotifyURL);
     if (spotifyID == null){
          var error = document.createElement( "p" );
          var node = document.createTextNode("There appears to be a faulty URL");
          error.appendChild(node);
          $('#widgetBodySpot').append(error);
     }
     else{
         var spotifyprefix="https://open.spotify.com/embed";
         var iframe = document.createElement( "iframe" );
         var finalURL = spotifyprefix.concat(spotifyID);
        iframe.setAttribute( "class", "spotify-iframe" );
        iframe.setAttribute( "width", "33%" );
         iframe.setAttribute( "height", "380" );
         iframe.setAttribute( "frameborder", "0" );
         iframe.setAttribute( "allowtransparency", true );
         iframe.setAttribute( "src", encodeURI(finalURL));
         $('#widgetBodySpot').append(iframe);
     }
}


function AnchorGetID(url) {
    var anchrarray = url.split("/");
    if (anchrarray[4]=="episodes"){
        anchrarray[4]="embed/episodes";
    }
    var result = anchrarray.join("/");
    return result;
}

function ARRender(anchorID, widgetID) {
    var ARURL = AnchorGetID(anchorID);
    var divprefix = "#arrender";
    var finalDest = divprefix.concat(widgetID);
    var iframe = document.createElement( "iframe" );
    var AROuterDiv= $("<div></div>").addClass('anchor-feed').attr("id","arrender"+widgetID);
    iframe.setAttribute( "frameborder", "0" );
    iframe.setAttribute( "scrolling", "no" );
    iframe.style.marginbottom = "0.5em";
    iframe.style.width = "100%"
    iframe.style.display = "inline-block"
    iframe.setAttribute( "src", encodeURI(ARURL));
    AROuterDiv.append(iframe);
    $('#widgetBodyAR').append(AROuterDiv);
}


function TwitchRender(twitchID, widgetID) {
    var divprefix = "#twitchrender";
    var finalDest = divprefix.concat(widgetID);
    var iframe = document.createElement( "iframe" );
    var twitchurlprefix="https://player.twitch.tv/?channel=";
    var finaltwitchURL = twitchurlprefix.concat(twitchID);
    console.log(finalDest);
    console.log(finaltwitchURL);
    iframe.setAttribute( "frameborder", "0" );
    iframe.setAttribute( "scrolling", "no" );
    iframe.setAttribute( "allowfullscreen", "true" );
    iframe.setAttribute( "src", encodeURI(finaltwitchURL));
    iframe.setAttribute( "width", "100%" );
     iframe.setAttribute( "height", "640" );
    $(finalDest).append(iframe);
}

function mediumRender (medUsername, medPublication, medTag, medCount) {
	if (medUsername !== '') {
		$('#widgetBodyMed').rss("https://medium.com/feed/@"+medUsername, {
			limit: medCount,
			layoutTemplate: '<ul data-med-username="' + medUsername + '">{entries}</ul>',
			entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><div class="medium-body"><a href="{url}"><h3>{title}</h3></a>{shortBody}...</div></li>',
			dateFormat: 'MMM Do, YYYY',
			effect: 'slideFastSynced',
			error: function() {
				$('#widgetBodyMed').text("The URL didn't work");
			}
		});
	} /*else {
		var medTag = $('#med-embed-tag').val();
		if (medTag === '') {
			$('#widgetBodyMed').rss("https://medium.com/feed/@" + encodeURI(medPublication), {
				limit: medCount,
				layoutTemplate: '<ul data-med-publication="' + medPublication + '">{entries}</ul>',
				entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><div class="medium-body"><a href="{url}"><h3>{title}</h3></a>{shortBody}...</div></li>',
				dateFormat: 'MMM Do, YYYY',
				effect: 'slideFastSynced',
				error: function() {
					$('#widgetBodyMed').text("The URL didn't work");
				}
			});
		} else {
			$('#widgetBodyMed').rss("https://medium.com/feed/@" + encodeURI(medPublication) + "/tagged/" + encodeURI(medTag), {
				limit: medCount,
				layoutTemplate: '<ul data-med-publication="' + medPublication + '" data-med-tag="' + medTag + '">{entries}</ul>',
				entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><div class="medium-body"><a href="{url}"><h3>{title}</h3></a>{shortBody}...</div></li>',
				dateFormat: 'MMM Do, YYYY',
				effect: 'slideFastSynced',
				error: function() {
					$('#widgetBodyMed').text("The URL didn't work");
				}
			});
		}
	}*/
}

function tumblrRender(tumblrUsername) {
	console.log('tumblur: '+tumblrUsername);
	// Using RSS to render custom containers
    $('#widgetBodyTumblr').FeedEk({
      FeedUrl:"http://"+tumblrUsername+".tumblr.com/rss",
      MaxCount : 11,
      ShowDesc : true,
      ShowPubDate:true,
      DescCharacterLimit:1000,
      TitleLinkTarget:'_blank',
      DateFormat: 'MM/DD/YYYY',
      DateFormatLang:'en'
    });
}

function githubRender (githubUsername, gitcount) {
	$.getJSON("https://api.github.com/users/" + encodeURI(githubUsername) + "/repos", function(data) {
		var githubList = $("<ul></ul>");

		for (var i = 0; i < data.length && i < gitcount; i++) {
			var item = $("<li/>").appendTo(githubList);
			var gitBody = $("<div/>").addClass("github-body").text(data[i].description).appendTo(item);
			var headerLink = $("<a/>").prependTo(gitBody);
			headerLink.attr("href", data[i].html_url);
			var gitTitle = $("<h3/>").text(data[i].name).appendTo(headerLink);
			var gitTime = new Date(data[i].updated_at);
			var gitDate = $("<h4/>").text(gitTime.getDate()).appendTo(headerLink);
		}
    
    	$("#widgetBodyGit").append(githubList);
	});
	
	/*
	// Using RSS to render custom containers
	$('#widgetBodyGit').rss("https://api.github.com/users/" + githubUsername + "/repos", {
		limit: 12,
		layoutTemplate: '<ul data-github-username="' + githubUsername + '">{entries}</ul>',
		entryTemplate: '<li style="background-image:url(\'{teaserImageUrl}\')"><a href="{url}"><div class="github-proj-body"><h3>{title}</h3><h4>{date}</h4></a>{shortBody}...</div></li>',
		dateFormat: 'MMM Do, YYYY',
		effect: 'slideFastSynced',
		error: function() {
			$(this).text("The URL didn't work");
		}
	});
	*/
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
			var arEmbedSource = new URL($(this).children('iframe').attr('src'));
            var arSource = arEmbedSource.pathname.replace("/embed/",'/');
			var arListItem = '<li><form action="/deleteLinkFromWidget/" method="POST"><input name="deleteURL" type="text" value="'+ arSource +'" readonly/> <input name="editID" type="hidden" value="' + $('#ar-modal #editID').val() + '" readonly="readonly" /><button type="submit"><i class="fa fa-times"></i></button></form></li>'
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
			var igListItem = '<li><form action="/deleteLinkFromWidget/" method="POST"><input name="deleteURL" type="text" value="'+ igSource +'" readonly/> <input name="editID" type="hidden" value="' + $('#pin-modal #editID').val() + '" readonly="readonly" /><button type="submit"><i class="fa fa-times"></i></button></form></li>';
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
        instaARR=[];
		$('#ig-edit-list').children('li').remove();
		// Add List Items
		$('.insta-feed').each(function(idx, element) {
			var igSource = $(this).children('iframe')[0].src;
            instaARR.push(igSource.substring(0, igSource.indexOf('embed')));
			var igListItem = '<li><input style="width:100%" name="deleteURL" type="text" value="' + igSource.substring(0, igSource.indexOf('embed')) + '" readonly="readonly"/> <button class="insta-delete" type="button"><i class="fa fa-times"></i></button><input name="editID" type="hidden" value="' + $('#ig-modal #editID').val() + '" /></li>';
			$('#ig-edit-list').append(igListItem);
		});
        
        $('.insta-delete').click(function(e){
            e.preventDefault();
            $(this).prop("disabled", "true");
            var instaTarget = $(this).siblings("input[name=deleteURL]").val();
            var widgetDeleteID = $(this).siblings("input[name=editID]").val();
            if (instaARR.length === 1){
                instaARR=[];
                var pathName = window.location.pathname;
                if (window.location.pathname.indexOf('/profile/') > -1){
                    $.ajax({
                       type: "POST",
                       url: "/deleteWidget/",
                       data: {deleteID:widgetDeleteID},
                       success: function(data)
                       {
                           $(this).prop("disabled", "false");
                           location.reload();
                       }
                    });
                }
                 if (window.location.pathname.indexOf('/Projects/') > -1){
                      $.ajax({
                       type: "POST",
                       url: "/deleteProjectWidget/",
                       data: {deleteID:widgetDeleteID},
                       success: function(data)
                       {
                            $(this).prop("disabled", "false");
                            location.reload();
                       }
                    });
                 }
            }
            else if (instaARR.length > 1){
                instaARR.splice($.inArray(instaTarget, instaARR),1);
                console.log(widgetDeleteID);
                console.log(instaARR);
                 if (window.location.pathname.indexOf('/profile/') > -1){
                    $.ajax({
                       type: "POST",
                       url: "/addWidget/",
                       data: {editID:widgetDeleteID, instagramInput: JSON.stringify(instaARR)}, 
                       success: function(data)
                       {
                            $(this).prop("disabled", "false");
                            location.reload();
                       }
                     });
                 }
            }
            else{
                console.log("oopsie");
            }
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
            spotSource = spotSource.replace("/embed/", "/")
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


function preventSpam(formID, deleteButtonID){
        var form = document.getElementById(formID);
        var span = document.getElementById(deleteButtonID);
        form.addEventListener('submit', function () {
            form.submit.disabled = true;
            span.remove();
        });
        form.submit();
    }

$(window).on('load', function () {
      console.log("window loaded");
        setTimeout(function(){
        try {
            $('.widgetBodyInstagram').masonry({
                itemSelector: '.insta-feed'
            });
        } catch (error) {

        }}, 1000);
});

$(document).ready(function() {
	if($('#customContent').length) {
		CKEDITOR.replace('customContent');
    }
    try {
        $('.widgetBodyPin').masonry({
                itemSelector: '.widgetBodyPin a'
            });
    }catch (error) {

    }
    
    //submit button handling for all widgets
	$('#customTextForm').submit(function(event) {
        if( ($('#customHeader').val() == "") && ($('#customContent').val() == "") ) {
              event.preventDefault();
        }
        $('#customTextModal').modal('hide'); 
	});
    
     $('#customCalForm').submit(function(event) {
        if( $('#gCalEmbed').val() == "") {
              event.preventDefault();
        }
        $('#cal-modal').modal('hide'); 
	});
    
    $('#customInstagramForm').submit(function(event) {
        if( $('#instagramInput').val() == "") {
            event.preventDefault();
        }
        $('#ig-modal').modal('hide'); 
	});
    
    $('#customSoundcloudForm').submit(function(event) {
        if( $('#sg-embed-input').val() == "") {
              event.preventDefault();
        }
        $('#sc-modal').modal('hide'); 
	});
    $('#customYoutubeForm').submit(function(event) {
        if( $('#youtubeLink').val() == "") {
              event.preventDefault();
        }
        $('#youtubeModal').modal('hide'); 
	});
    
    $('#customCodePenForm').submit(function(event) {
        if( $('#code-embed-input').val() == "") {
              event.preventDefault();
        }
        $('#code-modal').modal('hide'); 
	});
    
     $('#customPinterestForm').submit(function(event) {
        if( $('#pin-embed-input').val() == "") {
              event.preventDefault();
        }
        $('#pin-modal').modal('hide'); 
	});
    
    $('#customTumblrForm').submit(function(event) {
        if( $('#tumblr-embed-input').val() == "") {
              event.preventDefault();
        }
        $('#tumblr-modal').modal('hide'); 
	});
    
    $('#customSpotifyForm').submit(function(event) {
        if( $('#spot-embed-input').val() == "") {
              event.preventDefault();
        }
        if($(".spotify-iframe").length >= 6){
            event.preventDefault();
            alert("you have reached the maximum number of spotify embeds");
        }
        $('#spot-modal').modal('hide'); 
	});
    
    $('#customArForm').submit(function(event) {
        if( $('#ar-embed-input').val() == "") {
              event.preventDefault();
        }
        $('#ar-modal').modal('hide'); 
	});
    
    $('#customMedForm').submit(function(event) {
        if( $('#med-embed-username').val() == "") {
              event.preventDefault();
        }
        $('#med-modal').modal('hide'); 
	});
    
     $('#customDaForm').submit(function(event) {
         if( $('#da-embed-username').val() == "") {
              event.preventDefault();
        }
        $('#da-modal').modal('hide'); 
	});
    
    $('#customTwitchForm').submit(function(event) {
        if( $('#twitch-embed-username').val() == "") {
              event.preventDefault();
        }
        $('#twitch-modal').modal('hide'); 
	});
    
    $('#customGitForm').submit(function(event) {
        if( $('#git-embed-username').val() == "") {
              event.preventDefault();
        }
        $('#git-modal').modal('hide'); 
	});
    
    
    
    /* end submit button handling for all widgets */

	
    //attachRemoveWidgetFunction();
    $('#addTextWidget').click(function() {
		$('#customTextModal').modal();
        //textEditFun();
    });
    $('#addCodePenWidget').click(function() {
        $('#code-modal').modal();
		$('#code-modal').on('shown.bs.modal', function() {
            $('#code-embed-input').focus();
		});
    });
    $('#addTumblrWidget').click(function() {
        $('#tumblr-modal').modal();
    });
    $('#addPinterestWidget').click(function() {
        $('#pin-modal').modal();
    });
    $('#addSpotifyWidget').click(function() {
       spotifyEditor(this);
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
    });

    $('#scWidgetBtn').click(function() {
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
		$('#ar-modal').on('shown.bs.modal', function() {
            $('#ar-embed-input').focus();
		});
    });

	// Medium Widget (Writer Blogs)
    $('#mediumWidgetBtn').click(function() {
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
		$('#da-modal').on('shown.bs.modal', function() {
            $('#da-embed-input').focus();
		});
		$('#da-modal').modal();
    });
	
	// Twitch Widget
    $('#twitchWidgetBtn').click(function() {
		$('#twitch-modal').on('shown.bs.modal', function() {
            $('#twitch-embed-input').focus();
		});
		$('#twitch-modal').modal();
    });

	// Github Widget Adder
	$('#addGithubWidget').click(function() {
		$('#git-modal').on('shown.bs.modal', function() {
            $('#git-embed-input').focus();
		});
		$('#git-modal').modal();
	});

	// Gallery Widget Adder
	$('#addGalleryWidget').click(function() {
		$('#gallery-modal').modal();
	});
	
	$('#gallery-modal').on('shown.bs.modal', function() {
		// Clean List Items
		$('#gallery-edit-list').children('li').remove();
		
		// Add List Items
		$('#widgetBodyGallery span').each(function(idx, element) {
			var gallerySource = $(this).text();
			var galleryListItem = '<li><span>' + gallerySource + '</span> <i class="fa fa-times"></i></li>';
			$('#gallery-edit-list').append(galleryListItem);
		});
		
		// Show/hide the text above the list
		if ($('#gallery-edit-list').children('li').length == 0) {
			$('#gallery-list-title').hide();
		} else {
			$('#gallery-list-title').show();
		}
		
		// Add the Remove functionality for each Soundcloud Item
		$('#gallery-edit-list').find('.fa-times').click(function(){
			var idx = $('#gallery-edit-list').find('.fa-times').index(this);
			$('#widgetBodyGallery').eq(idx).remove();
			$('#gallery-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});;
			
			if ($('#gallery-edit-list').children('li').length == 0) {
				$('#gallery-list-title').hide();
			} else {
				$('#gallery-list-title').show();
			}
		});

		$('#gallery-embed-input').focus();
	});
    
    $( ".delete-widget" ).click(function( event ) {
        var target= event.target.id;
        console.log(target);
        $("#"+target+"delete").submit();
        $("#"+target).unbind( "click" );
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
	
	//Limit Posts
	$('#ig-modal form').submit(function(event) {
		/*if ($('.insta-feed').length >= 12) {
			event.preventDefault();
		}*/
	});
	$('#ar-modal form').submit(function(event) {
		/*if ($('#ar-edit-list li').length >= 2) {
			event.preventDefault();
		}*/
	});
	
	// Limit form versions
	$('#customInstagramForm').submit(function(event) {
		if ($('ul#ig-edit-list li').length >= 12) {
			event.preventDefault();
			alert('We cannot add anymore Instagram posts!');
		}
	});
	$('#customSpotifyForm').submit(function(event) {
		if ($('ul#spot-edit-list li').length >= 12) {
			event.preventDefault();
			alert('We cannot add anymore Spotify posts!');
		}
	});
	$('#customPinterestForm').submit(function(event) {
		if ($('ul#pin-edit-list li').length >= 12) {
			event.preventDefault();
			alert('We cannot add anymore Pinterest posts!');
		}
	});
	$('#customTumblrForm').submit(function(event) {
		if ($('#widgetBodyTumblr ul li').length >= 12) {
			event.preventDefault();
			alert('We cannot add anymore Tumblr posts!');
		}
	});
	
	$(".widgetBody").niceScroll({
		cursorcolor: "#707070",
		cursorwidth: "8px",
		autohidemode: "leave",
		emulatetouch: true,
		hidescursordelay: 0
	});

});

function addWidgetByHTML(h) {
    h = $(h).appendTo($('#sortable'));
    var widgetListItems = document.getElementsByClassName('widgetListItem');
    widgetListItems[widgetListItems.length - 1].scrollIntoView();

    $(h).find('.fa-trash').click(function() {
        $(this).parents('.ui-state-default').remove();
    });
	
	return h;
}