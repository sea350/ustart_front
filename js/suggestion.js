function createSuggestedUser(firstname, lastname , avatar, id){
	var userDiv = $("<div></div>").addClass('user-card').attr("id", id);
    var dismissOuterDiv = $("<div></div>").addClass('dismiss');
    var dismissBtn = $("<span></span>").addClass('dismiss-btn').text('×');
    dismissOuterDiv.append(dismissBtn);
    var content = $("<div></div>").addClass('content');
    var contentCardInfo = $("<div></div>").addClass('user-card-info');
    var contentImg = $("<img></img>").addClass('avatar').attr("src", avatar);
    var contentLink = $("<a></a>").attr("href", '/profile/'+id);
    var contentName = $("<strong></strong>").addClass('user-card-name').text(firstname+' '+lastname);
    var contentfollowBtn =$("<button></button>").addClass('btn btnX btn-small').text('Follow');
    content.append(contentImg, contentCardInfo.append(contentLink.append(contentName), '<br />', contentfollowBtn));
    userDiv.append(dismissOuterDiv, content);
    $('.suggested-users-cont').append(userDiv);
}

function createSuggestedProject(projectname , avatar, id){
	var userDiv = $("<div></div>").addClass('user-card').attr("id", id);
    var dismissOuterDiv = $("<div></div>").addClass('dismiss');
    var dismissBtn = $("<span></span>").addClass('dismiss-btn').text('×');
    dismissOuterDiv.append(dismissBtn);
    var content = $("<div></div>").addClass('content');
    var contentCardInfo = $("<div></div>").addClass('user-card-info');
    var contentImg = $("<img></img>").addClass('avatar').attr("src", avatar);
    var contentLink = $("<a></a>").attr("href", '/Projects/'+id);
    var contentName = $("<strong></strong>").addClass('user-card-name').text(projectname);
    var contentfollowBtn =$("<button></button>").addClass('btn btnX btn-small').text('Follow');
    content.append(contentImg, contentCardInfo.append(contentLink.append(contentName), '<br />', contentfollowBtn));
    userDiv.append(dismissOuterDiv, content);
    $('.suggested-projects-cont').append(userDiv);
}