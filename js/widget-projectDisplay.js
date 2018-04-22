$(function() {
	$("#projectDisplayModal button.projectsColumn").click(function() {
		var isVisible = $(this).attr("data-project-visible");
		if ("true" === isVisible) {
			$(this).attr("data-project-visible", "false");
			$("#proj-preview" + $(this).attr("data-project")).attr("data-project-visible", "false");
			$.ajax({
				type: 'GET',  
				url: '/toggleProjectInvis/',
				contentType: "application/json; charset=utf-8",
				data: {projectID: $(this).attr("data-project")},
				success: function(data) {},
				failure: function(error) {
					console.log("Project Display AJAX error: " + error);
					$(this).attr("data-project-visible", "true");
					$("#proj-preview" + $(this).attr("data-project")).attr("data-project-visible", "true");
				}
			});
		} else {
			$(this).attr("data-project-visible", "true");
			$("#proj-preview" + $(this).attr("data-project")).attr("data-project-visible", "true");
			$.ajax({
				type: 'GET',  
				url: '/toggleProjectInvis/',
				contentType: "application/json; charset=utf-8",
				data: {projectID: $(this).attr("data-project")},
				success: function(data) {},
				failure: function(error) {
					console.log("Project Display AJAX error: " + error);
					$(this).attr("data-project-visible", "false");
					$("#proj-preview" + $(this).attr("data-project")).attr("data-project-visible", "false");
				}
			});
		}
	});
});