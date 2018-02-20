var taglist = [];

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

function createTagModalElement(tag) {
	var tagArray = tag.split(',');
	tagArray.forEach(function(tag) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			if (taglist.length == 0) {
				$("#hashtags").html("");
			}
			var tagHTML = `
					<button type="submit" name="instaURL" class="btn btn-default projectsColumn" id="skill-`+ tag + `" value="`+ tag +`">
						<div class="deleteTagBtn">x</div>
						<div class="columnImage">
							<div class="columnTitle">`+tag+`</div>
						</div>
					</button>
					`;
			$("#hashtags").append(tagHTML);
			taglist.push(tag);
			if (taglist.length >= 16) {
				$('#tagModal .modal-footer button[name="widgetSubmit"]').attr('disabled', 'true');
			}
		}
		$('#tagCountIndicator').html("" + (16 - taglist.length) + " Tag(s) Remaining");
		$('#tagLineInput').val('');
	}
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
		if (e.which == 13) {
			createTagModalElement($('#tagLineInput').val());
		} else if (e.which == 44) {
			createTagModalElement($('#tagLineInput').val());
			e.preventDefault();
		}
	});

	$('#addTagButton').click(function () {
		createTagModalElement($('#tagLineInput').val());
	});

	$('#tagModal').on('shown.bs.modal', function () {;
		$("#hashtags").html("");
		while(taglist.length > 0) {
			taglist.pop();
		}
		
		var tagList = $('#hashTagsBody .columnTitle');
		tagList.each(function(index, element) {
			createTagModalElement($(element).text());
		});
		
		$('#hashTags>button').click(function() {
			$(this).remove();
			
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
        var skillList = [];

        $('#hashTags .columnTitle').each(function(index, element) {
            skillList.push($(element).text());
        });
        $.ajax({
            type: 'GET',  
            url: 'http://ustart.today:5000/addSkill/',
            contentType: "application/json; charset=utf-8",
            data: {skillArray:JSON.stringify(skillList)},
            success: function(data) {
                $("#hashtags").html('');
                $("#hashTagsBody").html('');
                $(skillList).each(function(index, element) {
                    var tag = element;
					createTagWidgetElement(tag);
                });
                $("#tagModal").modal('hide');
            }
        });
    });
});
