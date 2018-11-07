var linkList = [];
var linkDesc = [];
var port=window.location.port;

function updateCounter() {
    var currentPostCount = (16 - $(".links-container  a").length);
	$('#linkCountIndicator').html("" + currentPostCount + " Link" + (currentPostCount == 1 ? "" : "s") + " Remaining");
}

function removeLink(element) {

	var httpURL = element.parent().attr('href');
	var userlinkdesc = element.parent().find('.links-website-title').text();
	var projectInputID = $('input[name="projectID"]');
	var eventInputID = $('input[name="eventID"]');
	
	if (eventInputID.length){
		$.ajax({
			type: 'GET',  
			url: 'http://k12start.today:'+port+'/DeleteEventQuickLink/',
			contentType: "application/json; charset=utf-8",
			data: {deleteEventLink:httpURL, deleteEventLinkDesc:userlinkdesc, eventID:eventInputID.val()},
			success: function(data) {
				$(element).parent().hide("slow", function() {
					linkList.splice($.inArray($(element).href, linkList),1);
					$(element).remove();
					updateCounter();
				});
			}
		});
	}
	else if (projectInputID.length) {
		$.ajax({
			type: 'GET',  
			url: 'http://k12start.today:'+port+'/DeleteProjectLink/',
			contentType: "application/json; charset=utf-8",
			data: {deleteProjectLink:httpURL, deleteProjectLinkDesc:userlinkdesc, projectID:projectInputID.val()},
			success: function(data) {
				$(element).parent().hide("slow", function() {
					linkList.splice($.inArray($(element).href, linkList),1);
					$(element).remove();
					updateCounter();
				});
			}
		});
	} else {
		$.ajax({
			type: 'GET',  
			url: 'http://k12start.today:'+port+'/deleteLink/',
			contentType: "application/json; charset=utf-8",
			data: {userLink:httpURL, userLinkDesc:userlinkdesc},
			success: function(data) {
				$(element).parent().hide("slow", function() {
					linkList.splice($.inArray($(element).href, linkList),1);
					$(element).remove();
					updateCounter();
				});
			}
		});
	}
};

function urlHTTP_OLD(url) {
	// Attempts to check the URL via character check
	url = url.toLowerCase();
	if (url.startsWith("http://")) {
		if (url.startsWith("www.", 7)) {
			return url;
		}
		return "http://www." + url.substring(7);
	}
	if (url.startsWith("https://")) {
		if (url.startsWith("www.", 8)) {
			return url;
		}
		return "https://www." + url.substring(8);
	}
	if (url.startsWith("www.")) {
		return "http://" + url;
	}
	return "http://www." + url;
}

function importLinks() {
	// Import links from user database. Populate the array, 'linkList'.
	for (i = 0; i < linkList; i++) {
		createLink(linkList[i], linkDesc[i]);
	}
}

function createLink(existingSite, siteDescription) {
	if (existingSite) {
		var siteLogo = existingSite.replace(/(https:\/\/)|(http:\/\/)|(www\.)/g, '');
		var siteLogoSlashIndex = siteLogo.indexOf('/');
		if (siteLogoSlashIndex > 0) {
			siteLogo = siteLogo.substring(0, siteLogoSlashIndex);
        }
        var htmlText =  $('<a />').attr({'target': '_blank', 'href':existingSite,'data-toggle':"tooltip",'data-placement': "top", 'data-original-title':"https://google.com", 'title':""});
        var deleteOption = '<span class="cross-mark">x</span>';
        var linkIcon = $('<img />').attr({'src':"//logo.clearbit.com/"+siteLogo});
        var linkTitle = $('<div />').attr({'class':"links-website-title",}).text(siteDescription);
        ($('#linksWidget .fa-pencil').length ? htmlText.append(deleteOption, linkIcon, linkTitle): htmlText.append(linkIcon, linkTitle));
		var linkObject = htmlText.appendTo($(".links-container"));
		linkObject.children('img').on('error', function() {
			$(this).on('error', function() {});	//Remove error body
			$(this).attr('src', '/ustart_front/img/ie.png');
		}).tooltip();
		$(linkObject.children('.cross-mark')).click(function(event) {
            $(event.currentTarget).parent().removeAttr('href');
            $(event.currentTarget).parent().css("pointer-events", "none");
			event.preventDefault();
            console.log($(event.currentTarget).parent());
            $(event.currentTarget).css("pointer-events", "none");
			removeLink($(this));
		});
	} else {
		console.log("Site doesn't exist");
	}
}

