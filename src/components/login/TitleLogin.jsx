import { Text, View, Image } from 'react-native';

function TitleLogin ({ title, imgLink, statement }) {
  return (
    <View className='flex flex-col items-center justify-center gap-2'>
      <Image source={imgLink} className='w-20 h-20' />
      <Text className='text-3xl font-bold text-secondary'>{title}</Text>
      <View><Text className='text-center text-secondary'>{statement}</Text></View>
    </View>
  )
}

export { TitleLogin }
