<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Submission Received</title>
</head>
<body>
<?php
//this appends the file with a string - will be useful when adding a Provider
$file = 'submissions.txt';
// Open the file to get existing content
$current = file_get_contents($file);
//add a break
$current .= "\r\r---*******BREAK******---\r\r";
// Append a new person to the file
$current .= "Submitted by: ";
$current .= $_POST["submitterN"];
$current .= "\r";
$current .= "Email: ";
$current .= $_POST["submitterE"];
$current .= "\r\r";
$current .= $_POST["DSPXMLCode"];
$current .= "\r\r---*******Break*******---\r\r";
$thisSubmission = "Submitted by: ";
$thisSubmission .= $_POST["submitterN"];
$thisSubmission .= "\r";
$thisSubmission .= "Email: ";
$thisSubmission .= $_POST["submitterE"];
$thisSubmission .= "\r\r";
$thisSubmission .= $_POST["DSPXMLCode"];
// Write the contents back to the file
//file_put_contents($file, $current);stripslashes($contents)
file_put_contents($file, stripslashes($current));
// send email
$mailResult = mail("joelnwalkley@gmail.com","New DSP Change Request",stripslashes($thisSubmission));
?>
<script type="text/javascript">
alert("Your submission has been received.\r\rSubmissions are processed manually at regular intervals. You may need to clear your browswer history to show changes after they are updated. \r\rPlease contact Joel Walkley to inquire about the status of your change request or to request assistance: joelnwalkley@gmail.com \r\rYou will now be redirected to our main website.");
document.location.href = "http://evidencebasedassociates.com/";
</script>
</body>