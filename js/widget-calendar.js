$(document).ready(function() {
	
    $('#calendarWidgetBtn').click(function() {
		if($('#cal-modal').length > 0) {
			$('html, body').animate({
				scrollTop: $("#cal-modal").parents('li').offset().top - 50
				}, widgetScrollSpeed, function() {
					$('#cal-modal').modal();
				});
			return;
		}
        var htmlText = `<li class="ui-state-default widgetListItem sortable">
                            <div class="projectsWidgetCont">
                            <div class="widgetTitle">
                                <span class="pull-right fa fa-2x fa-sort"></span>
                                <span class="pull-right fa fa-2x fa-trash"></span>
                                <span class="pull-right fa fa-2x fa-pencil" id="cal-edit" data-toggle="modal" data-target="#cal-modal"></span>
                                <h4>
                                    Calendar
                                </h4>
                            </div>

                            <div class="modal fade" id="cal-modal" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Edit Calendar</h4>
                                        </div>
                                        <div class="modal-body">
											<span id="cal-list-title">Removable cals</span>
											<ul id="cal-edit-list"></ul>
                                            <p>Add events here:</p>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="cal-embed-input">

                                            </div>
											Incomplete :D
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" id="cal-submit-btn" class="btn btn-default" data-dismiss="modal">Submit</button>

                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div id="widgetBodycal" class="widgetBody">
								<div id="widgetCalendar"></div>
                            </div>
                        </div>
                        </li>

                        `;
        addWidgetByHTML(htmlText);
		$('#widgetCalendar').datepicker();
        $('#cal-submit-btn').click(function() {
            var calembed = $('#cal-embed-input').val();
			if (calembed.indexOf('/cal/') >= 0) {
				$('#widgetBodycal').append('<a data-cal-do="embedcal" href="' + calembed + '"></a>');
			} else {
				$('#widgetBodycal').append('<a data-cal-do="embedBoard" data-cal-board-width="400" data-cal-scale-height="240" data-cal-scale-width="80" href="' + calembed + '"></a>');
			}
            $('#cal-embed-input').val('');
			doBuild();
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
			
			// Add the Remove functionality for each Instagram Item
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
		$('#cal-modal').modal();
    });
});