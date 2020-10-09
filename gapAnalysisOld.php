<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Services Gap Analysis</title>
    <script src="globals.js"></script>
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
//connect to data file
var Connect = new XMLHttpRequest();
var cacheBuster = Date.now();
Connect.open("GET", "dspsV1.xml?"+cacheBuster, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
// Place the response in an XML document.
var dspsXML = Connect.responseXML;
    
var locations = dspsXML.getElementsByTagName("FIPs");
//clear regions
//simplemaps_statemap_mapdata.regions = "";
simplemaps_statemap_mapdata.regions[0].color = "";
simplemaps_statemap_mapdata.regions[1].color = "";
simplemaps_statemap_mapdata.regions[2].color = "";
simplemaps_statemap_mapdata.regions[3].color = "";
simplemaps_statemap_mapdata.regions[4].color = "";
simplemaps_statemap_mapdata.main_settings.state_hover_color = "off";
    
//read all services for the current page's id
var providerArray = [];
    
//functions
function showGap(){
    var serviceSelected = document.getElementById("serviceSelect");
    var serviceSelectedName = availableServices[serviceSelected.options[serviceSelected.selectedIndex].value];
    var languageSelected = document.getElementById("languageSelect");
    var languageSelectedName = languageSelected.options[languageSelected.selectedIndex].value;
    var thisLanguageStr = "";
    //Clear the map
    for (i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "default";
    }
    if (languageSelected.options[languageSelected.selectedIndex].value == "English"){
        document.getElementById("thisLanguage").innerHTML = "in English";
        languageTest = 1;
    }
    else {
        thisLanguageStr = " in "+languageSelectedName;
        document.getElementById("thisLanguage").innerHTML = thisLanguageStr;  
    }
    var providerSearchResults = [];
    for (i=0;i<allFips.length;i++){
        //reset the providerCount when evaluting a new FIPs code.
        var providerCount = 0;
        //cycle through all location items
        for (j=0;j<locations.length;j++){
            var languagesArray = [];
            var languageTest = 0;
            var serviceTest = 0;
            //language test
            if (languageSelected.options[languageSelected.selectedIndex].value == "English"){
                    languageTest = 1;
            }
            if (locations.item(j).getAttribute("languages")){//there is a langauge attribute
                var serviceLanguageStr = locations.item(j).getAttribute("languages");//get the languages
                 while (serviceLanguageStr.indexOf(" ") >= 0){
                    serviceLanguageStr = serviceLanguageStr.replace(" ","");   
                }
                if (serviceLanguageStr.includes(",")){//if there are more than one language
                    var serviceLanguages = serviceLanguageStr.split(",");//put them in an array
                    for (var k=0;k<serviceLanguages.length;k++){
                        languagesArray.push(serviceLanguages[k]);
                    }
                } else {//if there is only one, still put it in a single element array
                    languagesArray.push(locations.item(j).getAttribute("languages"));
                }
                for (var k=0;k<languagesArray.length;k++){
                    if (languagesArray[k] == languageSelectedName){
                        languageTest = 1;
                    } 
                }
            }
            //service in location test    
            if (locations.item(j).parentNode.getAttribute("serviceName") == serviceSelectedName && locations.item(j).textContent == allFips[i]){
                serviceTest = 1;
            }
            if (serviceTest && languageTest){
                providerCount++;
                var provider = locations.item(j).parentNode;
                provider = provider.parentNode;
                var providerName = provider.getElementsByTagName("Name");
                providerSearchResults.push(providerName.item(0).textContent);
            }
        }
        if (providerCount == 0){//correct description grammar for none AND color code
            simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "There are no providers who offer " + serviceSelectedName + thisLanguageStr+" here";
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        }
        else if (providerCount == 1 ){//correct description grammar for one AND color code
            simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "There is one provider who offers " + serviceSelectedName + thisLanguageStr+" here";
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#2A8A00";
        }
        else {//correct grammar description for many - color codes in the next if/elses.
            simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "There are "+providerCount+" providers who offer " + serviceSelectedName + thisLanguageStr+" here";
        }
        //The remaining heatmap codes
        if (providerCount >= 2 && providerCount < 4){
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#439F00";
        }
        else if (providerCount >= 4 && providerCount < 6){
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#5CB400";
        }
        else if (providerCount >= 6 && providerCount < 8){
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#75CA00";
        }
        else if (providerCount >= 8 && providerCount < 10){
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#8EDF00";
        }
        else if (providerCount >= 10){
            simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "#A8F500";
        }
    }
    simplemaps_statemap.refresh();
    providerSearchResults = removeDuplicates(providerSearchResults);
    providerSearchResults.sort();
    document.getElementById("totalProviders").innerHTML = "("+providerSearchResults.length + " total providers)";
    document.getElementById("thisService").innerHTML = availableServices[serviceSelected.options[serviceSelected.selectedIndex].value];
    document.getElementById("totalItemCount").innerHTML= "<i>Counted "+allFips.length*locations.length+" items!</i>";
    var providerListString = "<br><ul>";
    for (var i=0;i<providerSearchResults.length;i++){
        providerListString += "<li>"+providerSearchResults[i]+"</li>";
    }
    providerListString += "</ul>";
    document.getElementById("providerList").innerHTML= providerListString;
}
</script>
</head>
<body onload="showGap()">
<a href=index.php>Return to main map</a><br>
<i><b>Select Service To View Gap Analysis</b></i>:<br> 
<select id="serviceSelect" onchange="showGap()">
<script>
for (var i=0; i< availableServices.length;i++){
    document.write('<option value="'+i+'">'+availableServices[i]+'</option>');   
}
</script>
</select>
<select id="languageSelect" onchange="showGap()">
    <option value="English" selected>English</option>
    <option value="Spanish">Spanish</option>
    <script>
    for (i=0;i<allLanguagesArray.length;i++){
        if (allLanguagesArray[i] != "Spanish"){
            document.write("<option value='"+allLanguagesArray[i]+"'>"+allLanguagesArray[i]+"</option>");   
        }
    }
    </script>
</select>
<div id="coveragemap"></div>
<style type="text/css">
.legend{color: black; width: 700px; font-family: arial; font-size: 14px;}    
.legend_color {display: table; width: 100%; background: white; list-style: none; margin: 0px; padding: 0px; }
.legend_color li{width: 14%;  height: 20px; display: table-cell;}
.legend_label {display: table; width: 100%;  padding: 0px; padding-left: 0%; padding-right: 0%; list-style: none; margin: 0px; box-sizing: border-box;text-align: left;}
.legend_label li{width: 14%;  height: 20px; display: table-cell; text-align: center;}
</style>
<div class="legend">
  <ul class="legend_label">
    <li>Zero</li><li>1</li><li>2+</li><li>4+</li><li>6+</li><li>8+</li><li>10+</li>
  </ul>
  <ul class="legend_color">
    <li style="background-color: #517ba0"></li>
    <li style="background-color: #2A8A00"></li>
    <li style="background-color: #439F00"></li>
    <li style="background-color: #5CB400"></li>
    <li style="background-color: #75CA00"></li>
    <li style="background-color: #8EDF00"></li>
    <li style="background-color: #A8F500"></li>
  </ul>
</div>
<br>
<div class="ebaBlue">The following providers offer
<div id="thisService"></div>
<div id="thisLanguage"></div>
<div id="totalProviders"></div>
</div>
<div id="providerList"></div>
<div id="totalItemCount" style="text-align:right";></div>
	</body>
</html>
