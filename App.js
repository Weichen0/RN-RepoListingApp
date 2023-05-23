import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./pages/index";
import { View } from "react-native";

export default function Root() {
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <App />
        </View>
      </Provider>
    </>
  );
}
