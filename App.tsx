import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, s.safeAreaView]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={s.welcomeText}>Happy coding!</Text>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
