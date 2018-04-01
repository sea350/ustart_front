    function makeProjectApplications(name, avatar,docID, projectID){
        $('#request-groups').append('<li class="request-group" id="'+docID+'" ><div class="input-group-btn parentID" id='+projectID+' style="float:right; width:auto;"><button name="accept" class="btn btn-default y-btn" id="accept'+docID+'" type="submit"><i class="glyphicon glyphicon-ok" style="color:#607d8b;"></i></button><button class="btn btn-default x-btn" id="reject'+docID+'" name="reject" type="submit"><i class="glyphicon glyphicon-remove" style="color:#607d8b;"></i></button></div><img class="inbox-icon" src="" /><span class="group-header">'+ name +' </span><br><span class="invitation-message">would like to join your project! </span></li>');
        $('#request-groups li img').attr("src", avatar);
    }
    
    function createMemberList(member, link){
        $("#sidebar").append('<div class="sidebar-header"><div class="projectMembers">'+member.charAt(0).toUpperCase() +'</div><strong>'+ member +' <a href="'+ link +'"><i class="fa fa-sign-out"></i></a></strong></div>')
    }
    
$(document).ready(function () {
    
      $('.request-group').click(function(event) {
		if (!$(this).hasClass('active')) {
			$('.active').not(this).removeClass('active');
			$(this).addClass('active');
			$('.box-chat').show('fast');
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
