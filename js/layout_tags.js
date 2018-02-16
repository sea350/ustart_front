var taglist = [];

function addTag(tag) {
	if (!$("#addTagButton").prop("disabled")) {
		if (tag != "" && taglist.length < 16 && $.inArray(tag.toUpperCase(), taglist) == -1) {
			createTagElement(tag);
			$('#tagLineInput').val("");
			createTagWidgetElement(tag);
		}
	}
}

function createTagWidgetElement(tag) {
	var tagHTML = `
			<button class="btn btn-default projectsColumn" id="skill-`+ tag + `">
			<div class="columnImage">
			<div class="columnTitle">` + tag + `
			</div>
			</div>
			</button>
			`;
	
	$('#hashTagsBody').prepend(tagHTML);
}

function createTagElement(tag) {
	if (taglist.length == 0) {
		$("#hashtags").html("");
	}

	var tagHTML = `
			<button class="btn btn-default projectsColumn" id="skill-`+ tag + `">
			<div class="deleteTagBtn">x</div>
			<div class="columnImage">
			<div class="columnTitle">` + tag + `
			</div>
			</div>
			</button>
			`;
	$("#hashtags").append(tagHTML);
	$(".deleteTagBtn").click(function (e) {
		var el = $(e.target);
		el = el.parent();
		var elID = el.attr('id');
		elID = elID.substring(6, elID.length);
		taglist.splice($.inArray(elID, taglist), 1);
		for (i = 0; i < 2; i++)
			$('#skill-' + elID).remove();
		//el.remove();
		$('#tagCountIndicator').html("" + (16 - taglist.length) + " Tag(s) Remaining");
	});
	taglist.push(tag);
	$('#tagCountIndicator').html("" + (16 - taglist.length) + " Tag(s) Remaining");
}

$(document).ready(function () {
	/* Populate the user tags here using the method, 'createTagElement' */
	$("#hashTagsBody .columnTitle").each(function(index, element) {
		createTagElement($(element).text());
	});
	console.log(taglist);
});

$('#tagLineInput').keypress(function (e) {
	if (e.which == 13) {
		addTag($('#tagLineInput').val());
	} else if (e.which == 44) {
		addTag($('#tagLineInput').val());
		e.preventDefault();
	}
});

$('#addTagButton').click(function () {
	addTag($('#tagLineInput').val());
});

$('#tagModal').on('shown.bs.modal', function () {
	$('#tagModal').find('[autofocus]').focus(); // changed from this 
});

$('#tagEditModal').on('shown.bs.modal', function () {
	var addedTags = [];
	$('#hashtags span').each(function () {
		addedTags.push($('#hashtags span').html()); // changed from this 
	});
	$('#tagTextArea').html(addedTags.toString());
	$('#tagTextArea').find('[autofocus]').focus(); // changed from this
});