import React from "react";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

import { useTemperatureData } from "./useTemperatureData";

type Props = {
  city: City;
};

export const ChartItem = ({ city }: Props) => {
  const { data, status } = useTemperatureData(city.coordinates);
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }}>
      <Text style={s.text}>{city.name}</Text>
      {status === "error" && <Text>Something went wrong</Text>}
      {status === "loading" && <ActivityIndicator size="large" />}
      {status === "success" && (
        <VictoryChart domainPadding={{ y: 25 }} theme={VictoryTheme.material}>
          <VictoryAxis
            tickFormat={(value, index) =>
              index % 2 === 1 ? `${new Date(value).getHours()}` : ""
            }
          />
          <VictoryAxis dependentAxis tickFormat={value => `${value}°C`} />
          <VictoryLine
            interpolation="monotoneX"
            data={data?.hourly?.time?.map((time, index) => {
              const d = data?.hourly?.temperature_2m?.[index];

              return {
                x: time,
                y: d,
              };
            })}
          />
        </VictoryChart>
      )}
    </View>
  );
};

import { StyleSheet } from "react-native";

import { City } from "../types";

const s = StyleSheet.create({
  text: {
    marginLeft: 16,
  },
});
