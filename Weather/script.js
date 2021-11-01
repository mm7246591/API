(function($) {
    // get API
    $.getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0E831978-BC2A-4AF2-BCD1-E20F3600CE3D')
        .done(function(res) {
            // set parameter
            const data = res.records.locations[0].location;
            let weatherStr = '';
            let dayStr = '';
            let date;
            let day;
            let PoP;
            let T;
            let Wx;
            let location = `<th>地區</th>`;
            let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec", ]
                // set time of one week
            function getDay() {
                for (let i = 0; i < data[0].weatherElement[0].time.length; i += 2) {
                    date = data[0].weatherElement[0].time[i].startTime;
                    day = new Date(date);
                    dayStr += `<th>${dayName[day.getDay()]},${day.getDate()}th ${monthName[day.getMonth()]},${day.getFullYear()}</th>`;
                }
            }
            // set weather data
            function getWeather() {
                for (let i = 0; i < data.length; i++) {
                    PoP = data[i].weatherElement[0].time;
                    T = data[i].weatherElement[1].time;
                    Wx = data[i].weatherElement[6].time;
                    if (data[i].weatherElement[6].time.length === 14) {
                        weatherStr += `
                    <tr>
                    <td>${data[i].locationName}</td>
                    <td>
                    <p>${Wx[0].elementValue[0].value} <img src="./img/${Wx[0].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[0].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[0].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[2].elementValue[0].value} <img src="./img/${Wx[2].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[2].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[2].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[4].elementValue[0].value} <img src="./img/${Wx[4].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[4].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[4].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[6].elementValue[0].value} <img src="./img/${Wx[6].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[6].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[6].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[8].elementValue[0].value} <img src="./img/${Wx[8].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[8].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[8].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[10].elementValue[0].value} <img src="./img/${Wx[10].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[10].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[10].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[12].elementValue[0].value} <img src="./img/${Wx[12].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[12].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[12].elementValue[0].value} %</p>
                    </td>
                    </tr>`
                    } else if (data[i].weatherElement[6].time.length === 15)
                        weatherStr += `
                    <tr>
                    <td>${data[i].locationName}</td>
                    <td>
                    <p>${Wx[0].elementValue[0].value} <img src="./img/${Wx[0].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[0].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[0].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[2].elementValue[0].value} <img src="./img/${Wx[2].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[2].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[2].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[4].elementValue[0].value} <img src="./img/${Wx[4].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[4].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[4].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[6].elementValue[0].value} <img src="./img/${Wx[6].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[6].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[6].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[8].elementValue[0].value} <img src="./img/${Wx[8].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[8].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[8].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[10].elementValue[0].value} <img src="./img/${Wx[10].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[10].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[10].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[12].elementValue[0].value} <img src="./img/${Wx[12].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[12].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[12].elementValue[0].value} %</p>
                    </td>
                    <td>
                    <p>${Wx[14].elementValue[0].value} <img src="./img/${Wx[14].elementValue[0].value}.svg"></p>
                    <p>平均氣溫：${T[14].elementValue[0].value} ℃</p>
                    <p>降雨機率：${PoP[14].elementValue[0].value} %</p>
                    </td>
                    </tr>`
                }
            };
            getDay();
            getWeather();
            $("thead tr").html(dayStr);
            $("thead tr").prepend(location);
            $('tbody').html(weatherStr);
            // DT style
            $('#weather-table').DataTable({});
        })
        .fail(function(err) {
            console.log("資料讀取失敗" + err);
        });
})($)