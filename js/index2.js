var featured=["work1.jpg", "work2.jpg", "work3.jpg"];
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
// When used with jQuery
$(document).ready(function() {
	var el = document.getElementById('ticker2');
	var ticker = new TickerScrambler(el, {list: ['Companies','Bands','Movies','Podcasts','Technology','Together','Start-Ups','Experience','Music']});
});