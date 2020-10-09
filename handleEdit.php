<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Editing DSP</title>
</head>
<body>
<?php
//this appends the file with a string - will be useful when adding a Provider
$file = 'dsps.xml';
// Open the file to get existing content
$current = file_get_contents($file);
// Append a new person to the file
$current = $_POST["xmlCode"];
// Write the contents back to the file
//file_put_contents($file, $current);stripslashes($contents)
file_put_contents($file, stripslashes($current));
$mailResult = mail("joelnwalkley@gmail.com","New DSP Change Request",stripslashes($current));
?>
<script type="text/javascript">
document.location.href = "provider.php?id="+<?php echo $_POST["providerID"]?>;
</script>
</body>