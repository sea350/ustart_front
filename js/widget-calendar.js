$(document).ready(function() {
	var notGoogleCalendar = false;
	if (notGoogleCalendar)
		$('#widgetCalendar').datepicker({
			inline: true,
			showOtherMonths: true
		});
	
	$('#cal-modal').on('show.bs.modal', function() {
		// Clean List Items
		$('#cal-edit-list').children('li').remove();
		
		// Add List Items
		$('#widgetBodycal>span').each(function(idx, element) {
			var igSource = $(this).children('span').attr('data-cal-href');
			var igListItem = '<li><span>' + igSource + '</span> <i class="fa fa-times"></i></li>';
			$('#cal-edit-list').append(igListItem);
		});
		
		// Show/hide the text above the list
		if ($('#cal-edit-list').children('li').length == 0) {
			$('#cal-list-title').hide();
		} else {
			$('#cal-list-title').show();
		}
		
		// Add the Remove functionality for each Calendar Item
		$('#cal-edit-list').find('.fa-times').click(function(){
			var idx = $('#cal-edit-list').find('.fa-times').index(this);
			$('#widgetBodycal>span').eq(idx).remove();
			$('#cal-edit-list').children('li').eq(idx).hide('fast', function() {
				$(this).remove();
			});
			
			if ($('#cal-edit-list').children('li').length == 0) {
				$('#cal-list-title').hide();
			} else {
				$('#cal-list-title').show();
			}
		});
	});
	$('#cal-modal').on('shown.bs.modal', function() {
		$('#cal-embed-input').focus();
	});
	
	$('#cal-submit-btn').click(function() {
		var calembed = $('#cal-embed-input').val();
		if (calembed.indexOf('/cal/') >= 0) {
			$('#widgetBodycal').append('<a data-cal-do="embedcal" href="' + calembed + '"></a>');
		} else {
			$('#widgetBodycal').append('<a data-cal-do="embedBoard" data-cal-board-width="400" data-cal-scale-height="240" data-cal-scale-width="80" href="' + calembed + '"></a>');
		}
		//$('#cal-embed-input').val('');
		doBuild();
	});
	
    $('#calendarWidgetBtn').click(function() {
		$('#cal-modal').modal();
    });
});