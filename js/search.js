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

function fillSelectCategoriesOptions() {
	var categoryOptGroup = $("optgroup[label='Categories']");
    for (var i = 0; i < category.length; i++) {
		categoryOptGroup.append($("<option>" + category[i] + "</option>"));
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

function createSearchResult(username, icon, firstName, lastName, description, tags, target) {
	var mainSearchDiv = $("<div></div>").addClass('search-result');
    if (target =="searchProject"){
        var resultAnchor = $("<a></a>").addClass('search-result-pic-link').attr("href", "/Projects/" + username);
        var resultRedirect = $("<a></a>").addClass('search-result-pic-link').attr("href", "/Projects/" + username).text(firstName + " " + lastName);
    }
    else if (target =="searchUser"){
	var resultAnchor = $("<a></a>").addClass('search-result-pic-link').attr("href", "/profile/" + username);
        var resultRedirect = $("<a></a>").addClass('search-result-pic-link').attr("href", "/profile/" + username).text(firstName + " " + lastName);
    }
    else{
        var resultAnchor = $("<a></a>").addClass('search-result-pic-link').attr("href", "/Event/" + username);
        var resultRedirect = $("<a></a>").addClass('search-result-pic-link').attr("href", "/Event/" + username).text(firstName + " " + lastName);
    }
	var userImage = $("<img></img>").addClass('search-result-pic').attr('src', icon);
	var resultTextOuterDiv = $("<div></div>").addClass('search-result-text');
	var resultTitle = $("<div></div>").addClass('search-result-title');
	var resultDescription = $("<div></div>").addClass('search-result-description').text(description);
	var resultTags = $("<div></div>").addClass('search-result-tags');
	resultTitle.append(resultRedirect);
    if(tags != null){
        for (i = 0; i < tags.length; i++) {
            var resultTagsSpan = $("<span></span>").addClass('search-result-tag').text(tags[i]);
            resultTags.append(resultTagsSpan);
        }
    }
	resultTextOuterDiv.append(resultTitle, resultDescription, resultTags)
	resultAnchor.append(userImage);
	mainSearchDiv.append(resultAnchor, resultTextOuterDiv);
	$('#search-results-container').append(mainSearchDiv);
}
$(function () {
    
    //search switching tabs
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("id")
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
        var result = $('form#search-filters').serialize();
        window.history.pushState("", "", "/search?"+result);
        var url = document.createElement('a');
        url.href = window.location.href;
        var temp = parseQuery(url.search);
        scroll='';
        $.ajax({
            type: 'GET',
            url: 'http://ustart.today:'+port+'/AjaxLoadNext/',
            contentType: "application/json; charset=utf-8",
            data: {query: temp.query, searchFilterGroup:temp.searchFilterGroup,searchlistmajors:temp.searchlistmajors, searchlistskills:temp.searchlistskills, searchbyprojectname:temp.searchbyprojectname, searchbyurl:temp.searchbyurl, searchbymembersneeded:temp.searchbymembersneeded, searchbyskills:temp.searchbyskills, searchbyeventname: temp.searchbyeventname, searchbyurl: temp.searchbyurl, scrollID: scroll, searchbymembers: temp.searchbymembers, searchbyguests: temp.searchbyguests, searchbypersonname: temp.searchbypersonname, searchbyusername:temp.searchbyusername},
             beforeSend: function() {
               $('#search-results-container').empty();
               $('#search-results-container').prepend('<div class="loader" ></div>');
           },
            success: function(data) {  
            },complete: function (jqXHR,status) {
                 if(status == 'success' || status=='notmodified')
                 {
                    var tem = $.parseJSON(jqXHR.responseText);
                    if(tem != null){
                        scroll = tem.ScrollID;
                        totalHits=tem.TotalHits;
                        $('#search-results-container').find(".loader").css("display", "none");
                        for(var j=0; j<tem.Results.length; j++){
                            createSearchResult (tem.Results[j].Username, tem.Results[j].Image, tem.Results[j].FirstName, tem.Results[j].LastName, readRuneArrayThatWorks(tem.Results[j].Bio), tem.Results[j].Tags, target);
                        }
                    }
                 }
            },error: function(err) {
                console.log('tab switch Load failed: ');
                console.log(err);
            }
        });
    });
    
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
			break;
		case "users":
		case "Users":
		default:
			tabIndex = 0;
			$("#searchUser").parent().addClass("active");
			break;
	}
	$("#searchTabs").tabs({
          active: tabIndex
	});
    
	$("#searchTerm").text(searchQuery);
	$("input[name='query']").attr("form", "search-filters");
	$("input[name='query']").val(searchQuery);
	$("#searchFilterFormSubmit").attr("form", "search-filters");

	//fillSelectMajorOptions();

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
    
    
    function showAndDismissAlert(type, message) {
    var htmlAlert = '<div class="alert alert-' + type + '">' + message + '</div>';

        // Prepend so that alert is on top, could also append if we want new alerts to show below instead of on top.
        $(".alert-messages").prepend(htmlAlert);

        // Since we are prepending, take the first alert and tell it to fade in and then fade out.
        // Note: if we were appending, then should use last() instead of first()
        $(".alert-messages .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
    }
    
    
    
    /*$("button#filApply").click(function (e) {
        e.preventDefault();
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
        //$("[name='searchmusthavemajors'], [name='searchmusthaveskills']").prop("disabled", true);
        
        var result = $('form#search-filters').serialize();
        console.log(result);
        window.history.pushState("", "", "/search?"+result);
         showAndDismissAlert('success', 'Your changes have been applied!');
    });*/
    
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
			$("#searchbyskills + label").text("Skills Wanted");
             $("label[for='searchmusthaveskills']").text("Add Tags");
            $("optgroup[label='Majors']").empty().css("display", "none");
            $("optgroup[label='Categories']").empty().css("display", "block");
            //remove this when ready
            $("#filOptions").css("display", "none");
            fillSelectCategoriesOptions();
			break;
		case "events":
		case "Events":	
			$("#filter-adv-search").parents(".panel-group").show();
			$("#searchbypersonname").prop("disabled", true).parent().hide();
			$("#searchbyusername").prop("disabled", true).parent().hide();
			$("#searchbyprojectname").prop("disabled", false).parent().hide();
			$("#searchbyeventname").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyurl").prop("checked", true).prop("disabled", false).parent().show();
			$("#searchbyskills + label").text("Skills Wanted");
            $("label[for='searchmusthaveskills']").text("Add Tags");
            $("optgroup[label='Majors']").empty().css("display", "none");
            $("optgroup[label='Categories']").empty().css("display", "block");
            //remove this when ready
            $("#filOptions").css("display", "none");
            fillSelectCategoriesOptions();
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
            $("label[for='searchmusthaveskills']").text("Add Skills");
            $("optgroup[label='Categories']").empty().css("display", "none");
            $("optgroup[label='Majors']").empty().css("display", "block");
             //remove this when ready
            $("#filOptions").css("display", "none");
            fillSelectMajorOptions();
			break;
	}
}


