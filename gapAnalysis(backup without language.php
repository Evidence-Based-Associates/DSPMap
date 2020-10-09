<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Services Gap Analysis</title>
    <script src="globals.js?v=09.25.2020-0"></script>
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
var providers = dspsXML.getElementsByTagName("Provider");
var services = dspsXML.getElementsByTagName("Service");
var locations = dspsXML.getElementsByTagName("FIPs");
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
simplemaps_statemap_mapdata.regions = "";
simplemaps_statemap_mapdata.main_settings.state_hover_color = "off";
    
//read all services for the current page's id
var providerArray = [];
var fipsArray = [];
    
//functions
function showGap(){
    var providerListDiv = "";
    var totalProvidersPerService = 0;
    //Clear the map
    for (i=0;i<allFips.length;i++){
        simplemaps_statemap_mapdata.state_specific[allFips[i]].url = "javascript:toggleTravel("+allFips[i]+")";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].border_color = "default";
        simplemaps_statemap_mapdata.state_specific[allFips[i]].description = "default";
    }
    var serviceSelected = document.getElementById("serviceSelect");
    //get provider list
    for (i=0;i<services.length;i++){ 
        if (services.item(i).getAttribute("serviceName") == availableServices[serviceSelected.options[serviceSelected.selectedIndex].value]){
            var provider = services.item(i).parentNode;
            var providerID = provider.getAttribute("id");
            var providerName = provider.getElementsByTagName("Name").item(0).textContent;
            providerListDiv += "<br>" + providerName + "<br>";
            totalProvidersPerService++;
        }
    }
    document.getElementById("providerList").innerHTML = providerListDiv;
    document.getElementById("totalProviders").innerHTML = "("+totalProvidersPerService + " total providers)";
    document.getElementById("thisService").innerHTML = availableServices[serviceSelected.options[serviceSelected.selectedIndex].value];
    //Cycle through regions
    var totalCount = 0;
    for (var i=0;i<CSUStructure.length;i++){   
        //cycle through region's CSUs
        for (var j=0;j<CSUStructure[i].CSUs.length;j++){
            for (var k=0;k<CSUStructure[i].CSUs[j].localities.length;k++){
                var regionName = CSUStructure[i].name.substring(0,CSUStructure[i].name.length-7);
                var CSUnum = CSUStructure[i].CSUs[j].slug.substring(3,CSUStructure[i].CSUs[j].slug.length);
                //var fipsNum = CSUStructure[i].CSUs[j].localities[k].substring(2,CSUStructure[i].CSUs[j].localities[k].length);
                //document.write(regionName+"!");
                //document.write(CSUnum+"!");
                //document.write(fipsNum+"!"); 
                //document.write(simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].name+"!");
                //cycle through all location items
                var providerCount = 0;
                for (m=0;m<locations.length;m++){
                    if (locations.item(m).parentNode.getAttribute("serviceName") == availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] && locations.item(m).textContent == CSUStructure[i].CSUs[j].localities[k]){
                           providerCount++; 
                    }
                    totalCount++;
                }
                //simplemaps_statemap_mapdata.data.data[CSUStructure[i].CSUs[j].localities[k]] = providerCount;
                //simplemaps_statemap_mapdata.main_settings.state_description = " is #data#";
                if (providerCount == 0){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are no providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "default";
                }
                else if (providerCount == 1 ){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There is one provider who offers " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#2A8A00";
                }
                else if (providerCount >= 2 && providerCount < 4){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are "+providerCount+" providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#439F00";
                }
                else if (providerCount >= 4 && providerCount < 6){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are "+providerCount+" providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#5CB400";
                }
                else if (providerCount >= 6 && providerCount < 8){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are "+providerCount+" providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#75CA00";
                }
                else if (providerCount >= 8 && providerCount < 10){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are "+providerCount+" providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#8EDF00";
                }
                else if (providerCount >= 10){
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].description = "There are "+providerCount+" providers who offer " + availableServices[serviceSelected.options[serviceSelected.selectedIndex].value] + " here";
                    simplemaps_statemap_mapdata.state_specific[CSUStructure[i].CSUs[j].localities[k]].color = "#A8F500";
                }
            }
        }
    }
    simplemaps_statemap.refresh();
    document.getElementById("totalItemCount").innerHTML= "<i>Counted "+totalCount+" items!</i>";
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
<div id="totalProviders"></div>
</div>
<div id="providerList"></div>
<div id="totalItemCount" style="text-align:right";></div>
	</body>
</html>
