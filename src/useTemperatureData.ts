import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Coordinates, WeatherDataResponse, WeatherDataSuccess } from "../types";

const BASE_URL = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&forecast_days=1`;

export const useTemperatureData = (coordinates: Coordinates) => {
  const [data, setData] = useState<WeatherDataSuccess | undefined>();
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  const key = `${coordinates.latitude}-${coordinates.longitude}`;

  useEffect(() => {
    const run = async () => {
      setStatus("loading");

      const cachedData = await AsyncStorage.getItem(key);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setStatus("success");
      }

      try {
        const url =
          `${BASE_URL}&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`.trim();

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

        await AsyncStorage.setItem(key, JSON.stringify(json));
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
  }, [coordinates.latitude, coordinates.longitude, key]);

  return { data, status };
};
