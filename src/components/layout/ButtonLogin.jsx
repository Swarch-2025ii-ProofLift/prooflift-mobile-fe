import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

function ButtonLogin({icon, text}) {
  return (
    <TouchableOpacity className="flex flex-col items-center justify-center">
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
