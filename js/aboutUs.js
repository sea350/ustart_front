$(document).ready(function() {
	$(".card").attr("data-toggle", "modal").attr("data-target", "#myModal");
	$(".card").click(function() {
		$(".picture_Section").attr("src", $(this).find("img").attr("src"));	
		$("#myModal").find(".description_Section").text($(this).find(".description_Section").text());
		/*console.log($(this));*/
		$(".title_Section").text($(this).find(".name").text());
		/*$(".position_Section").text($this).find(".text").text());*/
		$("#myModal").find(".position_Section").text($(this).find(".text").text());
	});

});

