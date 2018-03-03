// Registration Page JS validation

// $('#pwNoMatch').css('display', 'none');
// $('#notedu').css('display', 'none');
// $('#eNoMatch').css('display', 'none');

var allowSubmit = false;

var enableBtn = function() {
	allowSubmit = true;
    document.getElementById("submitButton").disabled = false;
}
function capcha_expired () {
    allowSubmit = false;
	document.getElementById("submitButton").disabled = true;
}
function check_if_capcha_is_filled (e) {
    if(allowSubmit && validateEmail()) return true;
    e.preventDefault();
    alert('Fill in the capcha!');
}

function hideEmailError() {
    var notEDUmsg = document.getElementById('notedu');
	notEDUmsg.style.display = "none";
}

function validateEmail() {
    var elementValue = document.getElementById('inputEmail');
    var notEDUmsg = document.getElementById('notedu');
    // checks if email is valid edu email
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(elementValue.value)) {

        if (elementValue.value.substring(elementValue.value.length - 4) == ".edu") {
            notEDUmsg.style.display = "none";

            return true;
        } else {
            notEDUmsg.style.display = "block";
            return false;
        }
    } else {
        notEDUmsg.style.display = "block";
        return false;
    }
}

function saveInputs() {
	sessionStorage.setItem('firstName', $('#fName').val());
	sessionStorage.setItem('lastName', $('#lName').val());
	sessionStorage.setItem('username', $('#uName').val());
	sessionStorage.setItem('inputEmail', $('#inputEmail').val());
	sessionStorage.setItem('country', $('#country option:selected').index());
	sessionStorage.setItem('state', $('#state option:selected').index());
	sessionStorage.setItem('city', $('#city').val());
	sessionStorage.setItem('zip', $('#zip').val());
	sessionStorage.setItem('universityName', $('#uni').val());
	sessionStorage.setItem('majors', $('#maj').val());
	sessionStorage.setItem('year', $('#inYr option:selected').index());
	sessionStorage.setItem('dob', $('#datetimepicker4').val());
}
function loadInputs() {
	$('#fName').val(sessionStorage.getItem('firstName'));
	$('#lName').val(sessionStorage.getItem('lastName'));
	$('#uName').val(sessionStorage.getItem('username'));
	$('#inputEmail').val(sessionStorage.getItem('inputEmail'));
	$('#country option').eq(sessionStorage.getItem('country')).prop('selected', true);
	populateStates("country", "states");
	$('#state option').eq(sessionStorage.getItem('state')).prop('selected', true);
	$('#city').val(sessionStorage.getItem('city'));
	$('#zip').val(sessionStorage.getItem('zip'));
	$('#uni').val(sessionStorage.getItem('universityName'));
	$('#maj').val(sessionStorage.getItem('majors'));
	$('#inYr option').eq(sessionStorage.getItem('year')).prop('selected', true);
	$('#datetimepicker4').val(sessionStorage.getItem('dob'));
}

$(document).ready(function() {
    $('#uDup').hide();
	/* Removed as of Jan 15
    $('#confirmEmail').keyup(function() {
        if ($(this).val() == $('#inputEmail').val()) {
            $('#eNoMatch').css('display', 'none');

        } else {
            if ($('#inputEmail').val() == '') {
                $('#eNoMatch').css('display', 'none');
            } else {
                $('#eNoMatch').css('display', 'block');
            }

        }
    });
	*/
	
    $('#inputPassword').keyup(function() {

        if ($(this).val() == $('#confirmPassword').val()) {
            $('#pwNoMatch').css('display', 'none');
        } else {

            if ($('#confirmPassword').val() == '') {
                $('#pwNoMatch').css('display', 'none');
                // $('#meter').css('display', 'none');

            } else {
                $('#pwNoMatch').css('display', 'block');
            }
        }
    });

    $('#confirmPassword').keyup(function() {
        if ($(this).val() == $('#inputPassword').val()) {
            $('#pwNoMatch').css('display', 'none');


        } else {

            if ($('#inPassword').val() == '') {
                $('#pwNoMatch').css('display', 'none');
            } else {
                $('#pwNoMatch').css('display', 'block');
            }

        }
    });
	
	$('button#finished').click(function() {
		saveInputs();
	});

	loadInputs();
});

// verifies everything is correct after document submit button is clicked
$(document).on('click', '#finished', function(e){
    var email = $("#inputEmail").val(),
        pass = $('#inputPassword').val(), conPass = $('#confirmPassword').val();
    if (pass != conPass){
        e.preventDefault();
    }
    
    var result = zxcvbn(pass);
    if (result.score == 0) {
        e.preventDefault();
    } else if (result.score == 1) {
        e.preventDefault();
    } 
});