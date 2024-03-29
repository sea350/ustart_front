var taglist = [];
var skilllist = [];
var MAXTAGS = 16;
var port=window.location.port;
const maxTagLength = 20;

function updateTagsCounter(element) {
	if (taglist.length == MAXTAGS - 1) {
		$(element).html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
		//$('#tagCountIndicator').html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
	} else {
		$(element).html("" + (MAXTAGS - taglist.length) + " Tags Remaining");
	}
}

function updateSkillsCounter(element) {
	if (skilllist.length == MAXTAGS - 1) {
		$(element).html("" + (MAXTAGS - skilllist.length) + " Tag Remaining");
		//$('#tagCountIndicator').html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
	} else {
		$(element).html("" + (MAXTAGS - skilllist.length) + " Tags Remaining");
	}
}

/*function addTag(element, tag) {
	//if (!$("#addTagButton").prop("disabled")) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			createTagElement(tag);
			$(element).val("");
			//$('#tagLineInput').val("");
			createTagWidgetElement(tag);
		}
	//}
}*/

function createTagWidgetElement(element, tag) {
    var tagspan = $('<button/>').attr({'id': 'skill-'+ tag, 'class': 'btn btn-default projectsColumn'}).click(function() {
        window.location.href='https://ustart.today:'+window.location.port+'/search?query=&searchFilterGroup=projects&sortbyfilter=relevance&searchbyprojectname=true&searchbyurl=true&searchbyskills=true&searchbylocationcountry=&usersearchlocationcountry=United+States&usersearchlocationstate=&usersearchlocationstate=NY&searchlistmajors=%5D&searchlistskills=%5B%22'+tag+'%22%5D'
    });
    var colDiv = $('<div />').attr({'class': 'columnImage'});
    var colTitle = $('<div />').attr({'class': 'columnTitle'}).text(tag);
    colDiv.append(colTitle);
    tagspan.append(colDiv);
	//var tagHTML = `
			//<button class="btn btn-default projectsColumn" id="skill-`+ tag + `">
			//	<div class="columnImage">
					//<div class="columnTitle">`+tag+`</div>
			//	</div>
		//	</button>
			//`;
	if ($(element).find(".projectsColumn").length === 0) {
		$(element).html("");
	}
	$(element).append(tagspan);
//	taglist.push(tag);
//	if (taglist.length >= 16) {
//		$('#tagModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
//	}
//	console.log('REturn')
}

function createProjectTagWidgetElement(element, tag) {
    var tagspan = $('<button/>').attr({'id': 'skill-'+ tag, 'class': 'btn btn-default projectsColumn'}).click(function() {
        window.location.href='https://ustart.today:'+window.location.port+'/search?query=&searchFilterGroup=users&sortbyfilter=relevance&searchbyprojectname=true&searchbyurl=true&searchbyskills=true&searchbylocationcountry=&usersearchlocationcountry=United+States&usersearchlocationstate=&usersearchlocationstate=NY&searchlistmajors=%5D&searchlistskills=%5B%22'+tag+'%22%5D'
    });
    var colDiv = $('<div />').attr({'class': 'columnImage'});
    var colTitle = $('<div />').attr({'class': 'columnTitle'}).text(tag);
    colDiv.append(colTitle);
    tagspan.append(colDiv);
	//var tagHTML = `
			//<button class="btn btn-default projectsColumn" id="skill-`+ tag + `">
			//	<div class="columnImage">
					//<div class="columnTitle">`+tag+`</div>
			//	</div>
		//	</button>
			//`;
	if ($(element).find(".projectsColumn").length === 0) {
		$(element).html("");
	}
	$(element).append(tagspan);
//	taglist.push(tag);
//	if (taglist.length >= 16) {
//		$('#tagModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
//	}
//	console.log('REturn')
}

function removeTag(tagElement) {
	taglist.splice($.inArray($(tagElement).siblings().children('.columnTitle').text()),1);
	$(tagElement).parent().remove();
	updateTagsCounter("#tagCountIndicator");
}

function removeSkill(tagElement) {
	taglist.splice($.inArray($(tagElement).siblings().children('.columnTitle').text()),1);
	$(tagElement).parent().remove();
	updateSkillsCounter('#wantedSkillCountIndicator');
}

