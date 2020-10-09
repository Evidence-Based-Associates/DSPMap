<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Print Provider Services</title>
    <script src="mainmapdata.js?v=7.10.2017-3"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">
    </head>
<body>
<ul>
<script>
var providers = dspsXML.getElementsByTagName("Provider");
//put provider info in array to alphabetize
var sortedProviders = [];
document.write("<ul>");
for (var i=0;i<providers.length;i++){
    var providerName = providers.item(i).getElementsByTagName("Name").item(0).textContent;
    document.write("<li>"+providerName+"</li>");
    document.write("<ul>");
    var providerServices = providers.item(i).getElementsByTagName("ServiceItem");
    for (var j=0;j<providerServices.length;j++){
        document.write("<li>"+providerServices.item(j).textContent+"</li>");
    }
    document.write("</ul>");
}
document.write("</ul>");
</script>
</ul>
</body>
</html>