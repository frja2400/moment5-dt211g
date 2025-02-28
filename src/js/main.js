"use strict";

//Hämta menyknapparna.
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

//Addera händelselyssnare till båda knapparna.
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//Funktion för klick på menyknapparna. 
function toggleMenu() {

    let navMenuEl = document.getElementById("nav-menu"); //Hämtar in menyn när den är utfälld.
    let style = window.getComputedStyle(navMenuEl); //Hämtar css för menyn. 


    //Kollar om navigering är synlig eller inte med display och ändrar därefter. 
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

//Händelselyssnare som ser till att desktopnivå syns direkt när fönstret är större än 655px.
window.addEventListener("resize", function () {
    let navMenuEl = document.getElementById("nav-menu");
    if (window.innerWidth > 670) {
        navMenuEl.style.display = "block"; // Visa menyn för desktop.
    } else {
        navMenuEl.style.display = "none"; // Dölj menyn för mobil.
    }
});

//Händelselyssnare för alla länkar i menyn för att se till att den försvinner vid klick.
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Kontrollera om skärmbredden är mindre än eller lika med 655px
        if (window.innerWidth <= 670) {
            document.getElementById('nav-menu').style.display = 'none';
        }
    });
});

//Funktion för animation vid knapptryck.
function expandLoading() {
    const loadingEl = document.querySelector('.loading');

    //Efter ett tryck ska man inte kunna klicka igen.
    loadButton.disabled = true;

    //Vid klick ska den täcka hela föräldraelementet. 
    loadingEl.style.width = '100%';

    //Adderar text efter 500ms.
    setTimeout(() => {
        loadingEl.textContent = 'Laddar...';
        loadingEl.style.color = '#FFFFFF';
        loadingEl.style.paddingLeft = '10px';
        loadingEl.style.lineHeight = '25px';
    }, 500);

    //Ändrar texten när laddningstiden(transitiontiden) är klar.
    setTimeout(() => {
        loadingEl.textContent = 'Klar!';
        loadingEl.style.textAlign = 'right';
        loadingEl.style.paddingRight = '10px';
    }, 4100);

}

//Behövde göra den globalt tillgänglig pga button onlick.
window.expandLoading = expandLoading;


let map = L.map('map').setView([60.0, 18.0], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker;

function searchLocation() {
    let location = document.getElementById('search').value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let lat = data[0].lat;
                let lon = data[0].lon;
                map.setView([lat, lon], 15);

                if (marker) {
                    map.removeLayer(marker);
                }

                marker = L.marker([lat, lon]).addTo(map);
            } else {
                alert('Plats inte hittad');
            }
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
});

window.searchLocation = searchLocation;