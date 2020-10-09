<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Services Offered in Non-English Languages</title>
    <script src="globals.js?v=09.25.2020-0"></script>
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
//read all services for the current page's id
//var services = dspsXML.getElementsByTagName("ServiceItem");
var allLocations = dspsXML.getElementsByTagName("FIPs");
var providerInfoArray = [];
//alert("queryString is "+allLanguagesArray[queryString]);
//alert("allLocations "+allLocations.length)
//alert("queryString "+allLanguagesArray[queryString]+" "+typeof(allLanguagesArray[queryString]));
for (i=0;i<allLocations.length;i++){
    
    //alert("serviceLanguage is " + serviceLanguage);
    if(allLocations.item(i).getAttribute("languages")){
        var serviceLanguage = allLocations.item(i).getAttribute("languages");
        if (serviceLanguage.includes(allLanguagesArray[queryString])){
            var provider = allLocations.item(i).parentNode;
            provider = provider.parentNode;
            var providerID = provider.getAttribute("id");
            var providerName = provider.getElementsByTagName("Name");
            providerInfoArray.push(providerName.item(0).textContent+"!"+providerID);
        }
    }
}
providerInfoArray = removeDuplicates(providerInfoArray);
providerInfoArray.sort();
</script>
  </head>
  <body>
<a href=index.php>Return to main map</a>
<script>document.write('<h2>'+allLanguagesArray[queryString]+'</h2><div class="ebaBlue">The following providers offer services in '+allLanguagesArray[queryString]+":</div>");</script>
<ul>
<script> 
//Show the providers offering this service
for (k=0;k<providerInfoArray.length;k++){
    var providerInfo = providerInfoArray[k].split("!");//1=ID, 2=Name, 3=programs
    document.write("<li><a href=provider.php?id="+providerInfo[1]+">");//?map=all>
    document.write(providerInfo[0]+"</a></li>");
    /*
    if (providerInfo[2] !== "null"){
        document.write("<ul><li><b>Programs: </b>" + providerInfo[2]+"</li></ul>");
    }*/
}
document.write("</ul>");    
</script>
</ul>
	</body>
</html>
