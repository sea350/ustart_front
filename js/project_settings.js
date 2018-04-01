function changeMemberClass(memberID, projectID, newRank) {
	newRank = newRank - 1;
	$.ajax({
		type: 'GET',
		url: '/changeMemberClass/',
		contentType: "application/json; charset=utf-8",
		data: {memberID:memberID, projectID:projectID, newRank:newRank},
		success: function(data) {
		},
		error: function(err) {
			console.log('Change Member Class error: ' + err);
		}
	});
}

function removeMember(memberID, projectID, cardButton) {
	$.ajax({
		type: 'GET',
		url: '/leaveProject/',
		contentType: "application/json; charset=utf-8",
		data: {leaverID:memberID, projectID:projectID},
		success: function(data) {
			console.log(data);
			$(cardButton).parents('.card').remove();
		},
		error: function(err) {
			console.log('Remove Member error: ');
			console.log(err);
		}
	});
}