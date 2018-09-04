function pollInstagram(next_url) {
    $.ajax({
        method: "GET",
        url: next_url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function(data) {
			console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alert("Check you internet Connection");
            $("#log").val($("#log").val() + 'Error\n');
        }
    });
}

$(document).ready( function() {
	var access_token = window.location.hash.substr(1).split('=')[1];
	
	$('form#instagramQuery').submit(function(event) {
		event.preventDefault();
		pollInstagram("https://api.instagram.com/v1/users/search?q=instagram&access_token=" + access_token);
		//pollInstagram("https://api.instagram.com/v1/users/search?q=" + $('input[name="instagramQuery"]').val() + "&count=5" + "&access_token=" + access_token);
	});
	
	$('form#instagramSelfQuery').submit(function(event) {
		event.preventDefault();
		pollInstagram("https://api.instagram.com/v1/users/self/?access_token=&access_token=" + access_token);
	});
	
	$('#widgeting').load('https://lightwidget.com/?username=chickbug #instansive-preview-widget');
});