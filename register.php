<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>ustart</title>
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="bower_components/moment/min/moment.min.js"></script>
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <script type="text/javascript" src="js/zxcvbn.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/layout.js"></script>
    <script src="js/countries.js"></script>
    <script src="js/reg-check.js"></script> 
    <script src='https://www.google.com/recaptcha/api.js?onload=reCaptchaCallback&render=explicit'></script>
    <link rel="stylesheet" href="css/register.css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- <link rel="stylesheet" href="/resources/demos/style.css"> -->
    
    <style type="text/css">
        .loadOver {
            background-color: white;
            z-index: 500;
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
        }
    </style>
</head>
    <script type="text/javascript">
    $(function() {
        $("#navBar-placeholder").load("templateNoUser.html");
    });
    </script>

<body onload="initialize(false);">
    <div id="loadOverId" class="loadOver"></div>

    <div id="navBar-placeholder"></div>
    <div id="centering">
        <div id="content">
            <div class="container">
                <form class="form-signup" id="form1" action="" method="post">
                    <h2 style="padding:0;">Sign up for your free month! </h2>
                    <!-- Name -->
                    <div class="row">
                        <div class="dropdown col-sm-6">
                            <label for="fName" class="sr-only">First Name</label>
                            <input type="text" id="fName" name="firstName" class="form-control" placeholder="First Name" required autofocus>
                        </div>
                        <div class="dropdown col-sm-6">
                            <label for="lName" class="sr-only">Last Name</label>
                            <input type="text" id="lName" name="lastName" class="form-control" placeholder="Last Name" required autofocus>
                        </div>
                    </div>
                    <!-- Email -->
                    <div class="row">
                        <div class="dropdown col-sm-6">
                            <label for="inEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email address" onblur="validateEmail()" required autofocus>
                            <p id="notedu" style="color: red;">You need an '.edu' email.</p>
                        </div>
                        <div class="dropdown col-sm-6">
                            <label for="confirmEmail" class="sr-only">Confirm Email</label>
                            <input type="email" id="confirmEmail" name="confirmEmail" class="form-control" placeholder="Confirm Email" required autofocus>
                            <p id="eNoMatch" style="color:red;">Sorry, emails do not match.</p>
                        </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <div class="dropdown col-sm-6">
                            <label for="inPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required autofocus>

                            <div id="meter-cont" class="progress password-progress" style=" margin-top: 5px; margin-bottom: 5px;">
                                <div id="meter" class="progress-bar" role="progressbar" style="width: 0;"></div>
                            </div>
                            <div id="bad-pass" style="display: none">
                                <p style="color: red;">Password not strong enough.</p>
                            </div>
                            <div id="left-empty" style= "display: none">
                                <p style="color: red;">You must enter a password.</p>
                            </div>

                            <script type="text/javascript">
                                // Password strength script
                                
                                var pass = document.getElementById('inputPassword');
                                var mcont = document.getElementById('meter-cont');
                                var meter = document.getElementById('meter');
                                var empty = document.getElementById('left-empty');
                                var bad = document.getElementById('bad-pass');
                                meter.style.display = "none";
                                empty.style.display = "none";
                                bad.style.display = "none";
                                mcont.style.display = "none";

                                pass.addEventListener('input', function() {

                                    var val = pass.value;

                                    meter.style.display = "block";
                                    if (val == '') {
                                        empty.style.display = "block";
                                        bad.style.display = "none";
                                        meter.style.display = "none";
                                        mcont.style.display = "none";

                                    }
                                    // pass into function to measure strength
                                    var result = zxcvbn(val);

                                    // Password progress bar
                                    var $bar = $('#meter');

                                    if (result.score == 0) {
                                        if (val == '') {
                                            empty.style.display = "block";
                                            bad.style.display = "none";
                                            meter.style.display = "none";
                                            mcont.style.display = "block";

                                        } else {
                                            $bar.attr('class', 'progress-bar progress-bar-danger').css('width', '0%');
                                            bad.style.display = "block";
                                            empty.style.display = "none";
                                            mcont.style.display = "block";
                                        }

                                    } else if (result.score == 1) {
                                        $bar.attr('class', 'progress-bar progress-bar-danger').css('width', '25%');
                                        bad.style.display = "block";
                                        empty.style.display = "none";

                                    } else if (result.score == 2) {

                                        $bar.attr('class', 'progress-bar progress-bar-danger').css('width', '50%');
                                        bad.style.display = "block";
                                        empty.style.display = "none";
                                    } else if (result.score == 3) {

                                        $bar.attr('class', 'progress-bar progress-bar-warning').css('width', '75%');
                                        bad.style.display = "none";
                                        empty.style.display = "none";
                                    } else { // score == 4
                                        $bar.attr('class', 'progress-bar progress-bar-success').css('width', '100%');
                                        bad.style.display = "none";
                                        empty.style.display = "none";
                                    }
                                });


                            </script>

                        </div>
                        <div class="dropdown col-sm-6">
                            <label for="confirmPass" class="sr-only">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Confirm Password" required autofocus>
                            <p id="pwNoMatch" style="color:red;">Sorry, passwords do not match.</p>
                            
            
                        </div>
                    </div>
                    <!-- Country, State / City, Zip -->
                    <div class="row">
                        <div class="dropdown col-sm-3">
                            <select id="country" name="country"></select>
                        </div>
                        <div class="dropdown col-sm-3">
                            <select name="state" id="state"></select>
                        </div>
                        <script language="javascript">
                        populateCountries("country", "state");
                        </script>
                        
                        <div class="dropdown col-sm-3">
                            <input id="city" name="city" class="form-control" placeholder="City"  autofocus>
                        </div>
                        <div class="dropdown col-sm-3">
                            <input id="zip" name="zip" class="form-control" placeholder="Zip"  autofocus>
                        </div>
                        
                        
                    </div>
                    <!-- School / Majors -->
                    <div class="row">
                        <div class="dropdown col-sm-6">
                            <input name="universityName" class="form-control" list="uni" placeholder="University/College" required autofocus>
                            <datalist id="uni" name="uniname">
                            </datalist>
                        </div>
                        <div class="dropdown col-sm-6">
                            <input type="text" id="maj" name="majors" class="form-control" placeholder="Major"
                             / required autofocus>
                        </div>
                        <?php
                                $conn_string = "host= ustart.tech port=5432 dbname=ustart_old user=ustart password=~m3lanKollymemes";
                                $dbconn = pg_connect($conn_string) or die("Connection failed");
                                $result = pg_query($dbconn, "select * from majors order by majorid");//get list of majors
                                $majorname = array();
                                $majorid = array();
                                while ($row = pg_fetch_row($result)) {
                                array_push($majorid, $row[0]);
                                array_push($majorname, $row[1]);
                                }

                                $result_2 = pg_query($dbconn, "select * from tbluniversities");
                                $uname = array();
                                $uid = array();
                                while ($row_2 = pg_fetch_row($result_2)) {
                                array_push($uid, $row_2[0]);
                                array_push($uname, $row_2[1]);
                                }
                            ?>
                            <script type=text/javascript>
                            //handle majors
                            var majorArray = <?php echo json_encode($majorname); ?>;
                            var majorIdArray = <?php echo json_encode($majorid); ?>;
                            
                            //handle university name
                            var uniArray = <?php echo json_encode($uname); ?>;
                            var uniIdArray = <?php echo json_encode($uid); ?>;
                            //var uniTBL=document.getElementById('uni');
                            $(function() {

                                $("#maj").autocomplete({
                                source: majorArray
                                });
                            } );
                            </script>
                    </div>
                    <!-- Year / DOB -->
                    <div class="row">
                        <div class="dropdown col-sm-6">
                            <select id="inYr" name="year">
                                <option value=''>Select Year</option>

                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post-Graduate">Post-Graduate</option>
                            </select>
                        </div>
                        <div class="dropdown col-sm-6">
                            <input type='text' placeholder="Date of Birth (MM/DD/YYYY)" class="form-control" id='datetimepicker4' name="dob" / required autofocus>
                        </div>
                        <script type="text/javascript">
                        $(function() {

                            $('#datetimepicker4').datepicker({
                                format: 'MM/DD/YYYY',
                                changeYear: true,
                                yearRange: "-100:+0"
                            });
                            

                        });
                        </script>
                    </div>
                    <br>
                    <div style="margin-left:auto; margin-right:auto; width: 305px;">
                        <div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="6Lc28xgUAAAAAJ3r2-QOBdhZFZocQKqfgXZKUAqU"></div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block" value="Submit" name="send" id="finished" disabled>Continue</button>
                    <script>
                    function recaptchaCallback() {
                        $('#finished').removeAttr('disabled');
                    }
                    </script>
                    <br>
                    <br>
                    <br>
                </form>
            </div>
        </div>
    </div>
    <footer id="foot"></footer>
