import { API_KEY } from "../../utils/WeatherAPIKey";

export const fetchWeather = async (store: any, lat: any, lon: any) => {
  const fetched = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
  );
  const data = await fetched.json();
  const temperature = Math.round(data.list[0].main.temp);
  const weatherCondition = data.list[0].weather[0].main;
  const days = data.list.filter((reading: any) =>
    reading.dt_txt.includes("18:00:00")
  );

  store.setState({ loading: false, days, temperature, weatherCondition });

  // setLoading(false);
};
