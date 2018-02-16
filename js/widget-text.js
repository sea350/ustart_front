function textEditFun() {
	$('.text-box').attr('contenteditable', true);
	CKEDITOR.disableAutoInline = true;
	CKEDITOR.inline('text-box', {
		on: {
			blur: function( event ) {
				var params = {
					page_id: $(".text-box").val(),
					body_text: event.editor.getData()
				};

				$.ajax({
					url: 'php_file_to_post_to.php',
					global: false,
					type: "POST",
					dataType: "text json",
					data: params,
					success: function(result) {
						console.log(result);
					}
				});
				
				// Do Save Message
				$.notify("Saved", {className:"success", position:"right middle"});
			}
		}
	});
	$('.text-box').blur(function () {
		console.log('Saving text');
	});
}

$(document).ready(function () {
	textEditFun();
})