//Editing user page script
function appendResult(t, p, d, a, l) {
	var resultHTML = document.getElementById('pastProjs').innerHTML;
		resultHTML += `<div onclick="location.href='` + l + `';" class="searchResult">
							<div class="searchPort" style="background-image:url('` + p + `'); background-size: contain;"></div>
							<div class="searchTitle">` + t + `</div>
							<div class="searchDesc">` + d + `<span style="color:#009688; font-weight: bold;"> more ... </span></div>
							<div class="searchTags">Tags: `;
							for(var i = 0; i < a.length; i++) {
								resultHTML += '<div class="sTag">' + a[i] + '</div>';
							}
							resultHTML += `
							</div>
						</div>`;
	document.getElementById('pastProjs').innerHTML = resultHTML;
	return true;
}