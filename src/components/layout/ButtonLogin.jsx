import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

function ButtonLogin({icon, text, link}) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(link);
  };

  return (
    <TouchableOpacity className="flex flex-col items-center justify-center" onPress={handlePress}>
        <FontAwesome5 
        name={icon} 
        size={26} 
        color="#6b6b6b" 
        />
        <Text className="text-xs text-center text-[#6b6b6b]">
        {text}
        </Text>
    </TouchableOpacity>
  )
}

export {ButtonLogin}
