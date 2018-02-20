var linkList = [];
var linkDesc = [];

var removeLink = function(element) {
	$.ajax({
		type: 'GET',  
		url: 'http://ustart.today:5000/removeLink/',
		contentType: "application/json; charset=utf-8",
		data: {userLink:httpURL, userLinkDesc:userlinkdesc},
		success: function(data) {
			createLink(httpURL, $('input[name$="webTitle"]').val());
			linkList.push(httpURL);
			linkDesc.push($('input[name$="webTitle"]').val());
			$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
			$('#addLinkModal').modal('hide');
		}
	});
	$(this).parent().hide("slow", function() {
		linkList.splice($.inArray($(this).href, linkList),1);
		$(this).tooltip('hide');
		$(this).remove();
		$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
	});
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
        var htmlText = $('<a target="_blank" href="'+existingSite+'" data-toggle="tooltip" data-placement="top" title="" data-original-title="https://google.com">'
					+ '<span class="cross-mark">x</span>' + '<img src="//logo.clearbit.com/' + existingSite + '">'
					+ '<div class="links-website-title">' + siteDescription + '</div>' + '</a>');
		
		var linkObject = htmlText.appendTo($(".links-container"));
		linkObject.children('img').on('error', function() {
			$(this).on('error', function() {});	//Remove error body
			$(this).attr('src', '/ustart_front/img/ie.png');
		}).tooltip();
		linkObject.children('.cross-mark').mousedown(removeLink);
		/*
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
		
		var linkElement = document.createElement('a');
		var websiteLogo = document.createElement('img');
		var websiteTitle = document.createElement('div');
		var crossMark = document.createElement('a');
		linkElement.target = "_blank";
		linkElement.href = existingSite;
		crossMark.href = "#";
		$(linkElement).attr('data-toggle', "tooltip");
		$(linkElement).attr('data-placement', "top");
		$(linkElement).attr('title', existingSite);
		$(linkElement).tooltip();
		linkElement.append(crossMark);
		linkElement.append(websiteLogo);
		linkElement.append(websiteTitle);
		$(websiteTitle).attr('class', "links-website-title");
		websiteTitle.innerHTML = siteDescription;
		$(websiteLogo).on('error', function() {
			$(websiteLogo).on('error', function() {});
			$(this).attr('src', 'img/ie.png');
		});
		websiteLogo.src = "//logo.clearbit.com/" + linkElement.hostname;
		$(crossMark).attr('class', "cross-mark");
		$(crossMark).click(removeLink);
		crossMark.innerHTML = "x";

		$(linkElement).appendTo($(".links-container"));
		*/
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
						console.log("AJAX WORKS");
						createLink(httpURL, $('input[name$="webTitle"]').val());
						linkList.push(httpURL);
						linkDesc.push($('input[name$="webTitle"]').val());
						$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
						$('#addLinkModal').modal('hide');
					}
				});
			} else {
				alert("You have already added " + httpURL);
			}
		} else {
			alert("Maximum amount of links is 16.");
		}
		$('.link-input-read').val('');
		$('input[name$="webTitle"]').val('');
	});
});

$('#addLinkModal').on('shown.bs.modal', function() {
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