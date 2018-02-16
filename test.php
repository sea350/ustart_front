<html>
<head>
<title>USTART Project</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/dropzone.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/dropzone.js"></script>
    <script>
       /*Dropzone.options.myDropzone= {
        url: '/',
        autoProcessQueue: false,
        acceptedFiles: 'image/*',
        init: function() {
            myDropzone = this; // Makes sure that 'this' is understood inside the functions below.

            // for Dropzone to process the queue (instead of default form behavior):
            document.getElementById("submit-all").addEventListener("click", function(e) {
                // Make sure that the form isn't actually being sent.
                e.preventDefault();
                e.stopPropagation();
                myDropzone.processQueue(); // upload files and submit the form
            });

            //send all the form data along with the files:
            this.on("sendingmultiple", function(data, xhr, formData) {
                formData.append("firstname", ("#firstname").val());
                formData.append("lastname", ("#lastname").val());
            });
            }
        }*/
    </script>
    <script type="text/javascript">
        Dropzone.options.myAwesomeDropzone = {
                  autoDiscover = false,
                  maxFilesize: 20, // Size in MB
                  addRemoveLinks: true,
                    removedfile: function(file) { 
                      var fileRef;
                      return (fileRef = file.previewElement) != null ? 
                              fileRef.parentNode.removeChild(file.previewElement) : void 0;
                    }

        };
</script>
</head>
<body>
    <form action="test.php" class="dropzone" id="my-awesome-dropzone">
    </form>
    <?php
    echo ("here");
if (!empty($_FILES)) {
	 
	$temporaryFile = $_FILES['file']['tmp_name'];     
	echo ("done");
}
?>
</body>


</html>
