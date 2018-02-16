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

$(document).ready(function() {
    $('#eNoMatch').ready(function() {});
    $('#inputEmail').keyup(function() {
        if ($(this).val() == $('#confirmEmail').val()) {
            $('#eNoMatch').css('display', 'none');

        } else {
            if ($('#confirmEmail').val() == '') {
                $('#eNoMatch').css('display', 'none');
            } else {
                $('#eNoMatch').css('display', 'block');
            }
        }
    });

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
});

// verifies everything is correct after document submit button is clicked
$(document).on('click', '#finished', function(e){
    var email = $("#inputEmail").val(), confirmEm = $("#confirmEmail").val(),
        pass = $('#inputPassword').val(), conPass = $('#confirmPassword').val();
    if (email != confirmEm){
        e.preventDefault();
    } else if (pass != conPass){
        e.preventDefault();
    }
    
    var result = zxcvbn(pass);
    if (result.score == 0) {
        e.preventDefault();
    } else if (result.score == 1) {
        e.preventDefault();
    } 
});