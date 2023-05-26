import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomePage from "../pages/Home/index";
import ViewRepoPage from "../pages/ViewRepo/index";

const MainStack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={HomePage} />
        <MainStack.Screen name="ViewRepo" component={ViewRepoPage} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export { Navigation };
