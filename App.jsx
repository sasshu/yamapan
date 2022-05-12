import { HomeScreen } from "./components/screen/HomeScreen";
import { SettingScreen } from "./components/screen/SettingScreen";
import { BoardProvider } from "./components/stateProviders/BoardStateProvider";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <BoardProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BoardProvider>
  );
};
export default App;
