(function($) {
    // get API
    $.getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0E831978-BC2A-4AF2-BCD1-E20F3600CE3D')
        .done(function(res) {
            // set parameter
            const data = res.records.locations[0].location;
            const info = {
                T: [],
                Wx: [],
                PoP12h: [],
            };
            let weatherStr;
            let dayStr = '';
            let date;
            let day;
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
            /**
             *
             *
             * @param {*} name
             * @return {*} 
             */
            function getPic(name) {
                let pic = "";
                switch (name) {
                    case "晴時多雲":
                        pic = `<img src="./img/晴時多雲.svg">`;
                        break;
                    case "多雲時晴":
                        pic = `<img src="./img/多雲時晴.svg">`;
                        break;
                    case "多雲":
                        pic = `<img src="./img/多雲.svg">`;
                        break;
                    case "多雲時陰":
                        pic = `<img src="./img/多雲時陰.svg">`;
                        break;
                    case "陰時多雲":
                        pic = `<img src="./img/陰時多雲.svg">`;
                        break;
                    case "陰短暫雨":
                        pic = `<img src="./img/陰短暫雨.svg">`;
                        break;
                    case "陰陣雨":
                        pic = `<img src="./img/陰短暫雨.svg">`;
                        break;
                    case "陰短暫陣雨":
                        pic = `<img src="./img/陰短暫陣雨.svg">`;
                        break;
                    case "多雲短暫雨":
                        pic = `<img src="./img/多雲短暫雨.svg">`;
                        break;
                    case "多雲短暫陣雨":
                        pic = `<img src="./img/多雲短暫陣雨.svg">`;
                        break;
                    case "陰天":
                        pic = `<img src="./img/陰天.svg">`;
                        break;
                    case "多雲時陰短暫雨":
                        pic = `<img src="./img/多雲時陰短暫雨.svg">`;
                        break;
                    case "多雲時陰短暫陣雨":
                        pic = `<img src="./img/多雲時陰短暫陣雨.svg">`;
                        break;
                    case "陰時多雲短暫雨":
                        pic = `<img src="./img/陰時多雲短暫雨.svg">`;
                        break;
                    case "陰時多雲短暫陣雨":
                        pic = `<img src="./img/陰時多雲短暫陣雨.svg">`;
                        break;

                }
                return pic;
            }

            // set weather data
            function getWeather() {
                weatherStr = "";
                data.forEach((location) => {
                    weatherStr += "<tr>";
                    weatherStr += `<td>${location.locationName}</td>`;
                    location.weatherElement.forEach((elment) => {
                        if (elment.elementName === "T") {
                            info.T = elment.time;
                        }
                        if (elment.elementName === "Wx") {
                            info.Wx = elment.time;
                        }
                        if (elment.elementName === "PoP12h") {
                            info.PoP12h = elment.time;
                        }
                    });
                    if (info.T.length === 15) {
                        weatherStr += ` 
                            <td>
                                <p>${info.Wx[0].elementValue[0].value} ${getPic(info.Wx[0].elementValue[0].value)}</p>
                                <p>平均氣溫：${info.T[0].elementValue[0].value} ℃</p>
                                <p>降雨機率：${info.PoP12h[0].elementValue[0].value === " "? "0": info.PoP12h[0].elementValue[0].value} %</p>
                            </td>`;
                        for (let i = 1; i < info.T.length; i += 2) {
                            const pic = getPic(info.Wx[i].elementValue[0].value);
                            weatherStr += ` 
                            <td>
                                <p>${info.Wx[i].elementValue[0].value} ${pic}</p>
                                <p>平均氣溫：${info.T[i].elementValue[0].value} ℃</p>
                                <p>降雨機率：${info.PoP12h[i].elementValue[0].value === " "? "0": info.PoP12h[i].elementValue[0].value} %</p>
                            </td>`;
                        }
                        weatherStr += `</tr>`;
                    } else {
                        for (let i = 0; i < info.T.length; i += 2) {
                            const pic = getPic(info.Wx[i].elementValue[0].value);
                            weatherStr += ` 
                                <td>
                                    <p>${info.Wx[i].elementValue[0].value} ${pic}</p>
                                    <p>平均氣溫：${info.T[i].elementValue[0].value} ℃</p>
                                    <p>降雨機率：${info.PoP12h[i].elementValue[0].value === " "? "0": info.PoP12h[i].elementValue[0].value} %</p>
                                </td>`;
                        }
                        weatherStr += `</tr>`;
                    }
                });
            };
            getDay();
            getWeather();
            $("thead tr").html(dayStr);
            $("thead tr").prepend(location);
            $('tbody').html(weatherStr);
            // DT style
            $('#weatherTable').DataTable({
                "lengthMenu": [5],
                "info": false,
                "lengthChange": false
            });
        })
        .fail(function(err) {
            console.log("資料讀取失敗" + err);
        });
})($)