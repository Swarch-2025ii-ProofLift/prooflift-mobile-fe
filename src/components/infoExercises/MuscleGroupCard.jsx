import { View, Text } from 'react-native'

function MuscleGroupCard({ muscleGroup }) {
  return (
    <View
      className="w-36 h-10 flex justify-center items-center rounded-xl font-medium bg-tertiary"
      style={{ flexShrink: 0 }}
    >
      <Text className="text-primary">{muscleGroup}</Text>
    </View>
  )
}

export { MuscleGroupCard }
