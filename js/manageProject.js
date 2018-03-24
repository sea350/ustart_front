

$(document).ready(function () {
    $('.inbox-group').click(function(event) {
		if (!$(this).hasClass('active')) {
			$('.active').not(this).removeClass('active');
			$(this).addClass('active');
			$('.box-compose').hide('fast');
			$('.box-chat').show('fast');
		}
	});
    
    $('#sidebarCollapse').on('click', function (e) {
         e.preventDefault();
        $('#sidebar').toggleClass('active');
    });

});
