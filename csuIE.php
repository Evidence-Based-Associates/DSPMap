<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>CSU Map</title>
    <script src="mainmapdata.js?v=7.10.2017-2"></script>
    <script src="statemap.js"></script>
    <link rel="stylesheet" type="text/css" href="pdstyle.css">  
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
</script>
    <a href=index.php>Return to Main Map</a>.
    <br><br>
    <div id="map"></div>
    <br><br>
    <a href="#Providers">Sorted by Provider</a>&nbsp;|&nbsp;<a href="#Services">Sorted by Service</a>
      <a id="Providers"></a>
    <h2>Providers Serving This Court Service Unit:</h2>
    <ul>
<script>
//show providers serving this locality.
//get FIPs code from data file
var FIPs = dspsXML.getElementsByTagName("FIPs");
var providerIDArray = []; //used to prevent printing a provider twice
for (i=0;i<FIPs.length;i++){
    if (thisCSU.localities.indexOf(FIPs.item(i).textContent)>=0){
        //navigate up the elements to find provider name
        var provider = FIPs.item(i).parentNode;
        //up one more element to the Provider
        provider = provider.parentNode;
        //up one more level
        provider = provider.parentNode;
        //get the ID for the url later
        providerID = provider.getAttribute("id");
        provider = provider.getElementsByTagName("Name");
        var testV = 0;
        
        if (providerIDArray.indexOf(providerID)==-1){
            document.write("<li class='ebaBlue'><a href=provider.php?id="+providerID+"?map=all>");
            document.write(provider.item(0).textContent+"</a></li>");
            providerIDArray.push(providerID);
            //now get the services...but only if it is the CSU!
            provider = provider.item(0).parentNode; //up one level
            var serviceGroup = provider.getElementsByTagName("ServiceGroupMap");
            //cycle through the service group maps
            var uniqueServiceList = [];
            //alert("serviceGroup length is "+serviceGroup.length);//WORKS
            for (j=0;j<serviceGroup.length;j++){
                //get the FIPs
                var locationTest = serviceGroup.item(j).getElementsByTagName("FIPs");
                for (k=0;k<locationTest.length;k++){
                    //fetch the travel attribute
                    var travelReq = locationTest.item(k).getAttribute("travelReq");
                    if (thisCSU.localities.indexOf(locationTest.item(k).textContent)>=0){
                        //alert("TRUE!");
                        //get the serviceMenu
                        var serviceMenu = serviceGroup.item(j).getElementsByTagName("ServiceItem");
                        //get the service items, any notes, and travel attributes
                        for (l=0;l<serviceMenu.length;l++){
                            var serviceNote = serviceMenu.item(l).getAttribute("note");
                            uniqueServiceList.push(serviceMenu.item(l).textContent+"!"+serviceNote+"!"+travelReq);   
                        }
                    }
                }
            }
            uniqueServiceList = removeDuplicates(uniqueServiceList);
            uniqueServiceList.sort();
            document.write("<ul>");
            for (j=0;j<uniqueServiceList.length;j++){
                var serviceInfo = [];
                serviceInfo = uniqueServiceList[j].split("!");//[0]service name [1] service note [2] travel
                document.write("<li>"+serviceInfo[0]);
                if (serviceInfo[2] == "Y"){
                    document.write(" <b>*limited service </b>");
                }
                if (serviceInfo[2] == "Y" && serviceInfo[1] != "null"){
                    document.write("&nbsp|&nbsp");
                }
                if (serviceInfo[1] != "null"){
                    document.write(" <b><u>note:</u></b> "+serviceInfo[1]+"</li>");
                } else {
                    document.write("</li>");
                }
            }
            document.write("</ul>");
        }
    }
}
document.write('</ul><a id="Services"></a><h2>Services offered in this Court Service Unit:</h2><ul>');
//now find the services and print the provider
//run through the available services array
//check that the service location is in CSU
//if yes - put provider in array
//After running through a single service name, print the service, then print the provider array.
var CSUServiceCheck = dspsXML.getElementsByTagName("ServiceItem");
var CSUServices = [];
//cycle through every avaialble service name
for (i=0;i<availableServices.length;i++){
    //cycle through every service item in data source
    for (j=0;j<CSUServiceCheck.length;j++){
        //when you find the first service, run checks
        if (availableServices[i] == CSUServiceCheck.item(j).textContent){
            //now check that this ServiceItem is offered in the CSU
            //navigate up
            var locationCheck = CSUServiceCheck.item(j).parentNode;
            locationCheck = locationCheck.parentNode;
            locationCheck = locationCheck.getElementsByTagName("FIPs");
            for (k=0;k<locationCheck.length;k++){
                if (thisCSU.localities.indexOf(locationCheck.item(k).textContent)>=0){
                    CSUServices.push(CSUServiceCheck.item(j).textContent);
                }
            }
        }
    }
}
CSUServices = removeDuplicates(CSUServices);
document.write("</ul><ul>")
for (i=0;i<CSUServices.length;i++){
    document.write("<li class='ebaBlue'>"+CSUServices[i]+"</li>");
    //go get the providers who offer this service in this CSU
    var FIPs = dspsXML.getElementsByTagName("FIPs");
    var providerNameArray = [];
   
    for (j=0;j<FIPs.length;j++){
        if (thisCSU.localities.indexOf(FIPs.item(j).textContent)>=0){
            //fetch the travel attribute
            var travelReq = FIPs.item(j).getAttribute("travelReq");
            //navigate up the elements to find provider name
            var provider = FIPs.item(j).parentNode;
            //up one more element to the Provider
            provider = provider.parentNode;
            var providerServiceCheck = provider.getElementsByTagName("ServiceItem");
            //up one more level
            provider = provider.parentNode;
            var providerID = provider.getAttribute("id");
            provider = provider.getElementsByTagName("Name");
            providerName = provider.item(0).textContent;
            for (k=0;k<providerServiceCheck.length;k++){
                var serviceNote = providerServiceCheck.item(k).getAttribute("note");
                if (providerServiceCheck.item(k).textContent == CSUServices[i]){
                    providerNameArray.push(providerName+"!"+providerID+"!"+serviceNote+"!"+travelReq);
                }
            }
            
        }
    }
    providerNameArray = removeDuplicates(providerNameArray);
    providerNameArray.sort();
    document.write("<ul>")
    for (j=0;j<providerNameArray.length;j++){
        var providerInfo = providerNameArray[j].split("!");//providerInfo[0] is name, [1] is id, [2] is note [3] is travel
        document.write("<li><a href=provider.php?id="+providerInfo[1]+"?map=all>"+providerInfo[0]+"</a>");
        if (providerInfo[3] == "Y"){
            document.write(" <b>*limited service </b>");
        }
        if (providerInfo[2] != "null"){
            document.write(" <b>note:</b> "+providerInfo[2]+"</li>");
        } else {
            document.write("</li>");
        }
    }
    document.write("</ul><br>");
}
</script>
	</body>
</html>
