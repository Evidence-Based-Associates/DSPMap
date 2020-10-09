<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Print Provider Services</title>
    <script src="globals.js"></script>
    <script src="mainmapdata.js?v=7.10.2017-3"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">
    </head>
<body>
<ul>
<script>
var providers = dspsXML.getElementsByTagName("Provider");
//put provider info in array to alphabetize
for (var i=0;i<providers.length;i++){
    var providerName = providers.item(i).getElementsByTagName("Name").item(0).textContent;
    var providerContact = providers.item(i).getElementsByTagName("ContactName").item(0).textContent;
    var providerEmail = providers.item(i).getElementsByTagName("ContactEmail").item(0).textContent;
    var providerServices = providers.item(i).getElementsByTagName("ServiceItem");
    document.write(providerContact+"!"+providerName+"!"+providerEmail+"<br>");
}
</script>
</ul>
</body>
</html>