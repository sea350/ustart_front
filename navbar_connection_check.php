<?php
//This is for connecting to the session storage of the user.
//The profile picture, the firstname, and the login unique identifier can be acquired from the session.
//Replace this with a server-side session in Flask.

$conn_string = "host= code.engineering.nyu.edu port=55432 dbname=ds3930 user=ds3930 password=mani1laFrugal";
$dbconn = pg_connect($conn_string) or die("Connection failed");
session_start();

$user_check = $_SESSION['username'];

if(!isset($_SESSION['username'])){
    $user_data = array('login_uid' => -1, 'firstname' => "", 'profile' => "");
    echo json_encode($user_data);
    exit();
}

//find uid
$result_2 = pg_query($dbconn,"select userid from tblusers where email = '$user_check'");
$row_2 = pg_fetch_array($result_2,'userid',PGSQL_ASSOC);
$login_uid= $row_2['userid']; //store login uid from array

$getinfo = "select * from public.tblusers where userid = '$login_uid'";
$query = pg_query($dbconn, $getinfo);
$row = pg_fetch_array($query);

$user_data = array('login_uid' => $login_uid, 'firstname' => $row['firstname'], 'profile' => $row['avatar']);

echo json_encode($user_data);