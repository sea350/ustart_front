var featured=["img1.png", "img2.png", "img3.png", "img4.png"];
var current = 0;
var slideTimer = window.setInterval(update, 5000);

function startSlide() {
	console.log("startSlide");
	$('#slides').css("background-image", 'url(img/'+featured[current]+')');
}

function update() {
	current += 1;
	if(current == featured.length) {
		current = 0;
	}
	$('#slides').css("background-image", 'url(img/'+featured[current]+')');
}

function prevImg() {
	current -= 2;
	if(current == -2) {
		current = featured.length-2;
	}
	update();
	reset();
}

function nextImg() {
	update();
	reset();
}

function reset() {
	clearInterval(slideTimer);
	slideTimer = window.setInterval(update, 5000);
}