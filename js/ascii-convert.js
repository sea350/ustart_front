function readRuneArray(runeArray) {
	var runeOutput = '';
	runeArray.forEach(function(element) {
		runeOutput += String.fromCharCode(element);
	});
	document.write(runeOutput);
}