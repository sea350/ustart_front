function showLeftNav() {
	$('#LeftNavBar-placeholder, .leftNavPop, .leftNavPush').addClass('reveal');
}
function hideLeftNav() {
	$('#LeftNavBar-placeholder, .leftNavPop, .leftNavPush').removeClass('reveal');
}

$(window).click(function() { hideLeftNav() });
$('#LeftNavBar-placeholder').click(function(event) { event.stopPropagation() });
$('.leftNavPop').click(function(event) { showLeftNav() });
$('.leftNavPush').click(function() { hideLeftNav() });