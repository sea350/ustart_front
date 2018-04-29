var taglist = [];
var MAXTAGS = 16;
var port=5002;

function updateTagsCounter() {
	if (taglist.length == MAXTAGS - 1) {
		$('#tagCountIndicator').html("" + (MAXTAGS - taglist.length) + " Tag Remaining");
	} else {
		$('#tagCountIndicator').html("" + (MAXTAGS - taglist.length) + " Tags Remaining");
	}
}

function addTag(tag) {
	//if (!$("#addTagButton").prop("disabled")) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			createTagElement(tag);
			$('#tagLineInput').val("");
			createTagWidgetElement(tag);
		}
	//}
}

function createTagWidgetElement(tag) {
	var tagHTML = `
			<button class="btn btn-default projectsColumn" id="skill-`+ tag + `">
				<div class="columnImage">
					<div class="columnTitle">`+tag+`</div>
				</div>
			</button>
			`;
	$('#hashTagsBody').append(tagHTML);
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
			var tagHTML = `
					<span name="instaURL" class="btn btn-default projectsColumn" id="skill-`+ tag + `" value="`+ tag +`">
						<div class="deleteTagBtn" onclick="removeTag(this)">x</div>
						<div class="columnImage">
							<div class="columnTitle">`+tag+`</div>
						</div>
					</span>
					`;
			$("#hashtags").append(tagHTML);
			taglist.push(tag);
			if (taglist.length >= 16) {
				$('#tagModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
			}
		}
		updateTagsCounter();
		$('#tagLineInput').val('');
	});
}

$(document).ready(function () {
	/* Populate the user tags here using the method, 'createTagElement' */
	$("#hashTagsBody .columnTitle").each(function(index, element) {
		//createTagElement($(element).text());
	});
	$('#customtagForm').submit(function() {
		var lineTags = $('#tagLineInput').val();
		lineTags = lineTags.replace(/ /gi, ',');
		lineTags = lineTags.replace(/,,/gi, ',');
		
		$('#tagLineInput').val();
	});

	$('#tagLineInput').keypress(function (e) {
		if (e.which == 13 || e.which == 44) {
			createTagModalElement($('#tagLineInput').val());
			e.preventDefault();
		}
	}).on('input', function(e) {
		if ($('#tagLineInput').val().length > 0) {
			$('#tag-submit, #tag-project-submit').text('Add');
		} else {
			$('#tag-submit, #tag-project-submit').text('Done');
		}
	});

	$('#addTagButton').click(function () {
		createTagModalElement($('#tagLineInput').val());
	}).hide();

	$('#tagModal').on('shown.bs.modal', function () {
		
		$("#hashtags").html("");
		taglist = [];
		
		var tagList = $('#hashTagsBody .columnTitle');
		tagList.each(function(index, element) {
			createTagModalElement($(element).text());
		});
		
		updateTagsCounter();
		
		$('#hashTags .deleteTagBtn').click(function() {
			removeTag(this);
		});
		
		if ($("#hashtags").html() === "") {
			$("#hashtags").html("You haven't added tags yet.");
		}
		//$('#tagModal').find('[autofocus]').focus(); // changed from this 
	});

	// This isn't being used
	$('#tagEditModal').on('shown.bs.modal', function () {
		var addedTags = [];
		$('#hashtags span').each(function () {
			addedTags.push($('#hashtags span').html()); // changed from this 
		});
		$('#tagTextArea').html(addedTags.toString());
		$('#tagTextArea').find('[autofocus]').focus(); // changed from this
	});
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
                $("#hashtags").html('');
                $("#hashTagsBody").html('');
				$('#tag-submit').text('Done');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createTagWidgetElement(tag);
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
                $("#hashtags").html('');
                $("#hashTagsBody").html('');
				$('#tag-project-submit').text('Done');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createTagWidgetElement(tag);
                });
                $("#tagModal").modal('hide');
            }
        });
    });
});
