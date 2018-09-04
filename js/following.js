$(document).ready(function() {
	var hashFol = window.location.hash.indexOf('following');
	if (hashFol > -1) {
		$('.nav-tabs a[href="#followingPane"]').tab('show');
	}
	hashFol = window.location.hash.indexOf('followers');
	if (hashFol > -1) {
		$('.nav-tabs a[href="#followersPane"]').tab('show');
	}
});