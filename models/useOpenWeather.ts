import { gql, useQuery } from "@apollo/client";

const GET_WEATHER = gql`
  query Weather($lat: Number, $lon: Number) {
    weatherRes(lat: $lat, lon: $lon)
      @rest(type: "WeatherResponse", path: "&lat={args.lat}&lon={args.lon}") {
      list
    }
  }
`;

export default function useOpenWeather(lat: number, lon: number) {
  const result = useQuery(GET_WEATHER, {
    variables: {
      lat,
      lon,
    },
  });

  return result;
}
