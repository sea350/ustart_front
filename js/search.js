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
	return "";
}

function createSearchOptionMajor(optionvalue) {
	if (optionvalue === "") {
		return;
	}
	
	var majorInput = $("<input type='checkbox' name='searchmajor' value='" + optionvalue + "' checked/>").hide();
	var majorRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(majorInput);
	var majorRemover = $("<button class='btn btn-xs btn-default'>x</button>").appendTo(majorRemovable).click(function() {
		$(this).parent().remove();
	});
	
	$("#majorSearches").append(majorRemovable);
}

function createSearchOptionSkill(optionvalue) {
	if (optionvalue === "") {
		return;
	}
	
	var skillInput = $("<input type='checkbox' name='searchskill' value='" + optionvalue + "' checked/>").hide();
	var skillRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(skillInput);
	var skillRemover = $("<button class='btn btn-xs btn-default'>x</button>").appendTo(skillRemovable).click(function() {
		$(this).parent().remove();
	});
	
	$("#skillSearches").append(skillRemovable);
}

function loadSearchFilters() {
	$("input[name='sortbyfilter'][value='" + GetQueryStringParams("sortbyfilter") + "']").prop("checked", true);
	
	$("#searchbypersonname").prop('checked', GetQueryStringParams("searchbypersonname"));
	$("#searchbyusername").prop('checked', GetQueryStringParams("searchbyusername"));
	$("#searchbyprojectname").prop('checked', GetQueryStringParams("searchbyprojectname"));
	$("#searchbyurl").prop('checked', GetQueryStringParams("searchbyurl"));
	$("#searchbyskills").prop('checked', GetQueryStringParams("searchbyskills"));
	$("#searchbymembersneeded").prop('checked', GetQueryStringParams("searchbymembersneeded"));
	
	var majorList = decodeURIComponent(GetQueryStringParams("searchlistmajors").replace('+', ' '));
	majorList = majorList.substr(1, majorList.length - 2).split(",");
	for (var i = 0; i < majorList.length; i++) {
		createSearchOptionMajor(majorList[i].substr(1, majorList[i].length - 2));
	}
	
	var skillList = decodeURIComponent(GetQueryStringParams("searchlistskills").replace('+', ' '));
	skillList = skillList.substr(1, skillList.length - 2).split(",");
	for (var i = 0; i < skillList.length; i++) {
		createSearchOptionSkill(skillList[i].substr(1, skillList[i].length - 2));
	}
}

$(function() {
	var searchQuery = decodeURIComponent(GetQueryStringParams("query").replace('+', ' '));
	
	$("#searchFilters").remove();
	$("#searchTerm").text(searchQuery);
	$("input[name='query']").attr("form", "search-filters");
	$("input[name='query']").val(searchQuery);
	$("#searchFilterFormSubmit").attr("form", "search-filters");
	
	$("#searchFilterGroupUsers").change(function() {
		if ($(this).prop("checked")) {
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("disabled", false).parent().show();
			$("#searchbyusername").prop("disabled", false).parent().show();
			$("#searchbyprojectname").prop("disabled", true).parent().hide();
			$("#searchbyurl").prop("disabled", true).parent().hide();
			$("#searchbyskills").prop("disabled", false).parent().show();
			$("#searchbyskills + label").text("Skills");
			$("#searchbymembersneeded").prop("disabled", true).parent().hide();
		}
	});
	$("#searchFilterGroupProjects").change(function() {
		if ($(this).prop("checked")) {
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("disabled", true).parent().hide();
			$("#searchbyusername").prop("disabled", true).parent().hide();
			$("#searchbyprojectname").prop("disabled", false).parent().show();
			$("#searchbyurl").prop("disabled", false).parent().show();
			$("#searchbyskills").prop("disabled", false).parent().show();
			$("#searchbyskills + label").text("Tags");
			$("#searchbymembersneeded").prop("disabled", false).parent().show();
			
		}
	});
	$("#searchFilterGroupSkills").change(function() {
		if ($(this).prop("checked")) {
			$("#filter-adv-search").parents(".panel-group").hide();
			$("#searchbypersonname").prop("disabled", true).parent().hide();
			$("#searchbyusername").prop("disabled", true).parent().hide();
			$("#searchbyprojectname").prop("disabled", true).parent().hide();
			$("#searchbyurl").prop("disabled", true).parent().hide();
			$("#searchbyskills").prop("disabled", true).parent().hide();
			$("#searchbymembersneeded").prop("disabled", true).parent().hide();
		}
	});
	
	switch(GetQueryStringParams("searchFilterGroup")) {
		case "users":
			$("#searchFilterGroupUsers").attr("checked", "checked").trigger("change");
			break;
		case "projects":
			$("#searchFilterGroupProjects").attr("checked", "checked").trigger("change");
			break;
		default:
			$("#searchFilterGroupSkills").attr("checked", "checked").trigger("change");
			break;
	}
	
	$("[name='searchmusthavemajors']").change(function() {
		var optionvalue = $(this).val();
		
		// Disable duplicates
		if ($("input[name='searchmajor']").filter(function() {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			createSearchOptionMajor(optionvalue);
			
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
		$("[name='searchmusthavemajors'], [name='searchmusthaveskills']").prop("disabled", true);
	});
	
	loadSearchFilters();
	
	$("#search-filter-hider").click(function() {
		$(this).toggleClass("search-filter-shower");
		$("#search-filter").toggleClass("search-filter-hided");
		if($(".search-filter-shower").length) {
			$(this).text("Hide");
		} else {
			$(this).text("Show");
		}
	});
});