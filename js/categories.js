var categories = new Array("Art", "Comics", "Crafts", "Dance", "Design", "Fashion", "Film & Video", "Food", "Games", "Journalism", "Music", "Photography", "Publishing", "Technology", "Theater");
var eventCategories = new Array("Project Showcase","Member Recruiment","Coaching","Info Session","Mingling Event","Conference","Expo","Career Fair","General Meeting");

function list_categories(categoryId){
	var category_name = document.getElementById(categoryId);
	category_name.length = 0; 
	category_name.options[0] = new Option('Select Category', '-1');
	category_name.selectedIndex = 0;
	for (var i = 0; i < categories.length; i++){
		category_name.options[category_name.length] = new Option(categories[i], categories[i]);
	}
}

function eventList_categories(eventId){
	var category_name = document.getElementById(eventId);
	category_name.length = 0; 
	category_name.options[0] = new Option('Select Category', '-1');
	category_name.selectedIndex = 0;
	for (var i = 0; i < eventCategories.length; i++){
		category_name.options[category_name.length] = new Option(eventCategories[i], eventCategories[i]);
	}
}
