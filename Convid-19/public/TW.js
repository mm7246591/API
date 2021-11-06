(function() {
    // get API
    axios.get("/api")
        .then(function(res) {
            // get date
            const time = new Date(res.data[0].a04);
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const date = time.getDate();
            let dataStr = "";
            res.data.forEach((element) => {
                dataStr += `
                <tr>
                <td>${element.a03}</td>
                <td>${element.a04}</td>
                <td>${element.a05}</td>
                <td>${element.a06}</td>
                <td>${element.a08}</td>
                <td>${element.a09}</td>
                <td>${element.a20}</td>
                <td>${element.a21}</td>
                <td>${element.a22}</td>
                <td>${element.a31}</td>
                <td>${element.a32}</td>
                </tr>`;
            });
            $("h2").html(`疫情資訊圖表<p>update on ${year}-${month}-${date}</p>`)
            $("tbody").html(dataStr);
            $("#convidTable").DataTable({
                lengthMenu: [10, 15, 20],
                info: false,
                order: [],
            });
        })
        .catch(function(err) {
            console.log(err);
        });
})();