function createTagModalElement(tag) {
	if (tag == "") {
		$('#tag-submit, #tag-project-submit', "#wantedSkill-project-submit").click();
	}
	
	var tagArray = tag.split(',');
	tagArray.forEach(function(tag) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			if (taglist.length == 0) {
				$("#hashtags").html("");
			}
            var tagspan = $('<span />').attr({'id': 'skill-'+ tag, 'class': 'btn btn-default projectsColumn'});
            var colDiv = $('<div />').attr({'class': 'columnImage'});
            var colTitle = $('<div />').attr({'class': 'columnTitle'}).text(tag);
            var deleteTagBtn = $('<div />').attr({'class': 'deleteTagBtn', 'onClick':"removeTag(this)"}).text('x');
            
            colDiv.append(colTitle);
            tagspan.append(deleteTagBtn, colDiv);
			//var tagHTML = `
					//<span name="instaURL" class="btn btn-default projectsColumn" id="skill-`+ tag + `" value="`+ tag +`">
						//<div class="deleteTagBtn" onclick="removeTag(this)">x</div>
						//<div class="columnImage">
							//<div class="columnTitle">`+tag+`</div>
						//</div>
					//</span>
					//`;
			$("#hashtags").append(tagspan);
			taglist.push(tag);
			if (taglist.length >= 16) {
				$('#tagModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
			}
		}
		updateTagsCounter("#tagCountIndicator");
		$('#tagLineInput').val('');
		$('#tag-submit, #tag-project-submit').text('Done');
	});
}

