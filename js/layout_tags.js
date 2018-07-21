var taglist = [];
var MAXTAGS = 16;
var port=5002;

function updateTagsCounter(element) {
	if (taglist.length == MAXTAGS - 1) {
		$(element).html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
		//$('#tagCountIndicator').html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
	} else {
		$(element).html("" + (MAXTAGS - taglist.length) + " Tags Remaining");
	}
}

function addTag(element, tag) {
	//if (!$("#addTagButton").prop("disabled")) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			createTagElement(tag);
			$(element).val("");
			//$('#tagLineInput').val("");
			createTagWidgetElement(tag);
		}
	//}
}

function createTagWidgetElement(element, tag) {
    var tagspan = $('<button/>').attr({'id': 'skill-'+ tag, 'class': 'btn btn-default projectsColumn'});
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
	updateTagsCounter();
}

function createTagModalElement(tag) {
	if (tag == "") {
		$('#tag-submit, #tag-project-submit').click();
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
		updateTagsCounter();
		$('#tagLineInput').val('');
		$('#tag-submit, #tag-project-submit').text('Done');
	});
}

function resetTagModal(taggerElement) {
	$(taggerElement).html("");
	taglist = [];
	
	var tagList = $(taggerElement + 'Body .columnTitle');
	tagList.each(function(index, element) {
		createTagModalElement($(element).text());
	});
	
	updateTagsCounter();
	
	$(taggerElement + ' .deleteTagBtn').click(function() {
		removeTag(this);
	});
	
	if ($(taggerElement).html() === "") {
		$(taggerElement).html("You haven't added tags yet.");
	}
}

$(document).ready(function () {
	$('#tagLineInput, #wantedSkillLineInput').keypress(function (e) {
		if (e.which == 13 || e.which == 44) {
			createTagModalElement($(this).val());
			e.preventDefault();
		}
	}).on('input', function(e) {
		if ($(this).val().length > 0) {
			$('#tag-submit, #tag-project-submit, #wantedSkill-project-submit').text('Add');
		} else {
			$('#tag-submit, #tag-project-submit, #wantedSkill-project-submit').text('Done');
		}
	});

	$('#tagModal').on('show.bs.modal', function() { resetTagModal("#hashTags"); });
	$('#wantedSkillModal').on('show.bs.modal', function() { resetTagModal("#wantedSkill"); });

	
    $('#tag-submit').click(function(e) {
		if ($('#tagLineInput').val().length > 0) {
			createTagModalElement($('#tagLineInput').val());
			return;
		}
		
        var skillList = [];
        $('#hashTags .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',  
            url: 'http://ustart.today:'+port+'/addSkill/',
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
		if ($('#tagLineInput').val().length > 0) {
			createTagModalElement($('#tagLineInput').val());
			return;
		}
		
        var skillList = [];
        $('#hashTags .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',
            url: 'http://ustart.today:'+port+'/UpdateProjectTags/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillList), projectWidget: $('#tagModal .projectWidget').val()},
            success: function(data) {
                $("#hashtags, #hashTagsBody").html('');
				$('#tag-project-submit').text('Done');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createTagWidgetElement("#hashTagsBody", tag);
                });
                $("#tagModal").modal('hide');
            }
        });
    });
    $('#wantedSkill-project-submit').click(function(e) {
		if ($('#wantedSkillLineInput').val().length > 0) {
			createTagModalElement($('#wantedSkillLineInput').val());
			return;
		}
		
        var skillList = [];
        $('#wantedSkill .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',
            url: 'http://ustart.today:'+port+'/UpdateProjectWantedSkills/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillList), projectWidget: $('#wantedSkillModal .projectWidget').val()},
            success: function(data) {
                $("#wantedSkill, #wantedSkillBody").html('');
				$('#wantedSkill-project-submit').text('Done');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createTagWidgetElement("#wantedSkillBody", tag);
                });
                $("#wantedSkillModal").modal('hide');
            }
        });
    });
});
