<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Services Offered</title>
    <script src="globals.js?v=08.21.2021-0"></script>
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
//Clear the map
for (i=0;i<allFips.length;i++){
    simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color = "default";
    simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "default";
}
//remove colors to allow coverage to be seen
simplemaps_statemap_mapdata.regions["0"].color = "default";
simplemaps_statemap_mapdata.regions["1"].color = "default";
simplemaps_statemap_mapdata.regions["2"].color = "default";
simplemaps_statemap_mapdata.regions["3"].color = "default";
simplemaps_statemap_mapdata.regions["4"].color = "default";

//read all services for the current page's id
var services = dspsXML.getElementsByTagName("Service");
var providerArray = [];
var fipsArray = [];
    
for (i=0;i<services.length;i++){
    if (services.item(i).getAttribute("serviceName") == availableServices[queryString]){
        var provider = services.item(i).parentNode;
        var providerID = provider.getAttribute("id");
        var providerName = provider.getElementsByTagName("Name").item(0).textContent;
        providerArray.push(providerName+"!"+providerID);
        //toggle the map
        //get locations.
        var locations = services.item(i).getElementsByTagName("FIPs");
        for (var j=0;j<locations.length;j++){
            fipsArray.push(locations[j].textContent+"!"+locations[j].getAttribute("travelReq"));
        }
    }
}
//
for (var i=0;i<fipsArray.length;i++){
    var fipsTravel = fipsArray[i].split("!");
    if (fipsTravel[1]=="Y"){
        simplemaps_statemap_mapdata.state_specific[fipsTravel[0]].color = TravelColor;
    }   
}
for (var i=0;i<fipsArray.length;i++){
    var fipsTravel = fipsArray[i].split("!");
    if (fipsTravel[1]=="N"){
        simplemaps_statemap_mapdata.state_specific[fipsTravel[0]].color = RegColor;
    }   
}
//
providerArray = removeDuplicates(providerArray);
providerArray.sort();
</script>
  </head>
  <body>
<a href=index.php>Return to main map</a>
<script>document.write('<h2>'+availableServices[queryString]+'</h2>');</script>
<div id="coveragemap"></div>
<div class="ebaBlue">The following providers offer this service:</div>
<ul>
<script> 
//Show the providers offering this service
for (k=0;k<providerArray.length;k++){
    var providerInfo = providerArray[k].split("!");//0=name, 1=id
    document.write("<li><a href=provider.php?id="+providerInfo[1]+">");//?map=all
    document.write(providerInfo[0]+"</a></li>");
}   
</script>
</ul>
	</body>
</html>
