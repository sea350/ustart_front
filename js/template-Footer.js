// When used with jQuery
function centering() {
	if ($(window).width() <= 576) {
		/*$("#edited_Row2").append($("#instagramIcon"), $("#snapchatIcon"), $("#soundcloudIcon"));
		$("#iconRow1").append($("#helpCenterButton").parent(), $("#termsButton").parent());
		$("#imgIcon").attr("rowspan", 2);*/
		$("#footer").append($(".social-links"),$(".footer-links"), $(".logo"));
	}
	else {
		$("#footer").append($(".logo"),$(".social-links"), $(".footer-links"));	
		/*$("#edited_Row").append($("#instagramIcon"), $("#snapchatIcon"), $("#soundcloudIcon"));
		$("#ogIconRow").append($("#helpCenterButton").parent(), $("#termsButton").parent());
		$("#imgIcon").attr("rowspan", 1);*/
	}
}

$(document).ready(function() {
	var el = document.getElementById('ticker');
	var ticker = new TickerScrambler(el, {list: ['Engineers','Artists','Musicians','Entrepreneurs','Together']});
	centering();
	$(window).resize(function() {
		centering();
	});	
});
