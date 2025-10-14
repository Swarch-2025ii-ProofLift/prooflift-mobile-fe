import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NavigateLogin({ text, linkText, link }) {
  const navigation = useNavigation();

  return (
    <View className='login__p'>
        <Text className="text-secondary">{text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(link)}>
          <Text className="text-primary">{linkText}</Text>
        </TouchableOpacity>
    </View>
  )
}

export  { NavigateLogin }


