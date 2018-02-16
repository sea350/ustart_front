// Fade in effect on the document body to hide load jittering
// Requires body to have display:none

$('body').css('display', 'none');

$(document).ready(function() {
	$('body').delay('fast').fadeIn('fast');
});