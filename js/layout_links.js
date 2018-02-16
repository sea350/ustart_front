var linkList = [];
var linkDesc = [];

var removeLink = function() {
	$(this).parent().hide("slow", function() {
		linkList.splice($.inArray($(this).href, linkList),1);
		$(this).tooltip('hide');
		$(this).remove();
		$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
	});
};

jQuery.validator.addMethod("full_url", function(val, elem) {
    // if no url, don't do anything
    if (val.length == 0) { return true; }
	
    // if user has not entered http:// https:// or ftp:// assume they mean http://
    if(!/^(https?|ftp):\/\//i.test(val)) {
        val = 'http://'+val; // set both the value
        $(elem).val(val); // also update the form element
    }
	
	return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);    
});

function urlHTTP(url) {
	try {
		return new URL(url);
	} catch (e) {
		alert('Invalid link. Please try with another link.');
		$('input[name$="webURL"]').focus();
		return '';
	}
}

function urlHTTP_OLD(url) {
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
	} else {
		console.log("Site doesn't exist");
	}
}

$('#addLinkForm').on('submit', function(event) {
	event.preventDefault();
	if (!$('input[name$="webURL"]').valid()) {
		return;
	}
	var httpURL = $('input[name$="webURL"]').val();
	if (linkList.length < 16) {
		if ($.inArray(httpURL, linkList) == -1) {
			createLink(httpURL, $('input[name$="webTitle"]').val());
			linkList.push(httpURL);
			linkDesc.push($('input[name$="webTitle"]').val());
			$('#linkCountIndicator').html("" + (16 - linkList.length) + " Link" + (16 - linkList.length == 1 ? "" : "s") + " Remaining");
			$('#addLinkModal').modal('toggle');
		} else {
			alert("You have already added " + httpURL);
		}
	} else {
		alert("Maximum amount of links is 16.");
	}
	$('.link-input-read').val('');
	$('input[name$="webTitle"]').val('');
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