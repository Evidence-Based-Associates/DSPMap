<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Locality Map</title>
    <script src="globals.js?v=08.20.2021-0"></script>
    <script src="mainmapdata.js?v=7.10.2017-1"></script>
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
//locations
var providers = dspsXML.getElementsByTagName("Provider");

var locationCounter = 0;
var officeURL = "provider.php?id=";
//cycle through all providers and add office locations to map
for (i=0;i<providers.length;i++){
    //get info for each provider
    //revise for IE
    var offices = providers.item(i).getElementsByTagName("Office");
    var providerName = providers.item(i).getElementsByTagName("Name");
    var providerID = providers.item(i).getAttribute("id");

    //cycle through all locations of the provider
    for (j=0;j<offices.length;j++){
        //get info for each office
        var officeLat = offices.item(j).getElementsByTagName("Lat");
        var officeLng = offices.item(j).getElementsByTagName("Lng");
        var officeStreet = offices.item(j).getElementsByTagName("Street");
        var officeCity = offices.item(j).getElementsByTagName("City");
        var officeState = offices.item(j).getElementsByTagName("State");
        var officeZip = offices.item(j).getElementsByTagName("Zip");
        var officePhone = offices.item(j).getElementsByTagName("Phone");
       
        //add the office data to a map location
        simplemaps_statemap_mapdata.locations[locationCounter] = {
            lat: officeLat.item(0).textContent,
            lng: officeLng.item(0).textContent,
            name: providerName.item(0).textContent,
            color: "default",
            description: officeStreet.item(0).textContent + "<br>" + officeCity.item(0).textContent + ", " + officeState.item(0).textContent + " " + officeZip.item(0).textContent + "<br>" + officePhone.item(0).textContent,
            url: officeURL+providerID,//+"?map=all",//link to provider map
            size: "default",
            type: "default",
            image_url: "default",
            opacity: "default"
        }
        //update counter so it doesn't overwrite a location
        locationCounter++;
    }
    
}
    
//data connection creating dspsXML is in the mapdata file.
//queryString is pulled in the mapdatafile.

//focus on the locality START HERE
//empty the regions
simplemaps_statemap_mapdata.regions = {};
//add current locality to the one region 
simplemaps_statemap_mapdata.regions["0"] = {
    states: [queryString],
    name: "Focus"
};
simplemaps_statemap_mapdata.main_settings.initial_zoom = 0;

//simplemaps_statemap_mapdata.main_settings.initial_zoom = "0";   
    
//read all FIPs codes for the current page's location
var FIPs = dspsXML.getElementsByTagName("FIPs");
var localityProviders = [];
for (i=0;i<FIPs.length;i++){
    var travelAttribute = FIPs.item(i).getAttribute("travelReq");
    if (FIPs.item(i).textContent == queryString){
        //navigate up the elements to find provider name
        var provider = FIPs.item(i).parentNode;
        //up one more element to the Provider
        provider = provider.parentNode;
        //one more level
        providerID = provider.getAttribute("id");
        //provider = provider.parentNode;
        //get the ID for the url later
        //providerID = provider.getAttribute("id");
        provider = provider.getElementsByTagName("Name");
        //add the name and ID to the array
        //alert("providerID is "+providerID+" and Provider is "+provider.item(0).textContent);
        localityProviders.push(provider.item(0).textContent+"!"+providerID);
    }
}
localityProviders = removeDuplicates(localityProviders);
localityProviders.sort();
    
</script>
  </head>
  <body>
    
<script>    
//write locality name
    document.write('<h2>'+simplemaps_statemap_mapdata.state_specific[queryString].name+'</h2>');
</script>
<br><br>
    <a href=index.php>Return to All Providers Map</a>.
    <br><br>
    <div id="coveragemap"></div>
    <h2>Providers Serving This Locality:</h2><br>
    <ul style='list-style: none;'>
