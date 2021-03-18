<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Search</title>
    <script src="globals.js"></script>
    <script src="mainmapdata.js?v=9.13.2017-0"></script>
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
var searchParamaters = queryString.split("&");
var serviceIndex = searchParamaters[0].split("=");//use ServiceIndex[1] 
var locationIndex = searchParamaters[1].split("=");//use locationIndex[1]
//var locationIndex = locationIndex[1];
var languageIndex = searchParamaters[2].split("=");//use languageIndex[1]

//decide location name and type (CSU, Region, Locality).
var locationText = "";
var locationType = "";
if (locationIndex[1].indexOf("CSU")>=0){
    //get the CSU
    for (i=0;i<CSUStructure.length;i++){
        //cycle through the CSUs in each region
        for (j=0;j<CSUStructure[i].CSUs.length;j++){
            if (CSUStructure[i].CSUs[j].slug == locationIndex[1]){
                var thisCSU = CSUStructure[i].CSUs[j];
            }
        }
    }
    locationText = thisCSU.name;
    locationType = "CSU";
}
else if (locationIndex[1].indexOf("51")>=0){
    locationText = simplemaps_statemap_mapdata.state_specific[locationIndex[1]].name;
    locationType = "Locality";
}
else if (locationIndex[1] == "0"){
    locationText = "[No Location Selected]";
}
else {
    switch (locationIndex[1]){
        case "north":
            locationText = "Northern Region";
            var thisRegion = CSUStructure[0];
            break;
        case "central":
            locationText = "Central Region";
            var thisRegion = CSUStructure[1];
            break;
        case "west":
            locationText = "Western Region";
            var thisRegion = CSUStructure[2];
            break;
    }
    locationType = "Region";
}
    
//get all entires for search later.
var locations = dspsXML.getElementsByTagName("FIPs");
var providerSearchResults = [];

document.write("<a href=index.php>Return to Main Map</a>.<br>");
var serviceText = "";
if (serviceIndex[1] == "any"){
        serviceText = "Any Service";
}
else {
    serviceText = availableServices[serviceIndex[1]];
}
document.write("<h2>Providers offering <u>"+serviceText+"</u> in <u>"+locationText+"</u> in <u>");
if (languageIndex[1] == "english"){
    document.write("English</u>:</h2><br>");
} else {
    document.write(languageIndex[1]+"</u>:</h2><br>");
}
    
//cycle through all location items
for (i=0;i<locations.length;i++){
    //first test: matches the service paramater.
    var serviceTest = 0;
    var LocationTest = 0;
    var languageTest = 0;
    if (locations.item(i).parentNode.getAttribute("serviceName") == availableServices[serviceIndex[1]]){
        serviceTest = 1;                                                                                
    }
    if (serviceIndex[1] == "any"){
        serviceTest = 1;
    }
    //location tests
    if (locationType == "CSU" && thisCSU.localities.indexOf(locations.item(i).textContent)>=0){
        LocationTest = 1;
    }
    if (locationType == "Locality" && locations.item(i).textContent == locationIndex[1]){
        LocationTest = 1;
    }
    if (locationType == "Region"){
        for (var j=0;j<thisRegion.CSUs.length;j++){
            if (thisRegion.CSUs[j].localities.indexOf(locations.item(i).textContent)>=0){
                LocationTest = 1;
            }
        }
    }
    if (locationIndex[1] == "0"){
        LocationTest = 1;
    }
    var languagesArray = [];
    if (languageIndex[1] == "english"){
        languageTest = 1;
    }
    //language test
    if (locations.item(i).getAttribute("languages")){
        var serviceLanguageStr = locations.item(i).getAttribute("languages");
        while (serviceLanguageStr.indexOf(" ") >= 0){
            serviceLanguageStr = serviceLanguageStr.replace(" ","");   
        }
        if (serviceLanguageStr.includes(",")){
            var serviceLanguages = serviceLanguageStr.split(",");
            for (var j=0;j<serviceLanguages.length;j++){
                languagesArray.push(serviceLanguages[j]);
            }
        } else {
            languagesArray.push(locations.item(i).getAttribute("languages"));
        }
        for (var j=0;j<languagesArray.length;j++){
            if (languagesArray[j] == languageIndex[1]){
                languageTest = 1;
            } 
        }
    }
    if (serviceTest && LocationTest && languageTest){
        var provider = locations.item(i).parentNode;
        provider = provider.parentNode;
        var providerID = provider.getAttribute("id");
        var providerName = provider.getElementsByTagName("Name");
        //var travelAtty = locations.item(i).getAttribute("travelReq");
        providerSearchResults.push(providerName.item(0).textContent+"!"+providerID);//"!"+travelAtty
    }
}   
providerSearchResults = removeDuplicates(providerSearchResults);
providerSearchResults.sort();
</script>
  </head>
<body>
<script>
if (providerSearchResults.length == 0){
    document.write("No providers were found for these search criteria. <br>Evidence Based Associates is constantly working to fill gaps in the Service Continuum. If this service is needed for a specific referral, please contact your Regional Service Coordinator.");
}
document.write("<ul>");
for (i=0;i<providerSearchResults.length;i++){
    var displayResults = providerSearchResults[i].split("!");//[0] name [1] id [2] travel attribute
    document.write("<li><a href=provider.php?id="+displayResults[1]+">");//?map=all
    document.write(displayResults[0]+"</a>");
    /*
    if (displayResults[2] == "Y"){
        document.write(" <b>*limited service</b></li>");
    } else {
        document.write("</li>");
    }*/
}
document.write("</ul>");
</script>
<div class='ebaBlue'>New Search</div><form action="search.php" method="get">
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
</form>
</body>
</html>