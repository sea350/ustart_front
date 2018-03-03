<?php
$conn_string = "host= ustart.today port=5432 dbname=ustart user=ustart password=~m3lanKollymemes";
$dbconn = pg_connect($conn_string) or die("Connection failed");
if (isset($_POST['name']) && isset($_POST['email'])) {
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

<!DOCTYPE html>
<html>
	<head>
		<!--enabling icons-->
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

            <MetA chaRset=utf-8></MetA>
			<!--<MeTa nAmE="viewport" ConTent=width=device-width>-->
            <metA nAME=viewport coNteNT="width=device-width, initial-scale=1"></metA>
			<lINk REl="stylesheet" Href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
			<TITlE>ustart</TITlE>
			<script></script>
			<!--<script src='https://www.google.com/recaptcha/api.js'></script>-->
			<!--<script src='https://www.google.com/recaptcha/api.js?onload=reCaptchaCallback&render=explicit'></script>-->
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
			<!--<scriPt></ScRiPt>-->
			<!--<LINk hRef=css/aboutUs.css REl=stylesheet TyPe="text/css" />-->
			<link hReF="css/comingSoon2.css" rel="stylesheet" Type=text/css />
			<LInK HReF="css/layout.css" rel="stylesheet" type=:text/css: />
			<script src="js/reg-check.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></lINk>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
			<style>
			.loadOver{
			background-color:white;
			z-index:500;
			height:100vh;
			width:100vw;
			position:fixed;
			top:0;
			left:0;
			}   
			</style>
    </head>        
	<body style="background-color: initial;">
		<DiV ID="loadOverId" class=="loadOver"></diV>
		<!--<div id="navBar"></div>
		<dIV id="notifPan"></Div>-->
		<dIv iD=centering>
			<DIv id="ustartPicture"></dIV>
			<dIV id="content">
			<!--<Div iD=title>Coming Soon!</dIV>-->
				<A id="uBackground"><IMG SrC=img/Background/ustartBackground.png></a>
				<diV id=description>
					<Div id= "theBox"> 
						<foRm mEtHOD="post" StYle="user-select: none; -moz-user-select: none;">
							<InPut id="textName" TYPe="text" NAME="name" class="form-control" pLAcEHoldER="Name:" required autofocus>
							<iNPUT id="emailName" TYPE="email" naMe="email" class="form-control" PLAcEhOLder="Email:" onfocus="hideEmailError()" onblur="validateEmail()" required>
							<p id="notedu">Needs to be an actual email!</p>
							<iNPUt id="submitButton" tYpE="submit" nAMe="submit" ValuE="Submit" disabled>
							
							<br/><br/>
						</fOrm>
						</dIv>
						<A id="socialMediaPic"><iMG srC="img/Background/19125491_721752691330368_2091258245_o.png"></A>
						<diV id="socialsBox">
							<TABlE Id=socialsBox stYLE="user-select: none; -moz-user-select: none;">
								<tR>
									<td><a style="text-decoration: none;" Id="instagramIcon" HREF="https://www.instagram.com/ustart.today" ClAss="fa fa-instagram" tArGET="_blank"></a></TD>
									<tD><A style="text-decoration: none;" iD="snapchatIcon" href="https://www.snapchat.com/add/ustarttoday" ClAss="fa fa-snapchat-ghost" targEt="_blank"></A>
									<td><a style="text-decoration: none;" ID="facebookIcon" hRef="https://www.facebook.com/ustarttoday/" cLASS="fa fa-facebook" Target=_blank></A></td>
									<TD><a style="text-decoration: none;" Id="twitterIcon" hrEF="https://twitter.com/ustarttoday" cLAss="fa fa-twitter" TargET="_blank"></a>
									<TD><A style="text-decoration: none;" id="youtubeIcon" HREf="https://www.youtube.com/channel/UCUyqXnQeM-M19waKEbrDrwg" ClASS="fa fa-youtube" targET="_blank"></A></Td>
									<tD><A style="text-decoration: none;" ID="soundcloudIcon" hREF="https://soundcloud.com/user-808868756" clAss="fa fa-soundcloud" TarGET=_blank></a></TD>
								</TR>
							</TabLE>
							</DiV>
						</Div>
						<!--<BLOCkquotE ClAss="instagram-media" data-instgrm-captioned data-instgrm-VerSIOn=7 StYlE=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><dIv sTyLe="padding:8px;"> <dIV sTyLe=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <dIV stYle=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></Div></Div> <P Style=" margin:8px 0 0 0; padding:0 4px;"> <a hREf=https://www.instagram.com/p/BUy_NBtj-p2/ StyLe=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" taRgEt=_blank>YOU ARE #LIMITLESS #hustle #workhard #create #patience #wontstop #mindset #freedom #ambition #thinkbig #success #startup #inspire #work #love #entrepreneur #entrepreneurship #leadership #life #insperationalquotes #inspire #morningmotivation</a></p> <P sTYle=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by U•START (@ustarttech) on <TImE STyLE=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" DateTImE=2017-06-01T12:18:26+00:00>Jun 1, 2017 at 5:18am PDT</Time></dIv></bLOCkquoTe>-->
					<bR><bR><Br>             
				</Div>                      
			</diV>
		</dIv>
		<!--<dIV id=theLogIn stYle="visibility:hidden"></dIV>-->
			<!--<div Id="foot">
			<taBle>
			<tr>
				<th>Check Us
				<TH>Learn More
				<TH>Our Company
			
			<Tr>
				<td><a HREf=https://www.facebook.com/ustarttech/ tArget=_blank>Facebook</a>
				<TD>Our Goal</TD>
				<Td><a href="aboutUs.php">About Us</a>
			
			<TR>
				<tD><A hrEF="https://twitter.com/ustarttech" tArGET=_blank>Twitter</a>
				<tD> <A href = "http://memes.ucoz.com/_nw/32/08173924.jpg" target = "_blank">Help Center</a></tD>
				<a HREf=https://i.imgur.com/Y7o0mdSh.jpg tarGet=_blank>
				<TD>Careers
			</tr>
			<tr>
				<tD><a hrEf="https://www.youtube.com/channel/UCUyqXnQeM-M19waKEbrDrwg" tarGEt=_blank>Youtube</A></td>
				<tD>Terms</td>
				<TD><a href = "https://img.clipartfest.com/7fb7fbcb33899412bc3a006435cab1fd_trump-meme-trump-meme_610-457.png" tARget="_blank">Investors</a></tD>
			</tR>
			<TR>
				<TD><a hreF=https://www.instagram.com/ustarttech target=_blank>Instagram</A></tD>
				<Td></td>
				<Td></TD>
			</Tr>
			<tr>
				<TD><a HrEf="https://www.snapchat.com/add/ustarttech" TargEt="_blank">Snapchat</A></Td>
				<tD>
				<td>
			-->
	</body>
</html>