<script>
//show providers serving this locality.
for (i=0;i<localityProviders.length;i++){
    providerInfo = localityProviders[i].split("!");//[0] name [1] id
    //alert("providerInfo[0] is "+providerInfo[0]+" and ProviderInfo[1] is "+providerInfo[1]);
    document.write("<li class='ebaBlue'><a href=provider.php?id="+providerInfo[1]+">");//?map=all
    document.write(providerInfo[0]+"</a></li>");
    
    //get the services offered by this provider in this locality.
    //provider = dspsXML.getElementById(providerInfo[1]);
    var providerList = dspsXML.getElementsByTagName("Provider");
    for (var j=0;j<providerList.length;j++){
        if (providerList.item(j).getAttribute("id") == providerInfo[1]){
            var provider = providerList.item(j);
        }
    }    
    var providerLocations = provider.getElementsByTagName("FIPs");
    var providerServiceArray = [];
    for (j=0;j<providerLocations.length;j++){
        if (providerLocations.item(j).textContent == queryString){
            //alert("true!");
            //get the travel attribute
            var travelAttribute = providerLocations.item(j).getAttribute("travelReq");
            //alert("TravelAttribute is " + travelAttribute);
            //get the services.
            var providerServices = providerLocations.item(j).parentNode;
            var serviceName = providerServices.getAttribute("serviceName");
            //alert("serviceName is "+serviceName);
            //providerServices = providerServices.parentNode;
            //providerServices = providerServices.getElementsByTagName("Service");
            //alert("providerServices length is "+providerServices.length);
            //providerServices = provider.getElementsByTagName("ServiceItem");
            providerServiceArray.push(serviceName+"!"+travelAttribute);
            for (k=0;k<providerServices.length;k++){
                //providerServiceArray.push(serviceName+"!"+travelAttribute);
            }
        }
    }
    providerServiceArray = removeDuplicates(providerServiceArray);
    providerServiceArray.sort();
    
    document.write("<ul>");
    for (j=0;j<providerServiceArray.length;j++){
        var serviceInfo = providerServiceArray[j].split("!");//[0] service name [1] travel
        document.write("<li>"+serviceInfo[0]);
        if (serviceInfo[1] == "Y"){
            document.write(" <b>*limited service.</b></li>");
        } else {
            document.write("</li>");
        }
    }
    document.write("</ul>");
    
    document.write("</li>");
}
    
/*
            //now get the services...but only if it is the locality!
            provider = provider[0].parentNode; //up one level
            var serviceGroup = provider.getElementsByTagName("ServiceGroupMap");
            //cycle through the service group maps
            var uniqueServiceList = [];
            for (j=0;j<serviceGroup.length;j++){
                //get the FIPs
                var locationTest = serviceGroup[j].getElementsByTagName("FIPs");
                for (k=0;k<locationTest.length;k++){
                    //fetch the travel attribute
                    var travelReq = locationTest[k].getAttribute("travelReq");
                    if (queryString == locationTest[k].innerHTML || locationTest[k].innerHTML == "ALL"){
                        //get the serviceMenu
                        var serviceMenu = serviceGroup[j].getElementsByTagName("ServiceItem");
                        //get the service items, any notes, and travel attributes
                        for (l=0;l<serviceMenu.length;l++){
                            var serviceNote = serviceMenu[l].getAttribute("note");
                            uniqueServiceList.push(serviceMenu[l].innerHTML+"!"+serviceNote+"!"+travelReq);   
                        }
                    }
                }
            }
            uniqueServiceList = removeDuplicates(uniqueServiceList);
            uniqueServiceList.sort();
            document.write("<ul style='list-style:none;'><font color='000000' size='4'>");
            for (j=0;j<uniqueServiceList.length;j++){
                var serviceInfo = [];
                serviceInfo = uniqueServiceList[j].split("!");//[0]service name [1] service note [2] travel
                document.write("<li>"+serviceInfo[0]);
                if (serviceInfo[2] == "Y"){
                    document.write(" <b>*travel needed </b>");
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
            document.write("</font></ul><br>");
        }
    }
}*/
</script>
	</body>
</html>
