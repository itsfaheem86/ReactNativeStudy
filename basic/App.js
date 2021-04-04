import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ComponentsScreen from "./src/screens/ComponentsScreen";
import CounterScreen from "./src/screens/CounterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ImageScreen from "./src/screens/ImageScreen";
import ListScreen from "./src/screens/ListScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    ListScreen: ListScreen,
    ImageScreen: ImageScreen,
    CounterScreen: CounterScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
