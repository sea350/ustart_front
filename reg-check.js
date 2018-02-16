// Registration Page JS validation

// $('#pwNoMatch').css('display', 'none');
// $('#notedu').css('display', 'none');
// $('#eNoMatch').css('display', 'none');




function validateEmail() {
    alert("loaded javascript");
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
});

$(document).ready(function() {
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

// on document submission checks
$("#form-signup").on('post', function(e){
    console.log('I ran!');
    var email = $("#inputEmail").val(),
        confirmEm = $("#confirmEmail").val();
    if (email != confirmEm){
        alert('email and confirm do not match! Check over it!');
        e.preventDefault();
    }
});