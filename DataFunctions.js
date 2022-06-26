export let SetlocationObj = (currentLoc, myLocationObj) => {
  currentLoc.Lat = myLocationObj.lat;
  currentLoc.Lon = myLocationObj.lon;
  currentLoc.Name = myLocationObj.name;
  console.log(currentLoc);
};
export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getCoordsFromApi = async (locationObj) => {
  let lat = locationObj.Lat;
  let lon = locationObj.Lon;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=celsius&appid=${WEATHER_API_KEY}`;
  const weatherStream = await fetch(url);
  const weatherJson = await weatherStream.json();
  return weatherJson;
};

export const getWeatherFromApi = async (inputText) => {
  const regex = /^\d+$/g;
  const flag = regex.test(inputText) ? "zip" : "q";
  const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${inputText}&units=celsius&appid=${WEATHER_API_KEY}`;
  const encodedUrl = encodeURI(url);
  try {
    const data = await fetch(encodedUrl);
    const JsonData = await data.json();
    console.log(JsonData);
    return JsonData;
  } catch (error) {
    console.log(error);
  }
};
