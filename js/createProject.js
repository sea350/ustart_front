$(document).ready(function() {
	
	$('#form-project').submit(function(e) {
		e.preventDefault();
		
		// Encode special characters in the URL field
		$('#curl').val(encodeURIComponent($('#curl').val()));
		
		alert('The URL has been encoded. Let\'s sent this off to the database.');
	});
});