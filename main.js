const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname, "/index.html");
});
app.post("/", function (req, res) {
  const city = req.body.cityName;
  const appKey = "12753cdcb473140f8d97e3bb1529014e";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}units&appid=${appKey}`;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      console.log(weatherData);
      res.write(
        `<h1>The weather in london is ${weatherDescription} and it's ${temp} celcsuis</h1>`
      );
      res.write(`<img src=${imgURL} />`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is runnig at port 3000");
});
