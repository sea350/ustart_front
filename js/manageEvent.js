function getNum(val) {
   if (isNaN(val)) {
     return 0;
   }
   return val;
}

function makeEventApplications(name, avatar,docID, projectID, link){
	$('#request-groups').append([
		$('<li>',{'class':'request-group'}).attr('id','').each(function(){
			$(this).attr("id", $(this).attr("id").concat(docID));
		}).append([
			$('<div>',{'class':'input-group-btn1 parentID'}).attr({'id':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(projectID)});
			}).append([
				$('<div>',{'class':'btn-group'}).append([
					$('<button>',{'class':'btn btn-default y-btn'}).attr({'id':'accept','name':'accept','type':'submit'}).each(function(){
					$(this).attr("id", $(this).attr("id").concat(docID));
				}).append([
						$('<i>',{'class':'glyphicon glyphicon-ok'})
					])
				])
				,$('<button>',{'class':'btn btn-default x-btn'}).attr({'id':'reject','name':'reject','type':'submit'}).each(function(){
					$(this).attr("id", $(this).attr("id").concat(docID));
				}).append([
					$('<i>',{'class':'glyphicon glyphicon-remove'})
				])
			])
			,$('<a>').attr({'href':'/profile/'}).each(function(){
				$(this).attr("href", $(this).attr("href").concat(link));
			}).append([
				$('<img>',{'class':'inbox-icon'}).attr({'id':'avatar','src':''}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(docID),'src':$(this).attr("src").concat(avatar)});
				})
				,$('<span>',{'class':'group-header'}).each(function(){
					$(this).text(name);
				})
			])
			,$('<br>')
			,$('<span>',{'class':'invitation-message'}).text('would like to join your event as a guest!')
		])		
	])
};

function makeMemberEventApplications(name, avatar,docID, projectID, link){
	$('#request-groups').append([
		$('<li>',{'class':'request-group'}).attr('id','').each(function(){
			$(this).attr("id", $(this).attr("id").concat(docID));
		}).append([
			$('<div>',{'class':'input-group-btn1 parentID'}).attr({'id':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(projectID)});
			}).append([
				$('<div>',{'class':'btn-group'}).append([
					$('<button>',{'class':'btn btn-default y-btn-2'}).attr({'id':'accept','name':'accept','type':'submit'}).each(function(){
					$(this).attr("id", $(this).attr("id").concat(docID));
				}).append([
						$('<i>',{'class':'glyphicon glyphicon-ok'})
					])
				])
				,$('<button>',{'class':'btn btn-default x-btn-2'}).attr({'id':'reject','name':'reject','type':'submit'}).each(function(){
					$(this).attr("id", $(this).attr("id").concat(docID));
				}).append([
					$('<i>',{'class':'glyphicon glyphicon-remove'})
				])
			])
			,$('<a>').attr({'href':'/profile/'}).each(function(){
				$(this).attr("href", $(this).attr("href").concat(link));
			}).append([
				$('<img>',{'class':'inbox-icon'}).attr({'id':'avatar','src':''}).each(function(){
					$(this).attr({"id": $(this).attr("id").concat(docID),'src':$(this).attr("src").concat(avatar)});
				})
				,$('<span>',{'class':'group-header'}).each(function(){
					$(this).text(name);
				})
			])
			,$('<br>')
			,$('<span>',{'class':'invitation-message'}).text('would like to join your event as a member!')
		])		
	])
};

