import { View } from "react-native";
import { Navigation } from "../utils/router";

function App() {
  return (
    <View style={{ flex: 1, flexDireciton: "column" }}>
      <Navigation />
    </View>
  );
}
export { App };
