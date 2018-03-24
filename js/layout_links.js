var linkList = [];
var linkDesc = [];

function updateCounter() {
	$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
}

function removeLink(element) {
	var httpURL = element.parent().attr('href');
	var userlinkdesc = element.parent().find('.links-website-title').text();
	var projectInputID = $('input[name="projectID"]');
	
	if (projectInputID.length) {
		$.ajax({
			type: 'GET',  
			url: 'http://ustart.today:5000/DeleteProjectLink/',
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
			url: 'http://ustart.today:5000/deleteLink/',
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
		var htmlText = $('<a target="_blank" href="'+existingSite+'" data-toggle="tooltip" data-placement="top" title="" data-original-title="https://google.com">'
					+ ($('#linksWidget .fa-pencil').length ? '<span class="cross-mark">x</span>' : '') + '<img src="//logo.clearbit.com/' + siteLogo + '">'
					+ '<div class="links-website-title">' + siteDescription + '</div>' + '</a>');
		
		var linkObject = htmlText.appendTo($(".links-container"));
		linkObject.children('img').on('error', function() {
			$(this).on('error', function() {});	//Remove error body
			$(this).attr('src', '/ustart_front/img/ie.png');
		}).tooltip();
		$(linkObject.children('.cross-mark')).click(function(event) {
			event.preventDefault();
			removeLink($(this));
		});
	} else {
		console.log("Site doesn't exist");
	}
}

$(document).ready(function() {
	$('#link-submit-btn').click(function(event) {
		var httpURL = $('input[name$="webURL"]').val();
		var userlinkdesc = $('input[name$="webTitle"]').val();
		if (linkList.length < 16) {
			if ($.inArray(httpURL, linkList) == -1) {
				$.ajax({
					type: 'GET',  
					url: 'http://ustart.today:5000/addLink/',
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
	$('#link-project-submit-btn').click(function(event) {
		var httpURL = $('input[name$="webURL"]').val();
		var projectlinkdesc = $('input[name$="webTitle"]').val();
		var projectid = $('input[name$="projectID"]').val();
		if (linkList.length < 16) {
			if ($.inArray(httpURL, linkList) == -1) {
				$.ajax({
					type: 'GET',
					url: 'http://ustart.today:5000/AddProjectLink/',
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
});