$(document).ready(function () {
	var port = window.location.port;;
	//GET THE REQUESTS FOR A SPECIFIC EVENT
   $('.eventList').on( "click", function(e) {
	   var eventID = e.currentTarget.id;
       $(this).prop('disabled', true);
       $.ajax({
		   type: 'GET',
		   url: 'http://k12start.today:'+port+'/LoadEventRequests/',
		   contentType: "application/json; charset=utf-8",
		   data: {eventID:eventID},
		   success: function(data) {
			   var temp = JSON.parse(data);
			   if (temp != null){
                    switch(temp){
                        case (temp.MemberRequests != null && temp.GuestRequests != null):
                            var requestCount = parseInt(temp.MemberRequests.length)+ parseInt(temp.GuestRequests.length);
                            break;
                        case (temp.MemberRequests == null && temp.GuestRequests != null):
                            var requestCount = 0+ parseInt(temp.GuestRequests.length);
                            break;
                        case (temp.GuestRequests == null && temp.MemberRequests != null):
                             var requestCount = 0+ parseInt(temp.MemberRequests.length);
                             break;
                        case (temp.GuestRequests == null && temp.MemberRequests == null):
                             var requestCount = 0;
                             break;
                    }
				   $("#totalRequests"+eventID).show();   
				   $("#totalRequests"+eventID).text(requestCount);
				   if ($('#request-groups').contents().length == 0){
                       if (temp.MemberRequests!= null){
                           for (i=0; i < temp.MemberRequests.length; i++){
                                makeMemberEventApplications(temp.MemberRequests[i].FirstName, temp.MemberRequests[i].Image,temp.MemberRequests[i].DocID,eventID,temp.MemberRequests[i].Username);
                           }
                       }
                       if (temp.GuestRequests!= null){
                           for (i=0; i < temp.GuestRequests.length; i++){
                                makeEventApplications(temp.GuestRequests[i].FirstName, temp.GuestRequests[i].Image,temp.GuestRequests[i].DocID,eventID,temp.GuestRequests[i].Username);
                           }
                       }
				   }
				   else{
					   $("#request-groups").empty();
				       if (temp.MemberRequests!= null){
                           for (i=0; i < temp.MemberRequests.length; i++){
                                makeMemberEventApplications(temp.MemberRequests[i].FirstName, temp.MemberRequests[i].Image,temp.MemberRequests[i].DocID,eventID,temp.MemberRequests[i].Username);
                           }
                       }
                       if (temp.GuestRequests!= null){
                           for (i=0; i < temp.GuestRequests.length; i++){
                                makeEventApplications(temp.GuestRequests[i].FirstName, temp.GuestRequests[i].Image,temp.GuestRequests[i].DocID,eventID,temp.GuestRequests[i].Username);
                           }
                       }
				   }
			   }
			   else{
				   $("#request-groups").empty();
			   }
               $(this).prop('disabled', false);
		   },
		   error: function(err) {
			   console.log('Event failed: ');
			   console.log(err);
		   }
	   });
   });
   //HANDLE ACCEPT REQUEST
   $('body').on("click", ".y-btn", function(e) {
	  e.preventDefault();
      $(this).prop('disabled', true);
	   var that = $(this);
	   var temp = e.currentTarget.id;
	   var usrID=temp.replace("accept", "");
	   var eventID = $(e.target).closest('.parentID').attr('id');
	   var totalReq = $("#totalRequests"+eventID).text();
	   that.off('click'); // remove handler
	   $.ajax({
		   type: 'GET',
		   url: 'http://k12start.today:'+port+'/AcceptGuestJoinRequest/',
		   contentType: "application/json; charset=utf-8",
		   data: {userID:usrID, eventID: eventID},
		   success: function(result) {
			   //update notification
               console.log(result);
				var testresult = parseInt(result);
				if (testresult <=0){
				   $("#totalRequests"+eventID).hide();    
				}
				else{
				   $("#totalRequests"+eventID).text(testresult);
				}
               $(this).prop('disabled', false);
			   $("#"+usrID).empty();
			   $("#"+usrID).remove();
		   },
		   error: function(err) {
			   console.log('Request failed: ');
			   console.log(err);
		   }
		});
   });
     $('body').on("click", ".y-btn-2", function(e) {
	  e.preventDefault();
      $(this).prop('disabled', true);
	   var that = $(this);
	   var temp = e.currentTarget.id;
	   var usrID=temp.replace("accept", "");
	   var eventID = $(e.target).closest('.parentID').attr('id');
	   var totalReq = $("#totalRequests"+eventID).text();
	   that.off('click'); // remove handler
	   $.ajax({
		   type: 'GET',
		   url: 'http://k12start.today:'+port+'/AcceptMemberJoinRequest/',
		   contentType: "application/json; charset=utf-8",
		   data: {userID:usrID, eventID: eventID},
		   success: function(result) {
			   //update notification
               console.log(result);
				var testresult = parseInt(result);
				if (testresult <=0){
				   $("#totalRequests"+eventID).hide();    
				}
				else{
				   $("#totalRequests"+eventID).text(testresult);
				}
               $(this).prop('disabled', false);
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
       $(this).prop('disabled', true);
	   var that = $(this);
	   var temp = e.currentTarget.id;
	   var usrID=temp.replace("reject", "");
	   var eventID = $(e.target).closest('.parentID').attr('id');
	   var totalReq = $("#totalRequests"+eventID).text();
	   that.off('click'); // remove handler
		$.ajax({
		   type: 'GET',
		   url: 'http://k12start.today:'+port+'/RejectGuestJoinRequest/',
		   contentType: "application/json; charset=utf-8",
		   data: {userID:usrID, eventID: eventID},
		   success: function(result) {
				var testresult = parseInt(result);
				if (testresult <=0){
				   $("#totalRequests"+eventID).hide();    
				}
				else{
				   $("#totalRequests"+eventID).text(testresult);
				}
               $(this).prop('disabled', false);
			   $("#"+usrID).empty();
			   $("#"+usrID).remove();
		   },
		   error: function(err) {
			   console.log('Request failed: ');
			   console.log(err);
		   }
		});
   });
    $('body').on("click", ".x-btn-2", function(e) {
	   e.preventDefault();
       $(this).prop('disabled', true);
	   var that = $(this);
	   var temp = e.currentTarget.id;
	   var usrID=temp.replace("reject", "");
	   var eventID = $(e.target).closest('.parentID').attr('id');
       console.log(eventID);
	   var totalReq = $("#totalRequests"+eventID).text();
	   that.off('click'); // remove handler
		$.ajax({
		   type: 'GET',
		   url: 'http://k12start.today:'+port+'/RejectMemberJoinRequest/',
		   contentType: "application/json; charset=utf-8",
		   data: {userID:usrID, eventID: eventID},
		   success: function(result) {
				var testresult = parseInt(result);
				if (testresult <=0){
				   $("#totalRequests"+eventID).hide();    
				}
				else{
				   $("#totalRequests"+eventID).text(testresult);
				}
               $(this).prop('disabled', false);
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
		   if ($(this).text() <= "0") {
				   $(this).css("display", "none");
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
   