//search load more
function element_in_scroll(elem)
 {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
 }
(function($, window, undefined) {
    var InfiniteScroll = function() {
        this.initialize = function() {
            this.setupEvents();
        };

        this.setupEvents = function() {
            $(window).on(
                'scroll',
                this.handleScroll.bind(this)
            );
        };

        this.handleScroll = function() {
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var height = $(document).height() - windowHeight;
            var scrollPercentage = (scrollTop / height);

            // if the scroll is more than 90% from the top, load more content.
            if(scrollPercentage > 0.95) {
                this.doSomething();
            }
        }

        this.doSomething = function() {    
            // Do something.
          if (flag == 1){
                 var url = document.createElement('a');
                 url.href = window.location.href;
                 var temp = parseQuery(url.search);
                 flag=0;
                 if ( $('.search-result').length < totalHits){
                     $.ajax({
                        type: 'GET',
                        url: 'http://ustart.today:'+port+'/AjaxLoadNext/',
                        contentType: "application/json; charset=utf-8",
                        data: {query: temp.query, searchFilterGroup:temp.searchFilterGroup,searchlistmajors:temp.searchlistmajors, searchlistskills:temp.searchlistskills, searchbyprojectname:temp.searchbyprojectname, searchbyurl:temp.searchbyurl, searchbymembersneeded:temp.searchbymembersneeded, searchbyskills:temp.searchbyskills, searchbyeventname: temp.searchbyeventname, searchbyurl: temp.searchbyurl, scrollID: scroll, searchbymembers: temp.searchbymembers, searchbyguests: temp.searchbyguests, searchbypersonname: temp.searchbypersonname, searchbyusername:temp.searchbyusername},
                        success: function(data) {  
                        },complete: function (jqXHR,status) {
                             flag=1;
                             if(status == 'success' || status=='notmodified')
                             {
                                var temp = $.parseJSON(jqXHR.responseText);
                                var target= $('a[data-toggle="tab"]').parent('.active').children().attr('id');
                                if(temp != null){
                                    for(var i=0; i<temp.Results.length; i++){
                                        createSearchResult (temp.Results[i].Username, temp.Results[i].Image, temp.Results[i].FirstName, temp.Results[i].LastName, readRuneArrayThatWorks(temp.Results[i].Bio), temp.Results[i].Tags,target);
                                    }
                                }
                             }
                        },error: function(err) {
                            console.log('search Load failed: ');
                            console.log(err);
                        }
                    });
                }
               else flag=1;   
         }
        }

        this.initialize();
    }

    $(document).ready(function() {// Initialize scroll
            new InfiniteScroll();
    });
})(jQuery, window);