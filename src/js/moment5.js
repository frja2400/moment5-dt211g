"use strict";


async function fetchData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function createBarChart() {
    const data = await fetchData();

    const courses = data.filter(course => course.type === 'Kurs');

    const topCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);

    const courseNames = topCourses.map(course => course.name);
    const totalApplicants = topCourses.map(course => course.applicantsTotal);

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

    const chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();
}

createBarChart();

async function createCircelChart() {
    const data = await fetchData();

    const programs = data.filter(program => program.type === 'Program');

    const topPrograms = programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 5);

    const programNames = topPrograms.map(program => program.name);
    const totalApplicants = topPrograms.map(program => program.applicantsTotal);

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