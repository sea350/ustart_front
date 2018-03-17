function readRuneArray(runeArray) {
	if (runeArray) {
		var runeOutput = '';
		runeArray.forEach(function(element) {
			runeOutput += String.fromCharCode(element);
		});
		document.write(runeOutput);
	}
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