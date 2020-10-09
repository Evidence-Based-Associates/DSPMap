<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>DJJ Continuum Provider Directory</title>
    <script src="mainmapdata.js"></script>
    <script src="statemap.js"></script>
</head> 
<body>
<a id="top"/>
<a href="map.html">Return to Map</a><br>
<h1>Evidence Based Associates Virginia DJJ Continuum Provider Directory (Print Version)</h1>
<ul style='list-style:none;'>
    <li><font color='000000' size='4'><a href="#CSUs">CSUs</a></font></li>
    <li><font color='000000' size='4'><a href="#Providers">Providers</a></font></li>    
</ul>
<a id="CSUs"/>
<h2>CSU List:</h2>
<script>
    //Cycle through regions
    document.write("<ul style='list-style: none;'>");
    for (i=0;i<CSUStructure.length;i++){
        document.write("<br>");
        document.write("<li><div style='background-color:"+EBABlue+";'><a>");
        document.write("<font color='000000' size='4'>");
        document.write(CSUStructure[i].name+"</a></font></div></li>");    
        
        //cycle through region's CSUs
        document.write("<ul style='list-style: none;'>");
        for (j=0;j<CSUStructure[i].CSUs.length;j++){
            document.write("<li><div><a href=#"+CSUStructure[i].CSUs[j].slug+">");
            document.write("<font color='000000' size='4'>");
            document.write(CSUStructure[i].CSUs[j].name+"</a></li>");
        }
        //close  CSU ul and div
        document.write("</div></ul>");
    }
    //close region ul
    document.write("</ul>");
document.write("<a id='Providers'/>");
document.write("<h2>Providers List:</h2>");
//put provider info in array to alphabetize
var sortedProviders = [];
var providers = dspsXML.getElementsByTagName("Provider");
for (i=0;i<providers.length;i++){
    var providerName = providers[i].getElementsByTagName("Name");
    var providerID = providers[i].getAttribute("id");
    sortedProviders.push(providerName[0].innerHTML +"!"+providerID);
}
//alphabetize
sortedProviders.sort();

//print
document.write("<ul style='list-style: none;'>");
for (i=0;i<sortedProviders.length;i++){
    //seperate the ID from the name
    var providerInfo = sortedProviders[i].split("!");//providerInfo[0] is name [1] is ID
    document.write("<li><div style='background-color:"+EBABlue+";'><a href=#"+providerInfo[1]+">");
    document.write("<font color='000000' size='4'>");
    document.write(providerInfo[0]+"</a></font></div><br></li>");
}
document.write("</ul>");
    
