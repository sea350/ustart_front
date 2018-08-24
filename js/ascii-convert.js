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