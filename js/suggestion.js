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
    userDiv.appendTo('.suggested-users-cont').hide().fadeIn(1000);
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
    var contentfollowBtn =$("<button></button>").addClass('btn btnY btn-small').text('Follow');
    content.append(contentImg, contentCardInfo.append(contentLink.append(contentName), '<br />', contentfollowBtn));
    userDiv.append(dismissOuterDiv, content);
    userDiv.appendTo('.suggested-projects-cont').hide().fadeIn(1000);
}

$('body').on("click", ".dismiss-btn", function(e) {
     $(this).prop( "disabled", true );
    var followID = $(this).closest('.user-card').attr('id');
    $('#'+followID).fadeOut(1000, function() { $(this).remove(); });
    /* $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxUserFollowsUser/',
        contentType: "application/json; charset=utf-8",
        data: {userID:followID},
        success: function(data) {
             $(this).prop( "disabled", false );
             $('#'+followID).fadeOut(1000, function() { $(this).remove(); });
        },
        error: function(error) {
            console.log("It just doesn't work");
            console.log(error);
        }
    });*/
});
 $('body').on("click", "button.btnX", function(e) {
    $(this).prop( "disabled", true );
    var followID = $(this).closest('.user-card').attr('id');
     $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxUserFollowsUser/',
        contentType: "application/json; charset=utf-8",
        data: {userID:followID},
        success: function(data) {
             $(this).prop( "disabled", false );
             $('#'+followID).fadeOut(1000, function() { $(this).remove(); });
        },
        error: function(error) {
            console.log("It just doesn't work");
            console.log(error);
        }
    }); 
 });
 $('body').on("click", "button.btnY", function(e) {
    $(this).prop( "disabled", true );
    var followID = $(this).closest('.user-card').attr('id');
     $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxUserFollowsUser/',
        contentType: "application/json; charset=utf-8",
        data: {userID:followID},
        success: function(data) {
             $(this).prop( "disabled", false );
             $('#'+followID).fadeOut(1000, function() { $(this).remove(); });
        },
        error: function(error) {
            console.log("It just doesn't work");
            console.log(error);
        }
    }); 
 });