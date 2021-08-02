import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

import { API_KEY } from "../../utils/WeatherAPIKey";

const restLink = new RestLink({
  uri: `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric`,
});

export default function createClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
  });
}
