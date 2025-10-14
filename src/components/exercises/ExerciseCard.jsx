import {View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import imagen from '../../../assets/Images/gym-proof.jpg';

function ExerciseCard({title = "Push Up", bodyPart = "pecho"}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress ={() => navigation.navigate("InfoExercises") } 
      className="w-11/12 h-22 p-4 bg-tertiary rounded-xl flex flex-row
      items-center justify-between gap-4"
      // onClick={handleCardClick}
    >
        <Image 
          className="w-20 h-20 rounded-xl"
          source={imagen}
          resizeMode='cover'
          style={{ flexShrink: 0 }}
          // source={getImageUrl()}
          // onError={handleImageError}
          // onLoad={() => console.log(`Imagen cargada: ${title}`)} // Debug
        />
        <View className="flex-1 overflow-hidden">
          <Text className="text-lg text-secondary"
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {title}
          </Text>
          <Text className="text-gray-200 capitalize text-sm" numberOfLines={1}>{bodyPart}</Text>
        </View>
        <TouchableOpacity 
          // onPress={onAddExercise}
          style={{ flexShrink: 0 }}
        >
          <FontAwesome5 
            size={24} 
            color="#000000" 
            name="plus-square"  
          />
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export {ExerciseCard}
