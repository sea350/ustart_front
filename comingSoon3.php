<!DOCTYPE html>
<html>
<?php
$conn_string = "host= ustart.today port=5432 dbname=ustart user=ustart password=~m3lanKollymemes";
$dbconn = pg_connect($conn_string) or die("Connection failed");
if (isset($_POST['postsubmit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $result = pg_query($dbconn,"SELECT COUNT(uid) FROM newsletter WHERE email = '$email'");
    $row = pg_fetch_array($result);
    if ($row['count'] > 0) {
        //echo "That email is already being used.";
        $error = true;
    }
    else {
        $result2 = pg_query($dbconn,"insert into newsletter (uname, email) values ('$name', '$email')");
        //echo "submitted";
    }
}
?>
<head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>ustart</title>
        <link href="css/comingSoon.css" rel="stylesheet" type="text/css" />
        <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    
</head>
    
<body>
    <div id="centering">
        	<a><img src="img/Background/ustartBackground.png" style="width: 75%; height: 100%; cursor: default; user-select: none; -moz-user-select: none;"></a>
                <div id= "theBox"> 
                    <form method="post" style="user-select: none; -moz-user-select: none;">
							<input id="textName" type="text" name="name" class="form-control" placeholder="Name:" required autofocus>
							<input id="emailName" type="email" name="email" class="form-control" placeholder="Email:" required>
							<input id="submitButton" type="submit" name="postsubmit" value="Submit" disabled>
							<br/><br/>
				    </form>
                </div>
                <a><img src="img/Background/19125491_721752691330368_2091258245_o.png" style="width: 75%; height: 100%; padding-left: 1em; cursor: default; user-select: none; -moz-user-select: none;"></a>
                	<div id="socialsBox">
                		<table id="socialsBox" style="user-select: none; -moz-user-select: none; overflow-x:auto;">
                			<tr>
                				<td><a id="instagramIcon" href="https://www.instagram.com/ustarttech" class="fa fa-instagram" target="_blank"></a></td>
                				<td><a id="snapchatIcon" href="https://www.snapchat.com/add/ustarttech" class="fa fa-snapchat-ghost" target="_blank"></a></td>
                				<td><a id="facebookIcon" href="https://www.facebook.com/ustarttech/" class="fa fa-facebook" target="_blank"></a></td>
                				<td><a id="twitterIcon" href="https://twitter.com/ustarttech" class="fa fa-twitter" target="_blank"></a></td>
                				<td><a id="youtubeIcon" href="https://www.youtube.com/channel/UCUyqXnQeM-M19waKEbrDrwg" class="fa fa-youtube" target="_blank"></a></td>
                                <td><a id="soundcloudIcon" href="https://soundcloud.com/user-808868756" class="fa fa-soundcloud" target="_blank"></a></td>
                			</tr>
                		</table>
                    </div>          
    </div>                      
</body>

</html>