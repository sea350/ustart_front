<?php
$dbHost='ustart.tech';
$dbPort=5432;
$dbName='ustart_old';
$dbUser='ustart';
$dbPass='~m3lanKollymemes';
$conn_string = "host=$dbHost port=$dbPort dbname=$dbName user=$dbUser password=$dbPass";
$dbconn = pg_connect($conn_string) or die("Connection failed");
$result = pg_query($dbconn, "select * from tbluniversities");
                                while ($row_2 = pg_fetch_row($result)) {
                                echo('"'.$row_2[1].'",');
}
?> 