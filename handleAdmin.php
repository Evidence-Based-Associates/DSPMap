<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Editing DSP</title>
</head>
<body>
<?php
//this appends the file with a string - will be useful when adding a Provider
//$file = 'dsps.xml';
$file = $_POST["fileName"];
// Open the file to get existing content
$current = file_get_contents($file);
// Append a new person to the file
$current = $_POST["xmlCode"];
// Write the contents back to the file
file_put_contents($file, stripslashes($current));    
?>
<script type="text/javascript">
document.location.href = "admin.php";
</script>
</body>