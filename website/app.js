//API KEY : c7aff3a9c1fa29918571c087bf0f8328

// INPUTS
const zipCode = document.getElementById("zipCode");
const feelings = document.getElementById("feelings"); //

// UI
const button = document.getElementById("generate");
const entry = document.getElementById("entry");

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=c7aff3a9c1fa29918571c087bf0f8328&units=imperial";

let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// ADD EVENT LISTENER TO BUTTON
button.addEventListener("click", performAction);

function performAction() {
  if (zipCode.value == "" || feelings.value == "") {
    alert("Please fill the inputs!");
  } else {
    getWeatherData(baseURL, zipCode.value, apiKey)
      .then(function (data) {
        // add data to POST request
        postData("/add", {
          temp: data.main.temp,
          date: newDate,
          content: feelings.value,
        });
      })
      .then(function () {
        updateUI();
      })
      .catch(function (error) {
        console.log(error);
        alert("The zip code is invalid. Try again");
      });
  }
}

// GET DATA FROM API
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(`${baseUrl}${zipCode}${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// POST DATA
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
    entry.style.display = "flex";
  } catch (error) {
    console.log("error", error);
  }
};
