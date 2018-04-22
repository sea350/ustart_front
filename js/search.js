function GetQueryStringParams(sParam) {
	// remove question mark
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function createSearchOptionSkill(optionvalue) {
	var skillInput = $("<input type='checkbox' name='searchskill' value='" + optionvalue + "' checked/>").hide();
	var skillRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(skillInput);
	var skillRemover = $("<button class='btn btn-xs btn-default'>x</button>").appendTo(skillRemovable).click(function() {
		$(this).parent().remove();
	});
	
	$("#skillSearches").append(skillRemovable);
}

$(function() {
	$("#searchFilters").remove();
	$("#searchTerm").text(decodeURIComponent(GetQueryStringParams("query")));
	$("input[name='query']").attr("form", "search-filters");
	$("input[name='query']").val(decodeURIComponent(GetQueryStringParams("query")));
	$("#searchFilterFormSubmit").attr("form", "search-filters");
	
	
	$("#searchFilterGroupAll").change(function() {
		if ($(this).prop("checked")) {
			$("#searchbypersonname + label").parent().show();
			$("#searchbyusername + label").parent().show();
			$("#searchbyprojectname + label").parent().show();
			$("#searchbyurl + label").parent().show();
			$("#searchbyskills + label").text("Skills/Tags").parent().show();
			$("#searchbymembersneeded + label").parent().show();
		}
	});
	$("#searchFilterGroupUsers").change(function() {
		if ($(this).prop("checked")) {
			$("#searchbypersonname + label").parent().show();
			$("#searchbyusername + label").parent().show();
			$("#searchbyprojectname + label").parent().hide();
			$("#searchbyurl + label").parent().hide();
			$("#searchbyskills + label").text("Skills").parent().show();
			$("#searchbymembersneeded + label").parent().hide();
		}
	});
	$("#searchFilterGroupProjects").change(function() {
		if ($(this).prop("checked")) {
			$("#searchbypersonname + label").parent().hide();
			$("#searchbyusername + label").parent().hide();
			$("#searchbyprojectname + label").parent().show();
			$("#searchbyurl + label").parent().show();
			$("#searchbyskills + label").text("Tags").parent().show();
			$("#searchbymembersneeded + label").parent().show();
			
		}
	});
	$("#searchFilterGroupSkills").change(function() {
		if ($(this).prop("checked")) {
			$("#searchbypersonname + label").parent().hide();
			$("#searchbyusername + label").parent().hide();
			$("#searchbyprojectname + label").parent().hide();
			$("#searchbyurl + label").parent().hide();
			$("#searchbyskills + label").text("Tags").parent().hide();
			$("#searchbymembersneeded + label").parent().hide();
		}
	});
	
	switch(GetQueryStringParams("searchFilterGroup")) {
		case "users":
			$("#searchFilterGroupUsers").attr("checked", "checked").trigger("change");
			break;
		case "projects":
			$("#searchFilterGroupProjects").attr("checked", "checked").trigger("change");
			break;
		case "skills":
			$("#searchFilterGroupSkills").attr("checked", "checked").trigger("change");
			break;
		default:
			$("#searchFilterGroupAll").attr("checked", "checked").trigger("change");
			break;
	}
	
	$("[name='searchmusthavemajors']").change(function() {
		var optionvalue = $(this).val();
		
		// Disable duplicates
		if ($("input[name='searchmajor']").filter(function() {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			var majorInput = $("<input type='checkbox' name='searchmajor' value='" + optionvalue + "' checked/>").hide();
			var majorRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(majorInput);
			var majorRemover = $("<button class='btn btn-xs btn-default'>x</button>").appendTo(majorRemovable).click(function() {
				$(this).parent().remove();
			});
			
			$("#majorSearches").append(majorRemovable);
			
			$(this).prop('selectedIndex', 0);
		}
	});
	
	$("[name='searchmusthaveskills']").on('input', function() {
		var optionvalue = $(this).val();
		
		// Disable duplicates
		if ($("select[name='searchmusthaveskills'] option").filter(function(){
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length && $("input[name='searchskill']").filter(function() {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			createSearchOptionSkill(optionvalue);
			
			$(this).val('');
		}
	}).keypress(function(e) {
		if (e.which == 13) {
			var optionvalue = $(this).val();
			
			if (optionvalue.length > 0) {
				createSearchOptionSkill(optionvalue);
			
				$(this).val('');
			}
			e.preventDefault();
		}
	});
	
	$("form#search-filters").submit(function() {
		var majorInputs = $("<input type='hidden' name='searchlistmajors'/>");
		var skillInputs = $("<input type='hidden' name='searchlistskills'/>");
		
		majorInputs.val("[");
		$("input[name='searchmajor']").each(function() {
			majorInputs.val(majorInputs.val() + "\"" + $(this).val() + "\",");
			$(this).remove();
		});
		var majorInputsStringLength = majorInputs.val().length;
		majorInputs.val(majorInputs.val().slice(0, majorInputsStringLength - 1) + "]");
		skillInputs.val("[");
		$("input[name='searchskill']").each(function() {
			skillInputs.val(skillInputs.val() + "\"" + $(this).val() + "\",");
			$(this).remove();
		});
		var skillInputsStringLength = skillInputs.val().length;
		skillInputs.val(skillInputs.val().slice(0, skillInputsStringLength - 1) + "]");
		
		$(this).append(majorInputs, skillInputs);
		$("[name='searchmusthavemajors'], [name='searchmusthaveskills']").attr("disabled", "disabled");
	});
});