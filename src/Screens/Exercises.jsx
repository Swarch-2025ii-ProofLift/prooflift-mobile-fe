import { View, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../components/layout/Header.jsx'
import { SearchBar } from '../components/exercises/SearchBar.jsx'
import { MuscularGroupButton } from '../components/exercises/MuscularGroupButton.jsx'
import { ExerciseCard } from '../components/exercises/ExerciseCard.jsx'

const muscleGroups = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core'];
const selectedGroup = 'Todos';

function Exercises() {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <View className="w-11/12 self-center mt-4">
        <Text className="h1__title">Explorar Ejercicios</Text>
      </View> 
      <View className="items-center py-4">
        <SearchBar onSearch={(query) => console.log(query)} />
      </View>
      <View className='h-auto w-11/12 self-center'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} 
            className="py-4"
            contentContainerClassName="justify-center gap-3">
          {muscleGroups.map(group => (
            <MuscularGroupButton 
              key={group}
              groupName={group} 
              isSelected={selectedGroup === group}
              onPress={() => handleGroupSelect(group)}
            />
          ))}
        </ScrollView>
      </View>

        <ScrollView 
          className="flex-1"
          contentContainerClassName="items-center gap-6 pb-32"
        >
          <ExerciseCard />
          <ExerciseCard />
          <ExerciseCard />
          <ExerciseCard />
          <ExerciseCard />
          <ExerciseCard />
        </ScrollView>
      <Header />
    </SafeAreaView>
  )
}

export { Exercises }
