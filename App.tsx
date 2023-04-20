import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';

import { WeatherData } from './types';

const API_KEY = 'YOUR_API_KEY_HERE';
const LOCATION_COORD = { lat: 60.1699, lon: 24.9384 };

const DAYS_OF_DATA_AT_ONCE = 5; // 1-5 days
const DATA_POINTS = DAYS_OF_DATA_AT_ONCE * 8;
const UNITS = 'metric';
const URI_3_HOUR_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?lat=${LOCATION_COORD.lat}&lon=${LOCATION_COORD.lon}&appid=${API_KEY}&cnt=${DATA_POINTS}&units=${UNITS}`;

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [dayIndex, setDayIndex] = useState<number>(DAYS_OF_DATA_AT_ONCE - 1);
  const [data, setData] = useState<WeatherData | undefined>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  useEffect(() => {
    const run = async () => {
      try {
        setStatus('loading');
        const res = await fetch(URI_3_HOUR_FORECAST, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json: WeatherData = await res.json();
        setData(json);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };
    run();
  }, []);

  const dataToShow = useMemo(
    () =>
      data?.list?.filter((_, i) => i >= dayIndex * 8 && i < (dayIndex + 1) * 8),
    [data, dayIndex]
  );

  return (
    <SafeAreaView style={[backgroundStyle, s.safeAreaView]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={s.container}>
        {status === 'error' && <Text>Something went wrong</Text>}
        {status === 'loading' && (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
        {status === 'success' && (
          <>
            <VictoryChart domainPadding={{ y: 25 }} theme={VictoryTheme.material}>
              <VictoryLine
                interpolation="monotoneX"
                data={dataToShow?.map(d => ({
                  x: d.dt_txt,
                  y: Math.round(d.main.temp),
                }))}
              />
              <VictoryAxis
                tickFormat={value => `${new Date(value).getHours()}`}
              />
              <VictoryAxis dependentAxis tickFormat={value => `${value}°C`} />
            </VictoryChart>
            <View style={s.row}>
              {[...Array(DAYS_OF_DATA_AT_ONCE)].map((_, i) => {
                const day = data?.list?.[i * 8];
                const date = day?.dt_txt ? new Date(day?.dt_txt) : null;
                if (!date) {
                  console.error("Couldn't parse date");
                  return null;
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setDayIndex(i);
                    }}
                    style={s.button}
                    key={i}>
                    <Text>{date.getDate() + '-' + date.getMonth()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
