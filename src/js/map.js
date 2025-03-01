"use strict";

/**
 * Implementerar en karta med leaflet.
 */ 
let map = L.map('map').setView([60.0, 18.0], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/**
 * Deklarerar en variabel utan värde, för användning senare i funktion searchLocation.
 * @type {L.marker}
 */
let marker;


/**
 * Funktion för sökning av plats i karta.
 * @function searchLocation
 */
function searchLocation() {

    //Hämtar värde från sökfält och lagrar det i en variabel
    let query = document.getElementById('search').value;

    /*Använder fetch för att hämta bas-URL för Nominatim API:s sökfunktion med parametrar som 
    anger svaret i JSON-format och innehåller värdet från sökfältet.*/
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then(response => response.json())
        .then(data => {
            //Kontrollerar om det finns något resultat, om det finns objekt i data-arrayen.
            if (data.length > 0) {
                //Hämtar första latitud och longitud från data-arrayen och uppdaterar kartan med koordinaterna.
                let lat = data[0].lat;
                let lon = data[0].lon;
                map.setView([lat, lon], 14);

                //Ta bort markör om det redan finns.
                if (marker) {
                    map.removeLayer(marker);
                }

                //Lägg till marör på kartan med koordinaterna.
                marker = L.marker([lat, lon]).addTo(map);
            } else {
                alert('Plats inte hittad');
            }
        })
        //Fånga upp fel från fetch-anropet. 
        .catch(error => console.error('Error:', error));
}

/**
 * Skapar en händelselyssnare som anropar searchLocation vid tryck av Enter.
 */
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
});

window.searchLocation = searchLocation;