var suggestionScrollID='';
var suggestionProjectScrollID='';
function createSuggestedUser(firstname, lastname , avatar, id, username){
	var userDiv = $("<div></div>").addClass('user-card').attr("id", id);
    var dismissOuterDiv = $("<div></div>").addClass('dismiss');
    var dismissBtn = $("<span></span>").addClass('dismiss-btn').text('×');
    dismissOuterDiv.append(dismissBtn);
    var content = $("<div></div>").addClass('content');
    var contentCardInfo = $("<div></div>").addClass('user-card-info');
    var contentImg = $("<img></img>").addClass('avatar').attr("src", avatar);
    var contentLink = $("<a></a>").attr("href", '/profile/'+username);
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

$(document).ready(function () {
      //loading in suggested user
      $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxUserSuggestions/',
        contentType: "application/json; charset=utf-8",
        data: {scrollID:''}
        ,complete: function (jqXHR,status) {
         if(status == 'success' || status=='notmodified')
         {
              var temp = $.parseJSON(jqXHR.responseText);
               console.log(temp);
              if(temp.suggestions  != null){
                  suggestionScrollID = temp.scrollID;
                  for(var i=0; i<temp.suggestions.length; i++){
                      createSuggestedUser(temp.suggestions[i].FirstName,temp.suggestions[i].LastName, temp.suggestions[i].Image, temp.suggestions[i].DocID,temp.suggestions[i].Username);
                  }
              }
         }
        },
        error: function(error) {
            console.log("suggestion failed");
            console.log(error);
        }
    });
     //loading in suggested project
     /* $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxProjectSuggestions/',
        contentType: "application/json; charset=utf-8",
        data: {scrollID:''}
        ,complete: function (jqXHR,status) {
         if(status == 'success' || status=='notmodified')
         {
              var temp = $.parseJSON(jqXHR.responseText);
               console.log(temp);
              if(temp.suggestions  != null){
                  suggestionProjectScrollID = temp.scrollID;
                  for(var i=0; i<temp.suggestions.length; i++){
                     createSuggestedProject(temp.suggestions[i].FirstName,temp.suggestions[i].LastName, temp.suggestions[i].Image, temp.suggestions[i].DocID);
                  }
              }
         }
        },
        error: function(error) {
            console.log("suggestion failed");
            console.log(error);
        }
    });*/
});

$('body').on("click", ".dismiss-btn", function(e) {
     $(this).prop( "disabled", true );
    console.log(suggestionScrollID);
    var followID = $(this).closest('.user-card').attr('id');
    $('#'+followID).fadeOut(1000, function() { $(this).remove(); });
     $.ajax({
        type: 'GET',  
        url: 'http://ustart.today:'+port+'/AjaxUserSuggestions/',
        contentType: "application/json; charset=utf-8",
        data: {scrollID: suggestionScrollID},
        complete: function (jqXHR,status) {
             var temp = $.parseJSON(jqXHR.responseText);
             console.log(temp);
             if(temp.suggestions  != null){
                 $('#'+followID).fadeOut(1000, function() { $(this).remove(); 
                  for(var i=0; i<temp.suggestions.length; i++){
                      createSuggestedUser(temp.suggestions[i].FirstName,temp.suggestions[i].LastName, temp.suggestions[i].Image, temp.suggestions[i].DocID,temp.suggestions[i].Username);
                  }
                  $(this).prop( "disabled", false );
                });
              }
        },
        error: function(error) {
            console.log("It just doesn't work");
            console.log(error);
        }
    });
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
             //load more users
             $.ajax({
                    type: 'GET',  
                    url: 'http://ustart.today:'+port+'/AjaxUserSuggestions/',
                    contentType: "application/json; charset=utf-8",
                    data: {scrollID: suggestionScrollID},
                    complete: function (jqXHR,status) {
                         var temp = $.parseJSON(jqXHR.responseText);
                         if(temp.suggestions  != null){
                              for(var i=0; i<temp.suggestions.length; i++){
                                  createSuggestedUser(temp.suggestions[i].FirstName,temp.suggestions[i].LastName, temp.suggestions[i].Image, temp.suggestions[i].DocID,temp.suggestions[i].Username);
                              }
                    }
                    },
                    error: function(error) {
                        console.log("It just doesn't work");
                        console.log(error);
                    }
             });
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