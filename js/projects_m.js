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
	
	// Load the respective user into the page header
	
	$('#header-projects').text("Ryan's Current Projects");
	
	// Load user projects here. There might be more or different parameters in the future under consideration.
	
	createProjectObj("Project Kitten", "http://placekitten.com/302/200", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container'));
	createProjectObj("Project Pizza", "http://lorempizza.com/400/200", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container'));
	createProjectObj("Project Placeholder", "", "Really long description. I mean a really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long description.", "Seven eons ago", $('#project-container'));
	createProjectObj("Project Kitten 2", "http://placekitten.com/300/201", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 3", "http://placekitten.com/300/202", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 2", "http://lorempizza.com/400/201", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 3", "http://lorempizza.com/400/202", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 4", "http://placekitten.com/300/203", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 4", "http://lorempizza.com/400/203", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 5", "http://lorempizza.com/400/204", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 5", "http://placekitten.com/300/204", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 6", "http://placekitten.com/300/205", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 7", "http://placekitten.com/300/199", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 6", "http://lorempizza.com/400/205", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 7", "http://lorempizza.com/400/199", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 8", "http://placekitten.com/300/198", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 9", "http://placekitten.com/300/197", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 8", "http://lorempizza.com/400/198", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 9", "http://lorempizza.com/400/197", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 10", "http://placekitten.com/300/196", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Kitten 11", "http://placekitten.com/300/195", "Fill the world with cat pictures to brighten the mood. Man. We need more kittens. More projects in progress.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 10", "http://lorempizza.com/400/196", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
	createProjectObj("Project Pizza 11", "http://lorempizza.com/400/195", "Pizza is such a nice lunch meal. Fill the world with pizza pies to appease those stomachs. Satisfy world hunger.", "Seven eons ago", $('#project-container-2'));
});