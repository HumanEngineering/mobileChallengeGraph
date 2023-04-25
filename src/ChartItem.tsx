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
  date: string;
};

export const ChartItem = ({ date }: Props) => {
  const { data, status } = useTemperatureData(date);
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }}>
      <Text style={s.text}>{date}</Text>
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

const s = StyleSheet.create({
  text: {
    marginLeft: 16,
  },
});
