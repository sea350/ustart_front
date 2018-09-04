function imposeSlideImage() {
    var idxImg = $('.slider-nav').slick('slickCurrentSlide');
    var srcImg = $($('.slider-nav').slick('getSlick').$slides.get(idxImg)).find('img').attr('src');

    $('div.gallery-display img').attr('src', srcImg);
}

function buildGallerySlick() {
    $('.slider-nav').slick({
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        infinite: false,
        swipeToSlide: true,
        waitForAnimate: false,
    }).bind('mousewheel', function(e) {
        /* This is the scroll event for Chrome */
        e.preventDefault();
        if (e.originalEvent.wheelDelta > 0) {
            $('.slider-nav').slick('slickPrev');
        } else if (e.originalEvent.wheelDelta < 0) {
            $('.slider-nav').slick('slickNext');
        }
    }).bind('DOMMouseScroll', function(e) {
        /* This is the scroll event for Firefox */
        e.preventDefault();
        if (e.originalEvent.detail < 0) {
            $('.slider-nav').slick('slickPrev');
        } else if (e.originalEvent.detail > 0) {
            $('.slider-nav').slick('slickNext');
        }
    });
}

function buildGalleryList() {	
	$('#gallerySelect').html('').append(galleryDefaultRemoveOption);
	$('.gallery-slider img').each(function(galleryIdx, galleryVal) {
		$('#gallerySelect').append('<option>' + $(this).attr('src') + '</option>');
	});
}

function buildGalleryWidget() {
	buildGallerySlick()

    imposeSlideImage();
    $('.slider-nav').on('afterChange', function(event) {
        imposeSlideImage();
    });

    $('#galleryAdd').click(function() {
        var imageSource = $('#galleryURL').val();
        if (imageSource != null) {
            $('.slider-nav').slick('slickAdd', '<div><img src="' + imageSource + '"/></div>');
        }
    });

    $('#gallerySub').click(function() {
        var idxImg = $('#gallerySelect option:selected').index() - 1;
		$('.slider-nav').slick('slickRemove', idxImg).slick('unslick');
		buildGallerySlick();
		imposeSlideImage();
		
		buildGalleryList();
    });

    $('#galleryPlay').click(function() {
        $('.slider-nav').slick('slickPlay')
            .slick('slickSetOption', 'autoplaySpeed', 2000);
        $(this).hide();
        $('#galleryPause').fadeIn('slow');
    });

    $('#galleryPause').click(function() {
        $('.slider-nav').slick('slickPause');
        $(this).hide();
        $('#galleryPlay').fadeIn('slow');
    }).css('display', 'none');
}