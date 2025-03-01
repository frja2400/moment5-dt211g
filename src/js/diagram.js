"use strict";


/**
 * Asynkron funktion som hämtar data från en URL och konverterar till JSON.
 * 
 * @async
 * @function fetchData
 * @returns {Promise} - Returnerar ett Promise vid slutfört hämtning och konvertering av data. 
 * @throws {Error} - Fel vid misslyckad hämtning eller JSON-konvertering.
 */
async function fetchData() {
    //Använder try-catch för eventuella fel.
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}


/**
 * @typedef {Object} Course - Namn jag anger till objekten som hämtas från URL:n. 
 * @property {string} name - Egenskap i Course av typen sträng och namnet name.
 * @property {string} type - Egenskap i Course av typen sträng och namnet type.
 * @property {number} applicantsTotal - Egenskap i Course av typen nummer och namnet applicantsTotal.
 */

/**
 * Asynkron funktion för att skapa ett stapeldiagram med ApexChart.js
 * 
 * @async
 * @function createBarChart
 * @returns {Promise} - Returnerar ett Promise när diagrammet har skapats med data från fetchData.
 */
async function createBarChart() {

    //Anropar fetchData och väntar på att datan ska bli tillgänglig. 
    const data = await fetchData();

    //Filtrerar ut kurser från den hämtade datan.
    const courses = data.filter(course => course.type === 'Kurs');

    //Sorterar kurserna i fallande ordning och tar de sex första objekten i den sorterade arrayen.
    const topCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);

    //Använder .map för att skapa nya arrayer av de filtrerade kurserna och antalet sökande.
    const courseNames = topCourses.map(course => course.name);
    const totalApplicants = topCourses.map(course => course.applicantsTotal);

    //Skapar ett stapeldiagram med ApexChart.js.
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        series: [{
            name: 'Totalt sökande',
            data: totalApplicants
        }],
        xaxis: {
            categories: courseNames
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                colors: {
                    backgroundBarColors: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    backgroundBarOpacity: 1
                }
            }
        }
    };

    //Konfigurerar diagrammet med inställningarna jag implementerat i options.
    const chart = new ApexCharts(document.querySelector("#myChart"), options);
    //Visar diagrammet i HTML-elementet myChart.
    chart.render();
}

createBarChart();


/**
 * @typedef {Object} Program - Namn jag anger till objekten som hämtas från URL:n. 
 * @property {string} name - Egenskap i Program av typen sträng och namnet name.
 * @property {string} type - Egenskap i Program av typen sträng och namnet type.
 * @property {number} applicantsTotal - Egenskap i Program av typen nummer och namnet applicantsTotal.
 */

/**
 * Asynkron funktion för att skapa ett cirkeldiagram med Chart.js.
 * @async
 * @function createCircleChart
 * @returns {Promise} - Returnerar ett Promise när diagrammet har skapats med data från fetchData.
 */
async function createCircelChart() {

    //Anropar fetchData och väntar på att datan ska bli tillgänglig. 
    const data = await fetchData();

    //Filtrerar ut program från den hämtade datan.
    const programs = data.filter(program => program.type === 'Program');

    //Sorterar programmen i fallande ordning och tar de 5 första objekten i den sorterade arrayen. 
    const topPrograms = programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 5);

    //Använder .map för att skapa nya arrayer av de filtrerade programmen och antalet sökande.
    const programNames = topPrograms.map(program => program.name);
    const totalApplicants = topPrograms.map(program => program.applicantsTotal);

    //Skapar ett cirkeldiagram med Chart.js.
    const ctx = document.getElementById('myChart2');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: programNames,
            datasets: [{
                label: 'Totalt sökande',
                data: totalApplicants,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

createCircelChart();

