var searchType = "Users";

function GetQueryStringParams(sParam) {
	// remove question mark
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
	return "";
}
function parseQuery(queryString) {
	var query = {};
	var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
}
function createSearchOptionMajor(optionvalue) {
	if (optionvalue === "") {
		return;
	}

	var majorInput = $("<input type='checkbox' name='searchmajor' value='" + optionvalue + "' checked/>").hide();
	var majorRemovable = $("<div class='removable'><span>" + optionvalue + "</span></div>").append(majorInput);
	var majorRemover = $("<button class='btn btn-xs btn-default'>x</button>").appendTo(majorRemovable).click(function () {
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
	$("<button class='btn btn-xs btn-default'>x</button>").appendTo(skillRemovable).click(function () {
		$(this).parent().remove();
	});

	$("#skillSearches").append(skillRemovable);
}

function fillSelectMajorOptions() {
	var majorOptGroup = $("optgroup[label='Majors']");

	for (var i = 0; i < major.length; i++) {
		majorOptGroup.append($("<option>" + major[i] + "</option>"));
	}
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

function createSearchResult(username, icon, firstName, lastName, description, tags) {
	var mainSearchDiv = $("<div></div>").addClass('search-result');
	var resultAnchor = $("<a></a>").addClass('search-result-pic-link').attr("href", "/profile/" + username);
	var userImage = $("<img></img>").addClass('search-result-pic').attr('src', icon);
	var resultTextOuterDiv = $("<div></div>").addClass('search-result-text');
	var resultTitle = $("<div></div>").addClass('search-result-title');
	var resultRedirect = $("<a></a>").addClass('search-result-pic-link').attr("href", "/profile/" + username).text(firstName + " " + lastName);
	var resultDescription = $("<div></div>").addClass('search-result-description').text(description);
	var resultTags = $("<div></div>").addClass('search-result-tags');
	for (i = 0; i < tags.length; i++) {
		var resultTagsSpan = $("<span></span>").addClass('search-result-tag').text(tags[i]);
		resultTags.append(resultTagsSpan);
	}
	resultTitle.append(resultRedirect);
	resultTextOuterDiv.append(resultTitle, resultDescription, resultTags)
	resultAnchor.append(userImage);
	mainSearchDiv.append(resultAnchor, resultTextOuterDiv);
	$('#search-results-container').append(mainSearchDiv);
}
$(function () {
	$("#leftNavSearch").addClass("theActive");
	var searchQuery = decodeURIComponent(GetQueryStringParams("query").replace(/\+/g, ' '));

	searchType = GetQueryStringParams("searchFilterGroup");
	$("#searchFilterGroup").val(searchType);

	$("#searchTabs li").removeClass("active");
	var tabIndex;
	switch(searchType) {
		case "projects":
		case "Projects":
			tabIndex = 1;
			$("#searchProject").parent().addClass("active");
			break;
		case "events":
		case "Events":
			tabIndex = 2;
			$("#searchEvent").parent().addClass("active");
		case "users":
		case "Users":
		default:
			tabIndex = 0;
			$("#searchUser").parent().addClass("active");
	}
	console.log("TabIndex is " + tabIndex);
	$("#searchTabs").tabs({
		active: tabIndex
	});

	$("#searchTerm").text(searchQuery);
	$("input[name='query']").attr("form", "search-filters");
	$("input[name='query']").val(searchQuery);
	$("#searchFilterFormSubmit").attr("form", "search-filters");

	fillSelectMajorOptions();

	$("[name='searchmusthavemajors']").change(function () {
		var optionvalue = $(this).val();

		// Disable duplicates
		if ($("input[name='searchmajor']").filter(function () {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			createSearchOptionMajor(optionvalue);

			$(this).prop('selectedIndex', 0);
		}
	});
	$("[name='searchmusthavemajors'] + span .btn").click(function () {
		var selector = $("[name='searchmusthavemajors']");
		var optionvalue = selector.val();

		if (optionvalue) {
			// Disable duplicates
			if ($("input[name='searchmajor']").filter(function () {
				return $(this).val().toLowerCase() === optionvalue.toLowerCase();
			}).length === 0) {
				createSearchOptionMajor(optionvalue);

				selector.prop('selectedIndex', 0);
			}
		}
	});


	$("[name='searchmusthaveskills']").on('input', function () {
		var optionvalue = $(this).val();

		// Disable duplicates
		if ($("select[name='searchmusthaveskills'] option").filter(function () {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length && $("input[name='searchskill']").filter(function () {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			createSearchOptionSkill(optionvalue);

			$(this).val('');
		}
	}).keypress(function (e) {
		if (e.which == 13) {
			var optionvalue = $(this).val();

			if (optionvalue.length > 0) {
				createSearchOptionSkill(optionvalue);

				$(this).val('');
			}
			e.preventDefault();
		}
	});
	$("[name='searchmusthaveskills'] + span .btn").click(function () {
		var selector = $("[name='searchmusthaveskills']");
		var optionvalue = selector.val();

		// Disable duplicates
		if ($("select[name='searchmusthaveskills'] option").filter(function () {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length && $("input[name='searchskill']").filter(function () {
			return $(this).val().toLowerCase() === optionvalue.toLowerCase();
		}).length === 0) {
			createSearchOptionSkill(optionvalue);

			selector.val('');
		}
	});

	$("form#search-filters").submit(function () {
		// Clear spaces
		var searchQuery = $("input[name='query']").val();
		searchQuery = searchQuery.replace(/[^A-Za-z0-9+#-]+/g, ' ').trim();
		$("input[name='query']").val(searchQuery);

		var majorInputs = $("<input type='hidden' name='searchlistmajors'/>");
		var skillInputs = $("<input type='hidden' name='searchlistskills'/>");

		majorInputs.val("[");
		$("input[name='searchmajor']").each(function () {
			majorInputs.val(majorInputs.val() + "\"" + $(this).val() + "\",");
			$(this).remove();
		});
		var majorInputsStringLength = majorInputs.val().length;
		majorInputs.val(majorInputs.val().slice(0, majorInputsStringLength - 1) + "]");
		skillInputs.val("[");
		$("input[name='searchskill']").each(function () {
			skillInputs.val(skillInputs.val() + "\"" + $(this).val() + "\",");
			$(this).remove();
		});
		var skillInputsStringLength = skillInputs.val().length;
		skillInputs.val(skillInputs.val().slice(0, skillInputsStringLength - 1) + "]");

		$(this).append(majorInputs, skillInputs);
		$("[name='searchmusthavemajors'], [name='searchmusthaveskills']").prop("disabled", true);
	});

	loadSearchFilters();

	$("#search-filter-hider").click(function () {
		$(this).toggleClass("search-filter-shower");
		$("#search-filter").toggleClass("search-filter-hided");
		if ($(".search-filter-shower").length) {
			$(this).text("Hide");
		} else {
			$(this).text("Show");
		}
	});

	modifyFilters();
});

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("searchUser").addEventListener("click", searchOption);
	document.getElementById("searchProject").addEventListener("click", searchOption);
	document.getElementById("searchEvent").addEventListener("click", searchOption);
})

function searchOption(e) {
	var el = e.target;
	$("#searchFilterGroup").val(el.textContent.toLowerCase());
	searchType = $("#searchFilterGroup").val();
	modifyFilters();
}

function modifyFilters() {
	switch(searchType) {
		case "projects":
		case "Projects":
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("disabled", true).parent().hide();
			$("#searchbyusername").prop("disabled", true).parent().hide();
			$("#searchbyprojectname").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyeventname").prop("disabled", true).parent().hide();
			$("#searchbyurl").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyskills + label").text("Tags");
			break;
		case "events":
		case "Events":	
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("disabled", true).parent().hide();
			$("#searchbyusername").prop("disabled", true).parent().hide();
			$("#searchbyprojectname").prop("disabled", false).parent().hide();
			$("#searchbyeventname").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyurl").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyskills + label").text("Tags");
			break;
		case "users":
		case "Users":
		default:
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyusername").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyprojectname").prop("disabled", true).parent().hide();
			$("#searchbyeventname").prop("disabled", true).parent().hide();
			$("#searchbyurl").prop("disabled", true).parent().hide();
			$("#searchbyskills + label").text("Skills");
			break;
	}
}