</body>

<?php
    //$email = "this@gmail.edu";
    function isEduEmail($email){
      $email = explode(".",$email);
      if($email[count($email)-1] == "edu")
        return true;
      else
        return false;
    }

    //Turn information from form to variables for SQL INSERT query
    if(isset($_POST['send'])){
        $firstname = pg_escape_string($_POST['firstName']);
        $lastname = pg_escape_string($_POST['lastName']);
        $email = pg_escape_string(strtolower($_POST['inputEmail']));
        $password = pg_escape_string($_POST['inputPassword']);
        $major = pg_escape_string($_POST['majors']);
        $year = pg_escape_string($_POST['year']);
        $graddate = pg_escape_string($_POST['gradDate']);
        $school = pg_escape_string($_POST['universityName']);
        $confirmEmail = pg_escape_string(strtolower($_POST['confirmEmail']));
        $confirmPassword = pg_escape_string($_POST['confirmPassword']);
        
        $verif = pg_query("SELECT * FROM tblusers WHERE email = '$email'");
        $numrows = pg_num_rows($verif);
        //Check if emails are the same
        if($email <> $confirmEmail){
            echo "<script type='text/javascript'>alert('emails dont match bruh!');</script>";
        } else if($password <> $confirmPassword){       //Check if passwords are the same
            echo "<script type='text/javascript'>alert('passwords dont match bruh!');</script>";
        } else if($numrows == 1) {                      //If number of rows is 1, then you have an account registered already
            echo "<script type='text/javascript'>alert('You already have an account! Please go back and login with it.');</script>";
        } else if(!isEduEmail($email)){                 //check if email is an edu //if this is a new account
            $haveEmail = "Not a valid University email address, please try again!";
            echo "<script type='text/javascript'>alert('Not a valid University email address, please try again!');</script>";
            //$errorMsg = $errorMsg . $haveEmail;
        } else{
            $result = pg_query($dbconn, "INSERT INTO tblusers (firstname, lastname, email, pw, schoolname, major, grade, graduatedate)
            VALUES ('$firstname', '$lastname', '$email', '$password', '$school', '$major', '$year', '$graddate');");
            if (!$result) { //If query doesnt work
                $errormessage = pg_last_error();
                echo "<script type='text/javascript'>alert('$errormessage');</script>";
                exit();
            }
            $success = "Congrats, account created!";
            echo "<script type='text/javascript'>alert('$success');</script>";
        }
        
    }
    pg_close($dbconn);

    ?>

</html>
