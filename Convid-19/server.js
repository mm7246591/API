// use express server to get API
const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.static("public"));
app.get("/api", async function(req, res, next) {
    const { data } = await axios.get(
        "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4001&limited=TWN"
    );

    if (!data) {
        return res.status(500).send(null);
    }

    return res.status(200).send(data);
});

app.listen(3000, function() {
    console.log("API on 127.0.0.1 port 3000!");
});