$(document).ready(function() {
	$('#link-submit-btn').click(function(event) {
		var httpURL = $('input[name$="webURL"]').val();
        console.log(httpURL);
		var userlinkdesc = $('input[name$="webTitle"]').val();
        console.log(userlinkdesc);
		if (linkList.length < 16) {
			if ($.inArray(httpURL, linkList) == -1) {
				$.ajax({
					type: 'GET',  
					url: 'http://k12start.today:'+port+'/addLink/',
					contentType: "application/json; charset=utf-8",
					data: {userLink:httpURL, userLinkDesc:userlinkdesc},
					success: function(data) {
						createLink(httpURL, userlinkdesc);
						linkList.push(httpURL);
						linkDesc.push(userlinkdesc);
						updateCounter();
						$('#addLinkModal').modal('hide');
					}
				});
			} else {
				alert("You have already added " + httpURL);
			}
		} else {
			alert("Maximum amount of links is 16.");
		}
		$('input[name$="webURL"]').val('');
		$('input[name$="webTitle"]').val('');
	});

	$('#link-event-submit-btn').click(function(event) {
		var httpURL = $('input[name$="webURL"]').val();
		var eventlinkdesc = $('input[name$="webTitle"]').val();
		var eventid = $('input[name$="eventD"]').val();
		if (linkList.length < 16) {
			if ($.inArray(httpURL, linkList) == -1) {
				$.ajax({
					type: 'GET',
					url: 'http://k12start.today:'+port+'/AddEventQuickLink/',
					contentType: "application/json; charset=utf-8",
					data: {eventLink:httpURL, eventLinkDesc:eventlinkdesc, eventID:eventid},
					success: function(data) {
						console.log('eventID ' + eventid);
						createLink(httpURL, eventlinkdesc);
						linkList.push(httpURL);
						linkDesc.push(eventlinkdesc);
						updateCounter();
						$('#addLinkModal').modal('hide');
					}
				});
			} else {
				alert("You have already added " + httpURL);
			}
		} else {
			alert("Maximum amount of links is 16.");
		}
		$('input[name$="webURL"]').val('');
		$('input[name$="webTitle"]').val('');
	});
	
	
	$('#link-project-submit-btn').click(function(event) {
		var httpURL = $('input[name$="webURL"]').val();
		var projectlinkdesc = $('input[name$="webTitle"]').val();
		var projectid = $('input[name$="projectID"]').val();
		if (linkList.length < 16) {
			if ($.inArray(httpURL, linkList) == -1) {
				$.ajax({
					type: 'GET',
					url: 'http://k12start.today:'+port+'/AddProjectLink/',
					contentType: "application/json; charset=utf-8",
					data: {projectLink:httpURL, projectLinkDesc:projectlinkdesc, projectID:projectid},
					success: function(data) {
						console.log('ProjectID ' + projectid);
						createLink(httpURL, projectlinkdesc);
						linkList.push(httpURL);
						linkDesc.push(projectlinkdesc);
						updateCounter();
						$('#addLinkModal').modal('hide');
					}
				});
			} else {
				alert("You have already added " + httpURL);
			}
		} else {
			alert("Maximum amount of links is 16.");
		}
		$('input[name$="webURL"]').val('');
		$('input[name$="webTitle"]').val('');
	});

	$('#addLinkModal').on('shown.bs.modal', function() {
		updateCounter();
		$(this).find('[autofocus]').focus();
	});
	
	$('input[name$="webURL"]').focus(function() {
		if($(this).val().length === 0) {
			$(this).val('https://');
		}
	}).blur(function() {
		if($(this).val().match(/https?:\/\/$/) !== null) {
			$(this).val('');
		}
	});

    $('.links-container').sortable({
		cancel: "",
		helper: "dotted-guide"
    }).disableSelection();
});