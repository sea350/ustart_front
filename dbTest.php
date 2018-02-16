<?php
    // Establishing Database connection
    $dbHost='ustart.tech';
    $dbPort=5432;
    $dbName='ustart_old';
    $dbUser='ustart';
    $dbPass='~m3lanKollymemes';
    $conn_string = "host=$dbHost port=$dbPort dbname=$dbName user=$dbUser password=$dbPass";
    $dbconn = pg_connect($conn_string) or die("Connection failed");

    echo $dbconn;
	
	/*
	$result = pg_query($dbconn, "select * from majors order by majorid");//get list of majors
    $majorname = array();
    $majorid = array();
    while ($row = pg_fetch_row($result)) {
		echo $row[1];
        array_push($majorid, $row[0]);
        array_push($majorname, $row[1]);
    }
	*/
	
    $result_2 = pg_query($dbconn, "select * from tbluniversities");
    $uname = array();
    $uid = array();
    while ($row_2 = pg_fetch_row($result_2)) {
        array_push($uid, $row_2[0]);
        array_push($uname, $row_2[1]);
    }

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
    }
    pg_close($dbconn);
 ?>
    