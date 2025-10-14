import "./global.css"
import { useAppFonts } from './src/providers/FontProvider.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './src/Screens/Login.jsx';
import { SignUp } from "./src/Screens/SignUp.jsx";
import { Exercises } from "./src/Screens/Exercises.jsx";
import { InfoExercises } from "./src/Screens/InfoExercises.jsx";


const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Exercises" component={Exercises} />
        <Stack.Screen name="InfoExercises" component={InfoExercises} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


