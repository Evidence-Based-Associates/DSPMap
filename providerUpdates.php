<!DOCTYPE html>
<!--
Copyright (c) 2017 to 2018 - Evidence Based Associates LLC
Developed by Joel N. Walkley, under the employment of EBA
Any questions and comments can be directed to joelnwalkley@gmail.com
-->
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>DJJ Continuum Provider Map</title>
    <script src="globals.js"></script>
    <script src="mainmapdata.js?v=9.13.2017-0"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-103149868-1', 'auto');
  ga('send', 'pageview');

</script>
<script>

//Get a list of all the providers
var providers = dspsXML.getElementsByTagName("Provider");

</script>

  </head>
  <body>
<h2>Provider List:</h2>
<i>sorted by most recent update</i><br><br>
<script>
//put provider info in array to alphabetize
var sortedProviders = [];
for (i=0;i<providers.length;i++){
    var providerName = providers.item(i).getElementsByTagName("Name");
    var providerID = providers.item(i).getAttribute("id");
    var providerUpdate = providers.item(i).getElementsByTagName("LastUpdated");
    sortedProviders.push(providerUpdate.item(0).textContent+"!"+providerName.item(0).textContent +"!"+providerID);
}
//alphabetize
sortedProviders.sort();
sortedProviders.reverse();

//print
document.write("<ul>");
for (i=0;i<sortedProviders.length;i++){
    //seperate the ID from the name
    var providerInfo = sortedProviders[i].split("!");//providerInfo[0] is lastupdate [1] is Name [2] is ID
    document.write("<li><a href=provider.php?id="+providerInfo[2]+">");//?map=all>
    document.write(providerInfo[0]);
    document.write(" "+providerInfo[1]);
    document.write("</a></li>");
}
document.write("</ul>");
</script>
</script>
	</body>
</html>
