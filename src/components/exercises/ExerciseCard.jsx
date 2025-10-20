import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};


const getPlaceholderImage = (group) => {
  const placeholders = {
    pecho: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    espalda: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop',
    piernas: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop',
    hombros: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400&h=300&fit=crop',
    brazos: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    core: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  };
  return placeholders[group.toLowerCase()] || placeholders['piernas'];
};


const getImageUrl = (title) => {
  const slug = createSlug(title);
  return `https://mi-servidor.com/exercises/${slug}.webp`;
};

function ExerciseCard({ id, title = "Push Up", bodyPart = "pecho" }) {
  const navigation = useNavigation();

  // Estado local para la imagen actual
  const [imageUri, setImageUri] = useState(getImageUrl(title));

  // Si la imagen falla, usar placeholder
  const handleImageError = () => {
    setImageUri(getPlaceholderImage(bodyPart));
  };

  // Al presionar la tarjeta
  const handleCardPress = () => {
    navigation.navigate("InfoExercises", { id });
  };

  // Al presionar el botón "+"
  const handleAddExercise = (e) => {
    e.stopPropagation?.(); // Evita navegar al presionar el icono
    // console.log("Agregando ejercicio:", id, title);
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      className="w-11/12 h-24 p-4 bg-tertiary rounded-xl flex flex-row items-center justify-between gap-4 mb-3"
      activeOpacity={0.8}
    >
      <Image
        className="w-20 h-20 rounded-xl"
        source={{ uri: imageUri }}
        resizeMode="cover"
        onError={handleImageError}
        style={{ flexShrink: 0 }}
      />
      
      <View className="flex-1 overflow-hidden">
        <Text
          className="text-lg text-secondary"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          className="text-gray-200 capitalize text-sm"
          numberOfLines={1}
        >
          {bodyPart}
        </Text>
      </View>

      <TouchableOpacity onPress={handleAddExercise} style={{ flexShrink: 0 }}>
        <FontAwesome5
          size={24}
          color="#ffffff"
          name="plus-square"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export { ExerciseCard };
