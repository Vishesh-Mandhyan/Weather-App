import currentLocation from "./currentlocation.js";
import {
  SetlocationObj,
  getHomeLocation,
  getWeatherFromApi,
  getCoordsFromApi,
} from "./DataFunctions.js";
// Creating an Object from a constructor
const currentLoc = new currentLocation();

// Function thats get called after DOM is loaded

const initapp = () => {
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);
  const HomeLocation = document.getElementById("home");
  HomeLocation.addEventListener("click", loadWeather);
  const saveButton = document.getElementById("saveLocation");
  saveButton.addEventListener("click", saveLocation);
  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", refresh);
  const locationEntry = document.getElementById("searchBar_form");
  locationEntry.addEventListener("submit", submitNewLocation);
  loadWeather();
};
document.addEventListener("DOMContentLoaded", initapp);

// function thats get called after location icon is clicked

function getGeoWeather(event) {
  navigator.geolocation.getCurrentPosition((position) => {
    const myLocationObj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: `Latitude is ${position.coords.latitude} and longitude is ${position.coords.longitude}`,
    };
    SetlocationObj(currentLoc, myLocationObj);
  });
}

// function to retrieve information from local storage and passed it on to another function

function loadWeather() {
  const homeLocationAddress = getHomeLocation();
  displayHomeLocationWeather(homeLocationAddress);
}

// function to parse the json collected from local storage and saved its values in another object

const displayHomeLocationWeather = (homeLocationAddress) => {
  let HomeLocation = JSON.parse(homeLocationAddress);
  const myHomeLocationObj = {
    lat: HomeLocation.lat,
    lon: HomeLocation.lon,
    name: HomeLocation.name,
  };
  SetlocationObj(currentLoc, myHomeLocationObj);
};

// function that saves the current location into the local storage

const saveLocation = () => {
  const location = {
    lat: currentLoc.Lat,
    lon: currentLoc.Lon,
    name: currentLoc.Name,
  };
  console.log(location);
  localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
};

// function to refresh the weather information

const refresh = () => {
  updateDataAndDisplay(currentLoc);
};

// function for submitting new location via the form

const submitNewLocation = async (event) => {
  event.preventDefault();
  const inputText = document.getElementById("searchBar_Text").value;
  const locationData = await getWeatherFromApi(inputText);
  const LocationObj = {
    lat: locationData.coord.lat,
    lon: locationData.coord.lon,
    name: locationData.name,
  };
  SetlocationObj(currentLoc, LocationObj);
};

// function to update and the display the weather information

async function updateDataAndDisplay(locationObj) {
  console.log(locationObj);
  let weatherJson = await getCoordsFromApi(locationObj);
  console.log(weatherJson);
  // updateDisplay(WeatherJson);
}
