<!DOCTYPE html>
<!--
Copyright (c) 2017 to 2020 - Evidence Based Associates LLC
Developed by Joel N. Walkley, under the employment of EBA
Any questions and comments can be directed to joelnwalkley@gmail.com
-->
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>DJJ Continuum Provider Map</title>
    <script src="globals.js?v=08.20.2021-0"></script>
    <script src="mainmapdata.js?v=9.18.2020-0"></script>
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
//get last update
var updateDates = dspsXML.getElementsByTagName("LastUpdated");
var updateArray = [];
var updateArryText = "";
for (var i=0;i<updateDates.length;i++){
    updateArray.push(updateDates.item(i).textContent);
}
updateArray.sort();
//debuging the wrong date. SORT makes 2018-3-13 before 2018-3-9 because it is not by number.    
for (var i=0;i<updateDates.length;i++){
    updateArryText += updateArray[i] +"\r";
}
//alert(updateArryText);
var directoryUpdatedSplit = updateArray[i-1].split("-");
var directoryUpdated = "";//directoryUpdatedSplit[1]+"-";//directoryUpdatedSplit[2]+"-"+directoryUpdatedSplit[0];
if (directoryUpdatedSplit[1]=="01"){
    directoryUpdated = "January ";
}
else if (directoryUpdatedSplit[1]=="02"){
    directoryUpdated = "February ";
}
else if (directoryUpdatedSplit[1]=="03"){
    directoryUpdated = "March ";
}
else if (directoryUpdatedSplit[1]=="04"){
    directoryUpdated = "April ";
}
else if (directoryUpdatedSplit[1]=="05"){
    directoryUpdated = "May ";
}
else if (directoryUpdatedSplit[1]=="06"){
    directoryUpdated = "June ";
}
else if (directoryUpdatedSplit[1]=="07"){
    directoryUpdated = "July ";
}
else if (directoryUpdatedSplit[1]=="08"){
    directoryUpdated = "August ";
}
else if (directoryUpdatedSplit[1]=="09"){
    directoryUpdated = "September ";
}
else if (directoryUpdatedSplit[1]=="10"){
    directoryUpdated = "October ";
}
else if (directoryUpdatedSplit[1]=="11"){
    directoryUpdated = "November ";
}
else if (directoryUpdatedSplit[1]=="12"){
    directoryUpdated = "December ";
}
//alert("Day is "+Number(directoryUpdatedSplit[2]));
directoryUpdated += Number(directoryUpdatedSplit[2])+", ";
directoryUpdated += directoryUpdatedSplit[0];
    
//Get a list of all the providers
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
</script>

  </head>
  <body>
<h1>Evidence-Based Associates<br>Virginia DJJ Continuum<br>Provider Directory</h1>
    <div id="coveragemap"></div>
<br>

<i>last updated: <script>document.write(directoryUpdated);</script></i><br><br>
<b>How is this directory working?</b> We want to improve this tool to meet your needs. <a href="mailto:joelnwalkley@gmail.com?Subject=[Map Feedback]">Report an error, request a feature, offer a comment!</a>
<br>
<h2>Index:</h2>
      <ul>
          <li><a href="#Filter">Filter and Search</a></li>
          <li><a href="#CSUs">CSUs</a></li>
          <li><a href="#Providers">Providers</a></li>
          <li><a href="#Services">Services</a></li>
          <li><a href="#Languages">Languages</a></li>
      </ul>
<a id="Filter"></a>
<h2>Filter/Search:</h2>
<div class="ebaBlue">Find a Provider That Offers...</div>
<form action="search.php" method="get">
<br>Service:
<select name="Service">
    <option value="any" selected>(please select)</option>
    <script>
        for (i=0;i<availableServices.length;i++){
            document.write("<option value='"+i+"'>"+availableServices[i]+"</option>");
        }
    </script>
</select>
Location:
<select name="Where">
    <option value="0" selected>(please select)</option>
    <script>
    //Cycle through CSUs
    for (i=0;i<sortedCSUs.length;i++){
        document.write("<option value='"+sortedCSUs[i].slug+"'>"+sortedCSUs[i].name+"</option>");
    }
    document.write("<option value='0'>-----REGIONS-----</option>");
    document.write("<option value='north'>Northern Region</option>");
    document.write("<option value='central'>Central Region</option>");
    document.write("<option value='west'>Western Region</option>");
    document.write("<option value='0'>-----LOCALITIES-----</option>");
    for (i=0;i<allFips.length;i++){
        document.write("<option value='"+allFips[i]+"'>"+simplemaps_statemap_mapdata.state_specific[allFips[i]].name+"</option>");  
    }
    </script>
</select>
Language:
<select name="Language">
    <option value="english" selected>English</option>
    <option value="Spanish">Spanish</option>
    <script>
    for (i=0;i<allLanguagesArray.length;i++){
        if (allLanguagesArray[i] != "Spanish"){
            document.write("<option value='"+allLanguagesArray[i]+"'>"+allLanguagesArray[i]+"</option>");   
        }
}   
    </script>
</select>
<input type="submit" value="Search">
</form><br>
<a id="CSUs"></a>
<h2>CSU List:</h2>
<ul>
<script>
    //Cycle through regions
    for (i=0;i<CSUStructure.length;i++){
        document.write("<li class='ebaBlue'>"+CSUStructure[i].name+"</li>");   
        //cycle through region's CSUs
        document.write("<ul>");
        for (j=0;j<CSUStructure[i].CSUs.length;j++){
            document.write("<li><a href=csu.php?"+CSUStructure[i].CSUs[j].slug+">"+CSUStructure[i].CSUs[j].name+"</a></li>");
        }
        //close  CSU ul
        document.write("</ul>");
    }
</script>
</ul>     
<a id="Providers"></a>
<h2>Provider List:</h2>
<script>
//put provider info in array to alphabetize
var sortedProviders = [];
for (i=0;i<providers.length;i++){
    var providerName = providers.item(i).getElementsByTagName("Name");
    var providerID = providers.item(i).getAttribute("id");
    sortedProviders.push(providerName.item(0).textContent +"!"+providerID);
}
//alphabetize
sortedProviders.sort();

//print
document.write("<ul>");
for (i=0;i<sortedProviders.length;i++){
    //seperate the ID from the name
    var providerInfo = sortedProviders[i].split("!");//providerInfo[0] is name [1] is ID
    document.write("<li><a href=provider.php?id="+providerInfo[1]+">");//?map=all>
    document.write(providerInfo[0]+"</a></li>");
}
document.write("</ul>");
</script>
<a id="Services"></a>
<h2>Available Services List:</h2>
<script>
document.write("<ul>");
for (i=0;i<availableServices.length;i++){
    document.write("<li><a href=service.php?"+i+">");
    document.write(availableServices[i]+"</a></li>");
}  
document.write("</ul>");
</script>
<a id="Languages"></a>
<h2>Available Languages List:</h2>
<ul>
<script>
for (i=0;i<allLanguagesArray.length;i++){
    //var serviceInfo = [];
    //serviceInfo = allProviderServicesArray[i].split("!");
    //document.write("<li>"+serviceInfo[0]);
    document.write("<li><a href='language.php?"+i+"'>"+allLanguagesArray[i]+"</a></li>");
}     
</script>
</ul>
	</body>
</html>
