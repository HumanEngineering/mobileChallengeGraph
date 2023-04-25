import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import DatePicker from "react-native-date-picker";

import { City } from "../types";
import { ChartItem } from "./ChartItem";
import CityCoordinates from "./cityCoordinates.json";

const cityCoordinates: City[] = CityCoordinates;

// 4 --> 04
const addZeroIfNeeded = (n: number) => {
  return n < 10 ? "0" + n : n;
};

// 'YYYY-MM-DD'
const formatDateToDateString = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    addZeroIfNeeded(date.getMonth() + 1) +
    "-" +
    addZeroIfNeeded(date.getDate())
  );
};

const dayToMilliseconds = (day: number) => day * 24 * 60 * 60 * 1000;

const initialDate = new Date(Date.now() - dayToMilliseconds(7));
const SUPPORTS_DAYS_TO_PAST = 365;

const eachDayOfInterval = (start: Date, end: Date) => {
  const days = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [date, setDate] = useState(initialDate);
  const [dateModalOpen, setDateModelOpen] = useState(false);

  const minimumDate = useMemo(
    () =>
      new Date(
        initialDate.getTime() - dayToMilliseconds(SUPPORTS_DAYS_TO_PAST)
      ),
    []
  );

  const availableDays = useMemo(
    () =>
      eachDayOfInterval(
        new Date(
          initialDate.getTime() - dayToMilliseconds(SUPPORTS_DAYS_TO_PAST)
        ),
        initialDate
      )
        .map(formatDateToDateString)
        .reverse(),
    []
  );

  const { width } = useWindowDimensions();

  const flatListRef = useRef<FlatList>(null);

  return (
    <SafeAreaView style={[backgroundStyle, s.safeAreaView]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={s.container}>
        <Button title="Jump to day..." onPress={() => setDateModelOpen(true)} />
        <DatePicker
          maximumDate={initialDate}
          minimumDate={minimumDate}
          modal
          open={dateModalOpen}
          date={date}
          mode="date"
          onConfirm={d => {
            const index = availableDays.findIndex(
              dd => dd === formatDateToDateString(d)
            );

            const offset = index * width;

            flatListRef.current?.scrollToOffset({
              animated: true,
              offset,
            });
            setDateModelOpen(false);
            setDate(d);
          }}
          onCancel={() => {
            setDateModelOpen(false);
          }}
        />
        <FlatList
          ref={flatListRef}
          onScrollToIndexFailed={(...rest) =>
            // eslint-disable-next-line no-console
            console.log("onScrollToIndexFailed", rest)
          }
          inverted
          horizontal
          snapToInterval={width}
          data={cityCoordinates}
          keyExtractor={item => item.name}
          renderItem={({ item }) => <ChartItem city={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
