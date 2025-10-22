import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header.jsx';
import { MuscleGroupCard } from '../components/infoExercises/MuscleGroupCard.jsx';
import { exercisesAPI } from "../API/exercises";

export function InfoExercises({  }) {
  const route = useRoute();
  const { id } = route.params || {};

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadExercise = async () => {
    try {
      setLoading(true);
      const data = await exercisesAPI.getExercise(id);
      setExercise(data);
    } catch (error) {
      setError("No se pudo cargar el ejercicio", error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    loadExercise();
    }
  }, [id]);

  const getPlaceholderImage = (group) => {
    const placeholders = {
      'pecho': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
      'espalda': 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop',
      'piernas': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&h=600&fit=crop',
      'hombros': 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&h=600&fit=crop',
      'brazos': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
      'core': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    };
    return placeholders[group?.toLowerCase()] || placeholders['piernas'];
  };

  const getImageUrl = () => {
    return getPlaceholderImage(exercise?.group || exercise?.muscleGroup || 'piernas');
  };


  const getLevelBadge = (level) => {
  const badges = {
    'principiante': { color: 'bg-green-600', text: 'Recomendado para empezar' },
    'intermedio': { color: 'bg-amber-600', text: 'Requiere experiencia' },
    'avanzado': { color: 'bg-red-600', text: 'Solo para expertos' }
  };
  return badges[level] || badges['principiante'];
  };

  if(loading) {
    return(
      <SafeAreaView className='flex-1 bg-background justify-center items-center'>
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Cargando ejercicio...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1 flex-col px-5 py-6 gap-12"
        contentContainerClassName="pb-32"
        contentContainerStyle={{ 
          gap: 26,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Nombre del ejercicio */}
        <Text className="h1__title">
          {exercise.name}
        </Text>

        {/* Descripción */}
        <Text className="text-gray-300 ">
          {exercise.description || `${exercise.name} es un ejercicio fundamental para el desarrollo de ${exercise.group}, diseñado para mejorar tanto la fuerza como la técnica de ejecución.`}
        </Text>

        {/* Imagen */}
        <Image
          source={{ uri: getImageUrl() }}
          className="w-full h-60 rounded-2xl"
          resizeMode="cover"
        />

        {/* Técnica */}  
        {exercise.cues && exercise.cues.length > 0 && (
          <View>
            <Text className="infoExercise__subtitle">
              Técnica 
            </Text>
            {exercise.cues.map((cue, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <View className="w-7 h-7 bg-primary rounded-full flex items-center justify-center mr-3">
                  <Text className="text-background font-bold">{index + 1}</Text>
                </View>
                <Text className="text-secondary flex-1 mt-1">{cue}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Músculos */}
        <View>
          <Text className="infoExercise__subtitle">
            Músculos trabajados
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {exercise.muscles?.map((muscle, index) => (
              <MuscleGroupCard key={index} muscleGroup={muscle} />
            ))}
          </ScrollView>
        </View>

        {/* Equipamiento */}
        {exercise.equipment && exercise.equipment.length > 0 && (
            <View>
              <Text className="infoExercise__subtitle">
              Equipamiento necesario
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {exercise.equipment.map((item, index) => (
                <MuscleGroupCard key={index} muscleGroup={item} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Nivel */}
        {exercise.level && (
          <View className="mt-4">
            <Text className="text-xl font-semibold text-white mb-3">
              Nivel de dificultad
            </Text>
            <View className="flex-row items-center gap-3">
              <MuscleGroupCard muscleGroup={exercise.level} />
              <View
                className={`px-3 py-2 rounded-xl ${getLevelBadge(exercise.level).color}`}
              >
                <Text className="text-white">
                  {getLevelBadge(exercise.level).text}
                </Text>
              </View>
            </View>
          </View>
        )}

       </ScrollView>
      <Header />
    </SafeAreaView>
  );
}

