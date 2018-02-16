function centering() {
	if ($(window).width() <= 576) {
			$("#social_Media2").append($("#twit_Icon"), $("#yt_Icon"), $("#sc_Icon"));
		}
	else {
		$("#social_Media1").append($("#twit_Icon"), $("#yt_Icon"), $("#sc_Icon"));
	}
}

$(document).ready(function() {
	centering();
	$(window).resize(function() {
		centering();
	});	
});