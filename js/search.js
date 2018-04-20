$(function() {
	$("[name='searchmajors']").change(function() {
		var optionvalue = $(this).val();
		
		var majorInput = $("<input type='checkbox' value='" + optionvalue + "' checked/>").hide();
		var majorRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(majorInput);
		var majorRemover = $("<button class='btn btn-default'>x</button>").appendTo(majorRemovable).click(function() {
			$(this).parent().remove();
		});
		
		$("#majorSearches").append(majorRemovable);
		
		$(this).prop('selectedIndex', 0);
	});
	
	$("[name='searchmusthaveskills']").on('input', function() {
		var optionvalue = $(this).val();
		
		if ($("select[name='searchmusthaveskills'] option").filter(function(){
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();;
		}).length) {
			var skillInput = $("<input type='checkbox' value='" + optionvalue + "' checked/>").hide();
			var skillRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(skillInput);
			var skillRemover = $("<button class='btn btn-default'>x</button>").appendTo(skillRemovable).click(function() {
				$(this).parent().remove();
			});
			
			$("#skillSearches").append(skillRemovable);
			
			$(this).val('');
		}
	});
});