import { Provider } from "react-redux";
import { store } from "./store";
import { View } from "react-native";
import { Navigation } from "./src/utils/router";
import "react-native-gesture-handler";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Navigation />
        </View>
      </Provider>
    </>
  );
}
