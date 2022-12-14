//API KEY : c7aff3a9c1fa29918571c087bf0f8328

// GLOBAL VARIABLES
const zipCode = document.getElementById("zipCode");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const feeling = document.getElementById("feelings");
const feelingSpan = document.getElementById("feeling");
const button = document.getElementById("generate");
const entry = document.getElementById("entry");

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "c7aff3a9c1fa29918571c087bf0f8328";

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// ADD EVENT LISTENER TO BUTTON
button.addEventListener("click", weatherData);

// GET DATA & ADD IT TO UI
async function weatherData() {
  await fetch(`${baseURL}${zipCode.value}&appid=${apiKey}`)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json();
      }
    })
    .then(function (data) {
      date.innerHTML = newDate;
      feelingSpan.innerHTML = feeling.value;
      temp.innerHTML = data.weather[0].main;
      content.innerHTML = data.weather[0].description;
      postData("/add", { date: newDate, temp: data.main.temp, content });
      entry.style.display = "flex";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// POST DATA
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};
