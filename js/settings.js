function readURLAvatar(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $("#avatarImg").attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLBanner(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $("#bannerImg").attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function alterStatus() {
	if ($("#work_availability").is(':checked')) {
		$("#switchStatusMessage").text("Available");
		$("#switchStatusMessage").addClass('green-light');
	} else {
		$("#switchStatusMessage").text("Busy");
		$("#switchStatusMessage").removeClass('green-light');
	}
}

function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function makeid(len) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function loadUserData() {
	// Alter these fields upon load to their respective values for the user; these are currently predefined.
	var workAvailability = true;
	var phoneNumber = '(343) ' + pad(Math.floor(Math.random() * 999), 3) + '-' + pad(Math.floor(Math.random() * 9999), 4);
	var genderSelection = 'Unspecified';
	var emailAddress = makeid(10) + '@gmail.com';
	var usrDescription = 'Lorem ipsum dolor sit amet, purto assum nec ut, platonem patrioque inciderint eu ius, soluta albucius incorrupte eum at. Eos salutandi periculis id, ad duo nobis delicatissimi. Omnium audiam at mei. Choro nusquam splendide vim an.';
	var firstname = 'Mr.';
	var lastname = 'Robot';
	var usrCountry = 'United States';
	var usrState = 'New York';
	var usrCity = 'New York';
	var usrZip = '10021';
	var usrtype = 'High School Student';
	var hsname = 'Vanguard High School';
	var hsgraddate = '06/26/2000';
	var uniname = 'Marymount Manhattan College';
	var unimajor = 'Ancient Greek';
	var uniclass = 'Graduate';
	var unigraddate = '06/17/2004';
	
	// The following loads the above variables into their respective fields
	$('input#work_availability').prop('checked', workAvailability);
	$('input#pnumber').val(phoneNumber);
	$('select#gender_select option')
		.prop('selected', false)
		.filter(function() {
			return $.trim($(this).text()) == genderSelection;
		})
		.prop('selected', true);
	$('input#inputEmail').val(emailAddress);
	$('textarea#inputDesc').val(usrDescription);
	$('input#fname').val(firstname);
	$('input#lname').val(lastname);
	$('select#country option').filter(function() {
		return $.trim($(this).text()) == usrCountry;
	}).prop('selected', true);
	$('select#country').trigger('change');
	$('select#state option').filter(function() {
		return $.trim($(this).text()) == usrState;
	}).prop('selected', true);
	$('input#city').val(usrCity);
	$('input#zip').val(usrZip);
	$('input#schoolname').val(hsname);
	$('input#highSchoolGradDate').val(hsgraddate);
	$('input#uni').val(uniname);
	$('input#maj').val(unimajor);
	$('select#inYr option').filter(function() {
		return $.trim($(this).text()) == uniclass;
	}).prop('selected', true);
	$('input#uniGradDate').val(unigraddate);
	$('select#type_select option').filter(function() {
		return $.trim($(this).text()) == usrtype;
	}).prop('selected', true);
}

function createAlert(element, alertMessage) {
	var saveMessage = $(element).find('div.save-message');
	saveMessage.text(alertMessage);
	saveMessage.removeClass('fade').delay(3000).queue(function(){
		$(this).addClass('fade').dequeue();
	});
}

function eduCheck(usrtype) {
	if (usrtype == "High School Student") {
		$('input#schoolname').attr('required', true);
		$('input#highSchoolGradDate').attr('required', true);
		
		$('input#uni').attr('disabled', true);
		$('input#maj').attr('disabled', true);
		$('select#inYr').attr('disabled', true);
		$('input#uniGradDate').attr('disabled', true);
	} else if (usrtype != "High School Student") {
		$('input#schoolname').attr('required', false);
		$('input#highSchoolGradDate').attr('required', false);
		
		$('input#uni').attr('disabled', false);
		$('input#maj').attr('disabled', false);
		$('select#inYr').attr('disabled', false);
		$('input#uniGradDate').attr('disabled', false);
	}
}
$(document).ready(function() {
	//project setting
    $('.vertical-menu ul').on('click', '.project-menu-list', function(event) {
        $('.project-menu-list.active').removeClass('active');
		$(this).addClass('active');
		if ($('li[data-target="projectImage"]').hasClass("active")) {
			//$('.vertical-menu').css({'border-right': 'none;'});
			$('.vertical-menu').css({'border-right': 'none'});			
			$('.projectContents').css({'border-left': '1px solid #808080'});
		  }
		else{	 
			$('.projectContents').css({'border-left': 'none'});			
			$('.vertical-menu').css({'border-right': '1px solid #808080'});			
		}	
        $("#"+$(this).data('target')).show().siblings("div").hide();
	}); 	
	//profile settting
    $('.vertical-menu ul').on('click', '.menu-list', function(event) {
        $('.menu-list.active').removeClass('active');
		$(this).addClass('active');
		if ($('li[data-target="images"], li[data-target="profile"]').hasClass("active")) {
			//$('.vertical-menu').css({'border-right': 'none;'});
			$('.vertical-menu').css({'border-right': 'none'});			
			$('.contents').css({'border-left': '1px solid #808080'});
		  }
		else{	 
			$('.contents').css({'border-left': 'none'});			
			$('.vertical-menu').css({'border-right': '1px solid #808080'});			
		}	
        $("#"+$(this).data('target')).show().siblings("div").hide();
	}); 

	$(".usr-vis-opt input[type='checkbox']").each(function(index) {
		$(this).change(function() {
			var forname = $(this).parent().prev().attr('for');
            $('input[name="'+forname+'"], select[name="'+forname+'"], textarea[name="'+forname+'"]').prop("disabled", !this.checked);
            
		});
	});
	//loadUserData();
	alterStatus();
	eduCheck($('select#type_select option:selected').val());
	
	$("form#avatarChange").submit(function(event) {
		//event.preventDefault();
		createAlert(this, "Account images and status have been altered and saved.");
	});
	
	$("form#contactChange").submit(function(event) {
		//event.preventDefault();
		createAlert(this, "Contact and description have been altered and saved. Email change must be confirmed in an incoming email to the old email address.");
	});
	
	$("form#nameChange").submit(function(event) {
		//event.preventDefault();
		createAlert(this, "Your name have been altered and saved.");
	});
	
	$("form#passChange").submit(function(event) {
		//Put verification of password with the user's password.\
		if ($('input#newpass').val() == $('input#confirmpass').val()) {
			$(this).find('div.save-message').addClass('error-message');
			$('input#oldpass, input#newpass, input#confirmpass').val("");
			createAlert(this, "Password does not match.");
			return false;
		} else {
			$(this).find('div.save-message').removeClass('error-message');
			createAlert(this, "Request found. Performing password match.");
		}
	});
	
	$("form#locChange").submit(function(event) {
		//event.preventDefault();
		createAlert(this, "Location details have been altered and saved.");
	});
	
	$('select#type_select').change(function() {
		var usrtype = $('select#type_select option:selected').val();
		eduCheck(usrtype);
	});
	
	$("form#eduChange").submit(function(event) {
		//event.preventDefault();
		createAlert(this, "Education details have been altered and saved.");
	});
	
	$("form#deleteAccountForm").submit(function(event) {
		//event.preventDefault();
		if (confirm("Wait! The account will be no longer accessible. However, the account won't be deleted on the server.")) {
			window.location.replace("http://ustart.tech/index2.html");
		}
	});
	
    if(location.hash != null && location.hash != ""){
        $('.collapse').removeClass('in');
        $(location.hash + '.collapse').collapse('show');
    }
});