//***************    
//CSUs print here
//***************
for (i=0;i<CSUStructure.length;i++){
    //cycle through the CSUs in each region
    for (j=0;j<CSUStructure[i].CSUs.length;j++){
        var thisCSU = CSUStructure[i].CSUs[j];
        document.write("<a id='"+thisCSU.slug+"'/>");
        document.write('<h2>Providers Serving '+thisCSU.name+' (<a href="#top">back to top</a>)</h2>');
        //document.write("<a href='#top'>back to top</a>");
        document.write("<ul style='list-style: none;'>");

        var FIPs = dspsXML.getElementsByTagName("FIPs");
        var providerIDArray = []; //used to prevent printing a provider twice
        for (k=0;k<FIPs.length;k++){
        if (thisCSU.localities.includes(FIPs[k].innerHTML) || FIPs[k].innerHTML == "ALL"){
            //navigate up the elements to find provider name
            var provider = FIPs[k].parentElement;
            //up one more element to the Provider
            provider = provider.parentElement;
            //up one more level
            provider = provider.parentElement;
            //get the ID for the url later
            providerID = provider.getAttribute("id");
            provider = provider.getElementsByTagName("Name");
        
            if (!providerIDArray.includes(providerID)){
                document.write("<li><div style='background-color:"+EBABlue+";'><a href=provider.html?id="+providerID);
                document.write("<font color='000000' size='4'>");
                document.write(provider[0].innerHTML+"</a></font></div><br></li>");
                providerIDArray.push(providerID);
                //now get the services...but only if it is the CSU!
                provider = provider[0].parentElement; //up one level
                var serviceGroup = provider.getElementsByTagName("ServiceGroupMap");
                //cycle through the service group maps
                var uniqueServiceList = [];
                for (l=0;l<serviceGroup.length;l++){
                    //get the FIPs
                    var locationTest = serviceGroup[l].getElementsByTagName("FIPs");
                    for (m=0;m<locationTest.length;m++){
                        //fetch the travel attribute
                        var travelReq = locationTest[m].getAttribute("travelReq");
                        if (thisCSU.localities.includes(locationTest[m].innerHTML) || locationTest[m].innerHTML == "ALL"){
                            //get the serviceMenu
                            var serviceMenu = serviceGroup[l].getElementsByTagName("ServiceItem");
                            //get the service items, any notes, and travel attributes
                            for (n=0;n<serviceMenu.length;n++){
                                var serviceNote = serviceMenu[n].getAttribute("note");
                                uniqueServiceList.push(serviceMenu[n].innerHTML+"!"+serviceNote+"!"+travelReq);   
                            }
                        }
                    }
                }
                uniqueServiceList = removeDuplicates(uniqueServiceList);
                uniqueServiceList.sort();
                /*Temp disable service list to aid 1st quarterly report
                document.write("<ul style='list-style:none;'><font color='000000' size='4'>");
                for (o=0;o<uniqueServiceList.length;o++){
                    var serviceInfo = [];
                    serviceInfo = uniqueServiceList[o].split("!");//[0]service name [1] service note [2] travel
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
                */
            }
        }
    }
//        
    document.write("</ul>");    
    }
}
    
//********************
//PROVIDERS PRINT HERE
//********************
    
//get provider info.    
var provider = dspsXML.getElementsByTagName("Provider");

for (i=0; i<provider.length;i++){
    var providerId = provider[i].getAttribute("id");
    var providerName = provider[i].getElementsByTagName("Name");
    var providerWebsite = provider[i].getElementsByTagName("Website");
    var providerContact = provider[i].getElementsByTagName("ContactName");
    var providerEmail = provider[i].getElementsByTagName("ContactEmail");
    //office info tags  
    var officeStreet = provider[i].getElementsByTagName("Street");
    var officeCity = provider[i].getElementsByTagName("City");
    var officeState = provider[i].getElementsByTagName("State");
    var officeZip = provider[i].getElementsByTagName("Zip");
    var officePhone = provider[i].getElementsByTagName("Phone");
    var officeFax = provider[i].getElementsByTagName("Fax");
      
    //write provider name
    //document.write('<h2><u>'+providerName[0].innerHTML+'</u></h2>');
    document.write("<a id='"+providerId+"'/>");
    document.write("<h3><u><div style='background-color:"+EBABlue+";'>"+providerName[0].innerHTML+": (<a href='#top'>return to top</a>)</div></u></h3>");
    document.write("<ul style='list-style: none;'><font color='000000' size='4'>")
    document.write("<li><b>Website</b>: <a href=http://"+providerWebsite[0].innerHTML+">"+providerWebsite[0].innerHTML+"</a></li>");
    document.write("<li><b>Main Office:</b></li>");
    document.write("<ul style='list-style: none;'><font color='000000' size='4'>")
    document.write("<li>"+officeStreet[0].innerHTML+"<br>"+officeCity[0].innerHTML+", "+officeState[0].innerHTML+" "+officeZip[0].innerHTML+"<br>Phone: "+officePhone[0].innerHTML+"<br>Fax: "+officeFax[0].innerHTML+"</li>");
    document.write("</ul>"); 
    document.write("<li><b>Contact:</b> "+providerContact[0].innerHTML+"</li>");
    document.write("<li><b>Contact Email:</b> "+providerEmail[0].innerHTML+"</li>");
    document.write("</ul>");
    //document.write("<h2><u><div style='background-color:"+EBABlue+";'>Providing Services in the Following CSUs:</div></u></h2>");
}   
</script>
	</body>
</html>
