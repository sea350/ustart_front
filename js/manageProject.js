    
var port = location.port;
function makeProjectApplications(name, avatar,docID, projectID, link){
        $('#request-groups').append('\
        <li class="request-group" id="'+docID+'" >\
            <div class="input-group-btn parentID" id='+projectID+' style="float:right; width:auto;">\
                <div class="btn-group">\
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                      <i class="glyphicon glyphicon-ok" style="color:#607d8b;"></i>\
                  </button>\
                  <div class="dropdown-menu">\
                    <a class="dropdown-item y-btn" id="accept'+docID+'">Member</a>\
                    <a class="dropdown-item y-btn" id="accept'+docID+'">Moderator</a>\
                  </div>\
                </div>\
             <button class="btn btn-default x-btn" id="reject'+docID+'" name="reject" type="submit"><i class="glyphicon glyphicon-remove" style="color:#607d8b;"></i></button>\
            </div>\
                <a href="/profile/'+link+'"><img class="inbox-icon" id="avatar'+docID+'" src="" /><span class="group-header">'+ name +' </span></a><br><span class="invitation-message">would like to join your project! </span>\
        </li>');
        $("#avatar"+docID).attr("src", avatar);
    }
    
/*function createMemberList(member, link){
        $("#sidebar").append('<div class="sidebar-header"><div class="projectMembers">'+member.charAt(0).toUpperCase() +'</div><strong>'+ member +' <a href="'+ link +'"><i class="fa fa-sign-out"></i></a></strong></div>')
}*/

$(document).ready(function () {
 //GET THE REQUESTS FOR A SPECIFIC PROJECT
$('.projectList').on( "click", function(e) {
    var projectID = e.currentTarget.id;
    $.ajax({
        type: 'GET',
        url: 'http://ustart.today:'+port+'/LoadJoinRequests/',
        contentType: "application/json; charset=utf-8",
        data: {projID:projectID},
        success: function(data) {
            var temp = JSON.parse(data);
            if (temp != null){
                $("#totalRequests"+projectID).show();   
                $("#totalRequests"+projectID).text(temp.length);
                if ($('#request-groups').contents().length == 0){
                    for (i=0; i < temp.length; i++){
                        makeProjectApplications(temp[i].FirstName, temp[i].Image,temp[i].DocID,projectID,temp[i].Username);
                    }
                }
                else{
                    $("#request-groups").empty();
                     for (i=0; i < temp.length; i++){
                        makeProjectApplications(temp[i].FirstName, temp[i].Image,temp[i].DocID,projectID,temp[i].Username);
                    }
                }
            }
            else{
                $("#request-groups").empty();
            }
        },
        error: function(err) {
            console.log('Project failed: ');
            console.log(err);
        }
    });
});
//HANDLE ACCEPT REQUEST
$('body').on("click", ".y-btn", function(e) {
   e.preventDefault();
    var that = $(this);
    var temp = e.currentTarget.id;
    var role = $(e.currentTarget).text();
    var usrID=temp.replace("accept", "");
    var projID = $(e.target).closest('.parentID').attr('id');
    var totalReq = $("#totalRequests"+projID).text();
    that.off('click'); // remove handler
    $.ajax({
        type: 'GET',
        url: 'http://ustart.today:'+port+'/AcceptJoinRequest/',
        contentType: "application/json; charset=utf-8",
        data: {userID:usrID, role:role, projectID: projID},
        success: function(result) {
            //update notification
             var testresult = parseInt(result);
             if (testresult <=0){
                $("#totalRequests"+projID).hide();    
             }
             else{
                $("#totalRequests"+projID).text(testresult);
             }
            $("#"+usrID).empty();
            $("#"+usrID).remove();
        },
        error: function(err) {
            console.log('Request failed: ');
            console.log(err);
        }
     });
});
$('body').on("click", ".x-btn", function(e) {
    e.preventDefault();
    var that = $(this);
    var temp = e.currentTarget.id;
    var usrID=temp.replace("reject", "");
    var projID = $(e.target).closest('.parentID').attr('id');
    var totalReq = $("#totalRequests"+projID).text();
    that.off('click'); // remove handler
     $.ajax({
        type: 'GET',
        url: 'http://ustart.today:'+port+'/RejectJoinRequest/',
        contentType: "application/json; charset=utf-8",
        data: {userID:usrID, projectID: projID},
        success: function(result) {
             var testresult = parseInt(result);
             if (testresult <=0){
                $("#totalRequests"+projID).hide();    
             }
             else{
                $("#totalRequests"+projID).text(testresult);
             }
            $("#"+usrID).empty();
            $("#"+usrID).remove();
        },
        error: function(err) {
            console.log('Request failed: ');
            console.log(err);
        }
     });
});
    
      $("#leftNavMessages").addClass("theActive");
      $('.request-group').click(function(event) {
		if (!$(this).hasClass('active')) {
			$('.active').not(this).removeClass('active');
			$(this).addClass('active');
			$('.box-chat').show('fast');
		}
	});
    
    $.each($('.badge'), function() {
        if ($(this).text() == "0") {
                $(this).hide();
        }
    });
    
    
    $('.inbox-group').click(function(event) {
		if (!$(this).hasClass('active')) {
			$('.active').not(this).removeClass('active');
			$(this).addClass('active');
			$('.box-compose').hide('fast');
			$('.box-chat').show('fast');
            //createMemberList("Ryan Rozbiani", "#");
		}
	});
    
    
    $('#sidebarCollapse').on('click', function (e) {
         e.preventDefault();
        $('#sidebar').toggleClass('active');
    });

});