function createSkillModalElement(tag) {
	if (tag == "") {
		$("#wantedSkill-project-submit").click();
	}
	var tagArray = tag.split(',');
	tagArray.forEach(function(tag) {
		if (tag != "" && skilllist.length < 16 && $.inArray(tag.toUpperCase(), skilllist) == -1) {
			if (skilllist.length == 0) {
				$("#hashskills").html("");
			}
            var tagspan = $('<span />').attr({'id': 'skill-'+ tag, 'class': 'btn btn-default projectsColumn'});
            var colDiv = $('<div />').attr({'class': 'columnImage'});
            var colTitle = $('<div />').attr({'class': 'columnTitle'}).text(tag);
            var deleteTagBtn = $('<div />').attr({'class': 'deleteTagBtn', 'onClick':"removeSkill(this)"}).text('x');
            
            colDiv.append(colTitle);
            tagspan.append(deleteTagBtn, colDiv);
			//var tagHTML = `
					//<span name="instaURL" class="btn btn-default projectsColumn" id="skill-`+ tag + `" value="`+ tag +`">
						//<div class="deleteTagBtn" onclick="removeTag(this)">x</div>
						//<div class="columnImage">
							//<div class="columnTitle">`+tag+`</div>
						//</div>
					//</span>
					//`;
			$("#hashskills").append(tagspan);
			skilllist.push(tag);
			if (skilllist.length >= 16) {
				$('#wantedSkillModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
			}
		}
		updateSkillsCounter('#wantedSkillCountIndicator');
		$('#wantedSkillLineInput').val('');
		$('#wantedSkill-project-submit').text('Done');
	});
}


function resetSkillModal(taggerElement) {
	$(taggerElement).html("");
	skilllist = [];
	var tagList = $(taggerElement + 'Body .columnTitle');
	tagList.each(function(index, element) {
		createSkillModalElement($(element).text());
	});
	
	updateSkillsCounter('#wantedSkillCountIndicator');
	
	$(taggerElement + ' .deleteTagBtn').click(function() {
		removeSkill(this);
	});
	
	if ($(taggerElement).html() === "") {
		$(taggerElement).html("You haven't added tags yet.");
	}
}

function resetTagModal(taggerElement) {
	$(taggerElement).html("");
	taglist = [];
	var tagList = $(taggerElement + 'Body .columnTitle');
	tagList.each(function(index, element) {
		createTagModalElement($(element).text());
	});
	
	updateTagsCounter("#tagCountIndicator");
	
	$(taggerElement + ' .deleteTagBtn').click(function() {
		removeTag(this);
	});
	
	if ($(taggerElement).html() === "") {
		$(taggerElement).html("You haven't added tags yet.");
	}
}

$(document).ready(function () {
	$('#tagLineInput').keypress(function (e) {
		if (e.which == 13 || e.which == 44) {
            if ($('#tagLineInput').val().length > 0 && $('#tagLineInput').val().length <= 20 ) {
            var dupCheck =[]
            $('#hashTags .columnTitle').each(function(index, element) {
                dupCheck.push($(element).text());
            });
            if(jQuery.inArray($('#tagLineInput').val(), dupCheck) != -1) {
                console.log("is in array");
                e.preventDefault();
            } else {
                console.log("is NOT in array");
                createTagModalElement($('#tagLineInput').val());
			    e.preventDefault();
            } 
		  }
		}
	}).on('input', function(e) {
		if ($(this).val().length > 0) {
			$('#tag-submit, #tag-project-submit').text('Add');
		} else {
			$('#tag-submit, #tag-project-submit').text('Done');
		}
	});
    
    $('#tagLineInput').keyup(function (e) {
       var length = $(this).val().length;
       var length = maxTagLength-length;
        $('#count_message').text(length +" characters remaining.");
    });
    
    $('#wantedSkillLineInput').keyup(function (e) {
       var length = $(this).val().length;
       var length = maxTagLength-length;
        $('#skill_count_message').text(length +" characters remaining.");
    });
    
    $('#wantedSkillLineInput').keypress(function (e) {
		if (e.which == 13 || e.which == 44) {
            if ($('#wantedSkillLineInput').val().length > 0  && $('#wantedSkillLineInput').val().length <= 20) {
                var dupCheck =[]
                $('#hashskills .columnTitle').each(function(index, element) {
                    dupCheck.push($(element).text());
                });
                if(jQuery.inArray($('#wantedSkillLineInput').val(), dupCheck) != -1) {
                    console.log("is in array");
                     e.preventDefault();
                } else {
                    console.log("is NOT in array");
                    createSkillModalElement($('#wantedSkillLineInput').val());
                     e.preventDefault();
                }
            }
		}
	}).on('input', function(e) {
		if ($(this).val().length > 0) {
			$('#wantedSkill-project-submit').text('Add');
		} else {
			$('#wantedSkill-project-submit').text('Done');
		}
	});

	$('#tagModal').on('show.bs.modal', function() { resetTagModal("#hashTags"); });
	$('#wantedSkillModal').on('show.bs.modal', function() { resetSkillModal("#hashskills"); });

	
    $('#tag-submit').click(function(e) {
		if ($('#tagLineInput').val().length > 0  &&  $('#tagLineInput').val().length <= 20 ) {
			 var dupCheck =[]
            $('#hashTags .columnTitle').each(function(index, element) {
                dupCheck.push($(element).text());
            });
            if(jQuery.inArray($('#tagLineInput').val(), dupCheck) != -1) {
                console.log("is in array");
                return;
            } else {
                console.log("is NOT in array");
                createTagModalElement($('#tagLineInput').val());
			    return;
            }
		}
		
        var skillList = [];
        $('#hashTags .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',  
            url: 'https://ustart.today:'+port+'/addSkill/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillList)},
            success: function(data) {
                $("#hashtags, #hashTagsBody").html('');
                $(skillList).each(function(index, element) {
                var tag = element;
					createTagWidgetElement("#hashTagsBody", tag);
                });
                $("#tagModal").modal('hide');
            }
        });
    });
    $('#tag-project-submit').click(function(e) {
		if ($('#tagLineInput').val().length > 0 && $('#tagLineInput').val().length <= 20 ) {
            var dupCheck =[]
            $('#hashTags .columnTitle').each(function(index, element) {
                dupCheck.push($(element).text());
            });
            if(jQuery.inArray($('#tagLineInput').val(), dupCheck) != -1) {
                console.log("is in array");
                return;
            } else {
                console.log("is NOT in array");
                createTagModalElement($('#tagLineInput').val());
			    return;
            } 
		}
        var skillList = [];
        $('#hashTags .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',
            url: 'https://ustart.today:'+port+'/UpdateProjectTags/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillList), projectWidget: $('#tagModal .projectWidget').val()},
            success: function(data) {
                
                $("#hashtags, #hashTagsBody").html('');
				$('#tag-project-submit').text('Done');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createProjectTagWidgetElement("#hashTagsBody", tag);
                });
                $("#tagModal").modal('hide');
            }
        });
    });
    $('#wantedSkill-project-submit').click(function(e) {
		if ($('#wantedSkillLineInput').val().length > 0  && $('#wantedSkillLineInput').val().length <= 20) {
            var dupCheck =[]
            $('#hashskills .columnTitle').each(function(index, element) {
                dupCheck.push($(element).text());
            });
            if(jQuery.inArray($('#wantedSkillLineInput').val(), dupCheck) != -1) {
                console.log("is in array");
                return;
            } else {
                console.log("is NOT in array");
                createSkillModalElement($('#wantedSkillLineInput').val());
			    return;
            }
		}
        var skillNeededList = [];
        $('#hashskills .columnTitle').each(function(index, element) {
           skillNeededList.push($(element).text());
        });
        $.ajax({
            type: 'GET',
            url: 'https://ustart.today:'+port+'/UpdateProjectWantedSkills/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillNeededList), projectWidget: $('#wantedSkillModal .projectWidget').val()},
            success: function(data) {
                console.log("here");
                $("#hashskills, #hashskillsBody").html('');
				$('#wantedSkill-project-submit').text('Done');
                console.log(skillNeededList);
                $(skillNeededList).each(function(index, element) {
                    var tag = element;
					createProjectTagWidgetElement("#hashskillsBody", tag);
                });
                $("#wantedSkillModal").modal('hide');
            }
        });
    });
});
