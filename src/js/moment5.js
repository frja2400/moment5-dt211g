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

async function createChart() {
    const data = await fetchData();

    const courses = data.filter(course => course.type === 'Kurs');

    const topCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);

    const courseNames = topCourses.map(course => course.name);
    const totalApplicants = topCourses.map(course => course.applicantsTotal);


    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courseNames,
            datasets: [{
                label: 'Totalt sökande',
                data: totalApplicants,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 200
                    }
                }
            }
        }
    });

}

createChart();