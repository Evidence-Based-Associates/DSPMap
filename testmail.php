<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Editing DSP</title>
</head>
<body>
<?php
//echo $_POST["DSPXMLCode"];
// the message
$msg = "You have received a DSP Change Request\r\r";
$msg .= "Submitter:";
$msg .= $_POST["submitterName"];
$msg .= "\r";
$msg .= "Email:";
$msg .= $_POST["submitterE"];
$msg .= "\r\n";
$msg .= "COMMENT: ";
$msg .= $_POST["commentBox"];
$msg .= "\r\r";
$msg .= "TEST MSG";//stripslashes($_POST["DSPXMLCode"]);

// use wordwrap() if lines are longer than 70 characters
//$msg = wordwrap($msg,70);

// send email
$mailResult = mail("jwalkley@ebanetwork.com","New DSP Change Request",$msg);
echo "<br><br>" . $msg;
echo "<br><br>";
echo "mailResult is " . $mailResult;
echo "Thank you. Your change request has been submitted. <br>If you do not receive an email to confirm this request within 2 weeks, please feel free to contact your Regional Service Coordinator";
//this appends the file with a string - will be useful when adding a Provider
//$file = 'dsps.xml';
// Open the file to get existing content
//$current = file_get_contents($file);
// Append a new person to the file
//$current = $_POST["xmlCode"];
// Write the contents back to the file
//file_put_contents($file, $current);stripslashes($contents)
//file_put_contents($file, stripslashes($current));    
?>
<script type="text/javascript">
//document.location.href = "provider.php?id="+<?php echo $_POST["providerID"]?>+"?map=all";
</script>
</body>