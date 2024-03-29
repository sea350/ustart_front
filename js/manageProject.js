function makeProjectApplications(name, avatar,docID, projectID, link){
	$('#request-groups').append([
		$('<li>',{'class':'request-group'}).attr('id','').each(function(){
			$(this).attr("id", $(this).attr("id").concat(docID));
		}).append([
			$('<div>',{'class':'input-group-btn1 parentID'}).attr({'id':''}).each(function(){
				$(this).attr({"id": $(this).attr("id").concat(projectID)});
			}).append([
				$('<div>',{'class':'btn-group'}).append([
					$('<button>',{'class':'btn btn-default dropdown-toggle'}).attr({'type':'button','data-toggle':'dropdown','aria-haspopup':'true','aria-expanded':'false'}).append([
						$('<i>',{'class':'glyphicon glyphicon-ok'})
					])
					,$('<div>',{'class':'dropdown-menu'}).append([
						$('<a>',{'class':'dropdown-item y-btn'}).attr({'id':'accept'}).text('Member').each(function(){
							$(this).attr("id", $(this).attr("id").concat(docID));
						})
						,$('<a>',{'class':'dropdown-item y-btn'}).attr({'id':'accept'}).text('Moderator').each(function(){
							$(this).attr("id", $(this).attr("id").concat(docID));
						})
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
			,$('<span>',{'class':'invitation-message'}).text('would like to join your project!')
		])		
	])
};

$(document).ready(function () {
	var port = window.location.port;;
	//GET THE REQUESTS FOR A SPECIFIC PROJECT
   $('.projectList').on( "click", function(e) {
	   var projectID = e.currentTarget.id;
       $(this).prop('disabled', true);
	   $.ajax({
		   type: 'GET',
		   url: 'https://ustart.today:'+port+'/LoadJoinRequests/',
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
               $(this).prop('disabled', false);
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
      $(this).prop('disabled', true);
	   var that = $(this);
	   var temp = e.currentTarget.id;
	   var role = $(e.currentTarget).text();
	   var usrID=temp.replace("accept", "");
	   var projID = $(e.target).closest('.parentID').attr('id');
	   var totalReq = $("#totalRequests"+projID).text();
	   that.off('click'); // remove handler
	   $.ajax({
		   type: 'GET',
		   url: 'https://ustart.today:'+port+'/AcceptJoinRequest/',
		   contentType: "application/json; charset=utf-8",
		   data: {userID:usrID, role:role, projectID: projID},
		   success: function(result) {
			   //update notification
               console.log(result);
				var testresult = parseInt(result);
				if (testresult <=0){
				   $("#totalRequests"+projID).hide();    
				}
				else{
				   $("#totalRequests"+projID).text(testresult);
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
	   var projID = $(e.target).closest('.parentID').attr('id');
	   var totalReq = $("#totalRequests"+projID).text();
	   that.off('click'); // remove handler
		$.ajax({
		   type: 'GET',
		   url: 'https://ustart.today:'+port+'/RejectJoinRequest/',
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
   