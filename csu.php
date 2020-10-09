<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>CSU Map</title>
    <script src="globals.js?v=09.25.2020-0"></script> 
    <script src="mainmapdata.js?v=7.10.2017-2"></script>
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
//get the CSU info from query string.
//cycle through the regions
for (i=0;i<CSUStructure.length;i++){
    //cycle through the CSUs in each region
    for (j=0;j<CSUStructure[i].CSUs.length;j++){
        if (CSUStructure[i].CSUs[j].slug == queryString){
            var thisCSU = CSUStructure[i].CSUs[j];
        }
    }
}
//empty the regions
simplemaps_statemap_mapdata.regions = {};
//fill with focus CSU
simplemaps_statemap_mapdata.regions[0] = {
    states: thisCSU.localities,
    name: thisCSU.name
};    
//zoom to focus CSU
simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;

//add remaining CSUs to map as regions. if a user zooms out CSUs will be grouped on the map.
var regionCount = 1;
//Cycle through regions
for (i=0;i<CSUStructure.length;i++){
    //document.write(CSUStructure[i].name+"</a></font></div></li>");    
    //cycle through region's CSUs
    for (j=0;j<CSUStructure[i].CSUs.length;j++){
        //if it's thisCSU, skip it
        if (CSUStructure[i].CSUs[j].localities != thisCSU.localities){
            simplemaps_statemap_mapdata.regions[regionCount] = {
                states: CSUStructure[i].CSUs[j].localities,
                name: CSUStructure[i].CSUs[j].name,
                url: "csu.php?"+CSUStructure[i].CSUs[j].slug
            };
            regionCount++;
        }
    }
}   
</script>
  </head>
  <body>
    
<script>    
//write locality name
document.write('<h2>'+thisCSU.name+'</h2>');

var allLocations = dspsXML.getElementsByTagName("FIPs");
var CSUServices = [];
var CSUProviders = [];
for (var i=0;i<allLocations.length;i++){
    if (thisCSU.localities.indexOf(allLocations.item(i).textContent)>=0){
        //this node is in the CSU.
        //get service
        var serviceName = allLocations.item(i).parentNode;
        serviceName = serviceName.getAttribute("serviceName");
        var serviceAtty = allLocations.item(i).getAttribute("travelReq");
        //alert("serviceAtty is "+serviceAtty+" serviceName is "+serviceName);
        CSUServices.push(serviceName);//+"!"+serviceAtty);
        //get provider
        var provider = allLocations.item(i).parentNode;
        provider = provider.parentNode;
        var providerID = provider.getAttribute("id");
        providerName = provider.getElementsByTagName("Name").item(0).textContent;
        CSUProviders.push(providerName+"!"+providerID);
    }   
}
CSUServices = removeDuplicates(CSUServices);
CSUServices.sort();
CSUProviders = removeDuplicates(CSUProviders);
CSUProviders.sort();
</script>
<a href=index.php>Return to Main Map</a>.
<br><br>
<div id="coveragemap"></div>
<br><br>
<a href="#Providers">Sorted by Provider</a>&nbsp;|&nbsp;<a href="#Services">Sorted by Service</a>
<a id="Providers"></a>
<h2>Providers Serving This Court Service Unit:</h2>
<ul>
<script>
for (var i=0;i<CSUProviders.length;i++){
    var providerInfo = CSUProviders[i].split("!");//[0] name [1] id
    document.write("<li class='ebaBlue'><a href='provider.php?id="+providerInfo[1]+"'>");//"?map=all>"
    document.write(providerInfo[0]+"</a></li>");
    //alert("CSUProviders is "+providerInfo[1]+" which is a "+typeof(providerInfo[1]));
    var provider = dspsXML.getElementById(providerInfo[1]);
    var providerLocations = provider.getElementsByTagName("FIPs");
    var serviceArray = [];
    for (var j=0;j<providerLocations.length;j++){
        if (thisCSU.localities.indexOf(providerLocations.item(j).textContent)>=0){
            var providerService = providerLocations.item(j).parentNode;
            providerService = providerService.getAttribute("serviceName");
            serviceArray.push(providerService);
        }
    }
    serviceArray = removeDuplicates(serviceArray);
    serviceArray.sort();
    document.write("<ul>");
    for (var j=0;j<serviceArray.length;j++){
        document.write("<li>"+serviceArray[j]+"</li>");
    }
    document.write("</ul>");
}
</script>
</ul><a id="Services"></a><h2>Services offered in this Court Service Unit:</h2><ul>
<script>
for (var i=0;i<CSUServices.length;i++){
    //alert(i+ " "+CSUServices[i]);
    //var serviceInfo = CSUServices[i].split("!");//[0] name [1] travel
    //document.write("<li class='ebaBlue'>"+serviceInfo[0]+"</li>");
    document.write("<li class='ebaBlue'>"+CSUServices[i]+"</li>");
    /*
    if (serviceInfo[1] == "Y"){
        document.write(" <b>* limited service</b></li>");
    } else {
        document.write("</li>");
    }*/
    //list providers
    var providerLocations = dspsXML.getElementsByTagName("FIPs");
    var providerArray = [];
    for (var j=0;j<providerLocations.length;j++){
        if (thisCSU.localities.indexOf(providerLocations.item(j).textContent)>=0){
            var provider = providerLocations.item(j).parentNode;
            var thisService = provider.getAttribute("serviceName");
            provider = provider.parentNode;
            var providerID = provider.getAttribute("id");
            var providerName = provider.getElementsByTagName("Name").item(0).textContent;
            if (thisService == CSUServices[i]){
                providerArray.push(providerName+"!"+providerID);    
            }
        }
    }
    providerArray = removeDuplicates(providerArray);
    providerArray.sort();
    document.write("<ul>");
    for (var j=0;j<providerArray.length;j++){
        var providerInfo = providerArray[j].split("!");//[0] name [1] id
        document.write("<li><a href='provider.php?id="+providerInfo[1]+"'>"+providerInfo[0]+"</a></li>");//?map=all
    }
    document.write("</ul>");
}
</script>
</ul>
	</body>
</html>
