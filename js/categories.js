var categories = new Array("Art", "Comics", "Crafts", "Dance", "Design", "Fashion", "Film & Video", "Food", "Games", "Journalism", "Music", "Photography", "Publishing", "Technology", "Theater");

function list_categories(categoryId){
	var category_name = document.getElementById(categoryId);
	category_name.length = 0; 
	category_name.options[0] = new Option('Select Category', '-1');
	category_name.selectedIndex = 0;
	for (var i = 0; i < categories.length; i++){
		category_name.options[category_name.length] = new Option(categories[i], categories[i]);
	}
}
