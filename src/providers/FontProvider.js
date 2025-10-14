import { useFonts } from "expo-font";

export function useAppFonts() {
  const [fontsLoaded] = useFonts({
    "Karla": require("../../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../../assets/fonts/Karla-ExtraBold.ttf"),
    "Karla-ExtraLight": require("../../assets/fonts/Karla-ExtraLight.ttf"),
    "Karla-Light": require("../../assets/fonts/Karla-Light.ttf"),
    "Karla-SemiBold": require("../../assets/fonts/Karla-SemiBold.ttf"),
  });
  return fontsLoaded;
}

