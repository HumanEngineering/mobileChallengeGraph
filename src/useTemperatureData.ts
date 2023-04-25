import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { WeatherDataResponse, WeatherDataSuccess } from "../types";

const LOCATION_COORD_HELSINKI = { lat: 60.1699, lon: 24.9384 };

const BASE_URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${LOCATION_COORD_HELSINKI.lat}&longitude=${LOCATION_COORD_HELSINKI.lon}&hourly=temperature_2m`;

export const useTemperatureData = (dateString: string) => {
  const [data, setData] = useState<WeatherDataSuccess | undefined>();
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const run = async () => {
      setStatus("loading");

      const cachedData = await AsyncStorage.getItem(dateString);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setStatus("success");
      }

      try {
        const url =
          `${BASE_URL}&start_date=${dateString}&end_date=${dateString}`.trim();

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const json: WeatherDataResponse = await res.json();

        if (!json) {
          throw new Error("No data in response");
        }

        if (json && "error" in json && json?.error) {
          throw json;
        }

        await AsyncStorage.setItem(dateString, JSON.stringify(json));
        setData(json as WeatherDataSuccess);
        setStatus("success");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === "Network request failed" && cachedData) {
          setData(JSON.parse(cachedData));
          setStatus("success");
          return;
        }
        // eslint-disable-next-line no-console
        console.log(error.message);
        setStatus("error");
      }
    };
    run();
  }, [dateString]);

  return { data, status };
};
