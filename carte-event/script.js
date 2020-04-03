// votre code JS
var mymap = L.map('mapid').setView([48.852968, 2.349902], 13);

var layerGroup = L.layerGroup().addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'
}).addTo(mymap);



async function getData(query) {
    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1) " + searchInput.value + "&rows=100&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type"
    let response = await fetch(url)
    let data = await response.json()

    layerGroup.clearLayers();
    
    data.records.forEach(function (event) { 
        // le titre de l'événement
        let title = event.fields.title

        // la latitude
        let latitude = event.fields.lat_lon[0] 
        // la longitude
        let longitude = event.fields.lat_lon[1] 

        // on pourrait récupérer d'autres infos..
        // pour tester, on les affiche dans la console
        console.log(title + " " + latitude + " " + longitude)

        

        // .. mais ce serait mieux de les afficher sur la carte !
        var marker = L.marker([latitude, longitude]).addTo(mymap);

        marker.bindPopup("<strong>" + event.fields.title + "</strong>" + "<br>"+ event.fields.address_street + "<br>"+
        event.fields.price_type ).openPopup();
        
        marker.addTo(layerGroup); 
    })
    
}
getData()

function onFormSubmit(event) {
    event.preventDefault();
    console.log("le formulaire ok");
    console.log(searchInput.value);

    getData(searchInput.value);
}