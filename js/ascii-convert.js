var d = new Date()
var month = new Array(12);
month[0] = "January";
month[1] = "Feburary";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function intToString (value) {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        var shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}

//conversion for html encodedstrings
function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

function readRuneArray(runeArray) {
	if (runeArray) {
		var runeOutput = '';
		runeArray.forEach(function(element) {
			runeOutput += String.fromCharCode(element);
		});
		document.write(decodeEntities(runeOutput));
	}
}

function readRuneArrayThatWorks(runeArray) {
	if (runeArray) {
		var runeOutput = '';
		runeArray.forEach(function(element) {
			runeOutput += String.fromCharCode(element);
		});
		return decodeEntities(runeOutput);
	}
}
function formatTime(datetime) {
	// Add custom time text here
	
	var time = new Date(datetime);
	var timeHour = time.getHours() % 12;
	if (timeHour < 1)
		timeHour = 12;
	var timeMinute = time.getMinutes();
	if (timeMinute < 10)
		timeMinute = '0' + timeMinute;
	var timeString = timeHour + ':' + timeMinute;
	if (time.getHours() < 12)
		timeString = timeString + " AM";
	else
		timeString = timeString + " PM";
	return timeString;
}

function defineRuneArray(runeArray) {
	if (runeArray) {
		var runeOutput = '';
		runeArray.forEach(function(element) {
			runeOutput += String.fromCharCode(element);
		});
		return runeOutput;
	}
	return 0;
}