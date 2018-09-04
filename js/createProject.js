$(document).ready(function() {
	//word count limiter
	var maxLength = 5000;
	$('textarea').keyup(function() {
	  var length = $(this).val().length;
	  var length = maxLength-length;
	  $('#chars').text(length);
	});	
	
	$('#form-project').submit(function(e) {
		e.preventDefault();
		
		// Encode special characters in the URL field
		$('#curl').val(encodeURIComponent($('#curl').val()));
		
		alert('The URL has been encoded. Let\'s sent this off to the database.');
	});
});