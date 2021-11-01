(function() {
    let promise = new Promise((resolve, reject) => {
        let API = fetch("https://script.googleusercontent.com/macros/echo?user_content_key=52bKshREq6zfs1I4yNWdkcV3OkKT80n3VcGsJTYkgeDKwVODS7dJgF_L2lP0NAAh4CzRiaQZBkThC1xAsQmBPIhrPm6XiRD7OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa6ai2ySSbpOAv3TVSJTL1UGbCDqRjWDpbaLURoEeh3D9Fq72zGP28hXBAKzFYB4EXiWn5A-U8j-cBCRrZReUrtXik-LWNpEnEEUIeJCTHeLB25cBii0UY7jawfU1IaUobUEz4_8KsQUvG7RcrVv2q0M&lib=MknHa9IEn_wNEQgdg_NhRbgbBXOrB1RJZ");
        API.then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                reject("取得資料失敗");
            }
        }).then(data => {
            resolve(data);
        })
    });
    promise.then(res => {
        let data = res;
        const area = document.querySelector(".area");
        const container = document.querySelector(".container");
        area.addEventListener("change", showAQI);

        function filterCounty() {
            const set = new Set();
            const result = data.filter(item => !set.has(item.County) ? set.add(item.County) : false); // filter double county
            result.forEach(item => {
                const option = document.createElement("option");
                option.textContent = item.County;
                area.appendChild(option)
            });
        }

        function showAQI() {
            let str = '';
            for (let i = 0; i < data.length; i++) {
                if (this.value === data[i].County) {
                    str +=
                        `
                        <div class="content">
                            <div class="item">
                 <div class="site-Name">${data[i].SiteName}</div>
                 <div class="AQI">AQI ${data[i].AQI}</div>
                </div>
                <div class="data">
                    <div class="pm">PM2.5<span> ${data[i]['PM2.5']}μg/m3</span></div>
                    <div class="pm">PM2.5 <span>${data[i]['PM10']}μg/m3</span></div>
                    <div class="=O3">臭氧 <span>${data[i].O3}ppb</span></div>
                    <div class="CO">一氧化碳 <span>${data[i].CO}ppm</span></div>
                    <div class="NO">一氧化氮 <span>${data[i].NO}ppb</span></div>
                    <div class="SO2">二氧化硫 <span>${data[i].SO2}ppb</span></div>
                    <div class="status">況狀 <span>${data[i].Status}</span></div>
                </div>
                <span class="time">資料更新時間：${data[i].PublishTime}</span>
             </div>`;
                    container.innerHTML = str;
                } else if (this.value == "請選擇區域") {
                    container.innerHTML = '';
                }
            }

        }
        filterCounty();
        showAQI();
    }).catch(err => {
        console.log(err)
    })
})()