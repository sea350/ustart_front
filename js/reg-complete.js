var redirectBool = false;

function redirectTimed() {
	if (!redirectBool) {
		window.location.href = "index2.html";
	} else {
		console.log("Redirect Cancelled");
	}
}

function clearSession() {
	sessionStorage.setItem('firstName', '');
	sessionStorage.setItem('lastName', '');
	sessionStorage.setItem('username', '');
	sessionStorage.setItem('inputEmail', '');
	sessionStorage.setItem('country', '');
	sessionStorage.setItem('state', -1);
	sessionStorage.setItem('city', '');
	sessionStorage.setItem('zip', '');
	sessionStorage.setItem('universityName', '');
	sessionStorage.setItem('majors', '');
	sessionStorage.setItem('year', -1);
	sessionStorage.setItem('dob', '');
}

$(document).ready(function () {
	clearSession();
	$(document).mousemove(function() {
		redirectBool = true;
	});
	setTimeout(redirectTimed, 5000);
});