(function() {
    new Promise(function(resolve, reject) {
        // get API
        fetch('https://api.covid19api.com/summary').then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            }
        }).then(function(res) {
            resolve(res)
        }).catch(function(err) {
            reject(err)
        })
    }).then(res => {
        const Global = res.Global;
        const Tw = res.Countries.find(element => element.CountryCode === 'TW');
        console.log(Tw);
        // use chart.js
        const ctx = document.getElementById('myChart').getContext("2d");
        let gardientGlobal = ctx.createLinearGradient(0, 0, 0, 400);
        let gardientTw = ctx.createLinearGradient(0, 0, 0, 400);
        gardientGlobal.addColorStop(0, "rgba(58,123,213,.5)");
        gardientGlobal.addColorStop(1, "rgba(0,210,255,.3)");
        gardientTw.addColorStop(0, "#ffc0cb");
        gardientTw.addColorStop(1, "#ffc0cb");
        const data = {
            labels: ['NewConfirmed', 'NewDeaths', 'NewRecovered', 'TotalConfirmed', 'TotalDeaths', 'TotalRecovered'],
            datasets: [{
                label: 'Global',
                data: [Global.NewConfirmed, Global.NewDeaths, Global.NewRecovered, Global.TotalConfirmed, Global.TotalDeaths, Global.TotalRecovered],
                borderColor: 'white',
                backgroundColor: gardientGlobal,
                yAxisID: 'y',
                fill: true,
            }, {
                label: 'TW',
                data: [Tw.NewConfirmed, Tw.NewDeaths, Tw.NewRecovered, Tw.TotalConfirmed, Tw.TotalDeaths, Tw.TotalRecovered],
                yAxisID: 'y1',
                fill: true,
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    title: {
                        display: true,
                        text: '全球疫情總累計數'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                        max: 250000000
                    },
                    y1: {
                        type: 'linear',
                        display: false,
                        position: 'left',
                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                }
            },
        };
        new Chart(
            ctx,
            config
        );

    }).catch(err => {
        console.log("Error" + err)
    })
})()