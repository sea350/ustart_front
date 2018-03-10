function createProjectObj(projectName, projectImage, projectDescription, projectTimeStamp, appendDoc) {
	var projectObj = document.createElement('div');
	$(projectObj).addClass('project-obj col-sm-5');
	
	if (projectImage.length > 0) {
		$(projectObj).css("background-image", 'url("'+projectImage+'"), url("http://via.placeholder.com/400x200")');
	}
	
	var projectObjContent = document.createElement('div');
	$(projectObjContent).addClass('project-obj-content');
	var projectObjTitle = document.createElement('strong');
	$(projectObjTitle).addClass('project-obj-title');
	$(projectObjTitle).text(projectName);
	var projectObjDescription = document.createElement('span');
	$(projectObjDescription).addClass('project-obj-description');
	$(projectObjDescription).text(projectDescription);
	var projectObjTime = document.createElement('span');
	$(projectObjTime).addClass('project-obj-timestamp');
	$(projectObjTime).text(projectTimeStamp);
	
	$(projectObj).append($(projectObjContent));
	$(projectObjContent).append($(projectObjTitle));
	$(projectObjContent).append("<br/>");
	$(projectObjContent).append($(projectObjDescription));
	$(projectObjContent).append($(projectObjTime));
	$(appendDoc).append($(projectObj));
	
	$(projectObj).click(function() {
		if (window.getSelection().toString().length == 0)
			window.location = encodeURI("projects.html#project_name=" + $(projectObjTitle).text());
	});
}

$(document).ready(function() {
	$("#formAddProject").submit(function(event) {
		createProjectObj($('#pname').val(),$('#pimg').val(),$('#pdesc').val());
		$("#modalAddProject").modal('hide');
		event.preventDefault();
	});
	
	// Load user projects here. There might be more or different parameters in the future under consideration.
	
	//createProjectObj("Project Kitten", "http://placekitten.com/302/200", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container'));
	//createProjectObj("Project Pizza", "http://lorempizza.com/400/200", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container'));
	//createProjectObj("Project Placeholder", "", "Really long description. I mean a really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long description.", "Seven eons ago", $('#project-container'));
	//createProjectObj("Project Kitten 2", "http://placekitten.com/300/201", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
});