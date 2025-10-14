import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header.jsx';
import { MuscleGroupCard } from '../components/infoExercises/MuscleGroupCard.jsx';

import imagen from '../../assets/Images/gym-proof.jpg';

export function InfoExercises({  }) {
//   const { exercise } = route.params; // lo recibes desde la navegación

//   const handleAddToRoutine = () => {
//     console.log("Agregar a rutina:", exercise.name);
//   };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1 flex-col px-5 py-6 gap-6"
        contentContainerClassName="pb-32"
        contentContainerStyle={{ 
          gap: 26,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Nombre del ejercicio */}
        <Text className="h1__title">
          Press de Banca
        </Text>

        {/* Descripción */}
        <Text className="text-gray-300">
          Press de banca hjkdfhaskjdlfbajksldfbasjklfbasjikhfgbashjklfgbasjlhkfgasjhdbv
        </Text>

        {/* Imagen */}
        <Image
          source={imagen}
          className="w-full h-60 rounded-2xl"
          resizeMode="cover"
        />

        {/* Técnica */}  
        <View>
            <Text className="infoExercise__subtitle">Técnica</Text>
        </View>

        <View>
            <Text className="infoExercise__subtitle">Músculos trabajados:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <MuscleGroupCard muscleGroup="Pecho" />
            </ScrollView>
        </View>


        {/* Dificultad */}
          <View className="">
            <Text className="infoExercise__subtitle">
              Nivel de dificultad
            </Text>
            <Text className="px-3 py-2 rounded-xl bg-red-600 text-white self-start">
              Medio
            </Text>
          </View>
      </ScrollView>
      <Header />
    </SafeAreaView>
  );
}

