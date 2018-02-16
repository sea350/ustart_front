<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>ustart</title>
        <script src="js/index2.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link href="css/index2.css" rel="stylesheet" type="text/css" />
        <link href="css/footer-styles.css" rel="stylesheet" type="text/css" />
        <link href="css/layout1.css" rel="stylesheet" type="text/css" />
    	<link href="https://fonts.googleapis.com/css?family=Gudea" rel="stylesheet">
    	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">
        </script>
		
        <script type="text/javascript">
            $(function() {
                $("#navBar-placeholder").load("templateNoUser.html");
                $("#footer-placeholder").load("template-footer.html");
            });
            $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
        </script>
  
		<style>
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
    <body onload="startSlide();" style="overflow-y:scroll; margin-top: 3.6em;">
		<!--Account Not Found-->
    <div id="navBar-placeholder"></div>

	    <div id="theLogIn" style="visibility:hidden">
	        <form action = "login.php" method = "post">
	            <table>
	                <tr>
	                    <td><label for="email">Email</label></td>
	                    <td><label for="pass">Password</label></td>
	                </tr>
	                <tr>
	                    <td><input type="email" class="inputtext" name="email" id="email"></td>
	                    <td><input type="password" class="inputtext" name="pass" id="pass"></td>
	                    <td><label style="" id="loginbutton">
	                        <input value="Log In" type="submit"></label></td>
	                </tr>
	                <tr>
	                    <td></td>
	                    <td><a href="forgotPassword.php">Forgot password?</a></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	</div>

		<div id="slides">
			<div id="slideDes">
				<h2 id="slideTitle" style="padding-left: 0">Closed Beta Coming Soon</h2>
				Please do not use this description as this is just a placeholder and it is plagiarized. We connect entrepreneurs and startups to talented software developers to launch and advance their venture! Whether you are a startup looking to connect with tech talent, or a developer looking to gain experience working with awesome startups - we are a community of innovators and makers looking to change the world!
			</div>
		</div>
		<div onclick="prevImg()" class="arrow" id="arrowPrev">&lt</div>
		<div onclick="nextImg()" class="arrow" id="arrowNext">&gt</div>
	<div id="footer-placeholder"></div>

    </body>
</html>