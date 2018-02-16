var redirectBool = false;

function redirectTimed() {
	if (!redirectBool) {
		window.location.href = "index2.html";
	} else {
		console.log("Redirect Cancelled");
	}
}

$(document).ready(function () {
	$(document).mousemove(function() {
		redirectBool = true;
	});
	setTimeout(redirectTimed, 5000);
});