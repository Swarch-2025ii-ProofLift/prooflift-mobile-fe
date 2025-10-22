// ...existing code...
import { TouchableOpacity, Text } from "react-native"

function MuscularGroupButton({ groupName, isSelected = false, onClick, onPress }) {
  // allow both names for backwards compat
  const handlePress = onPress ?? onClick;

  return (
    <TouchableOpacity
      className={`w-24 h-10 rounded-2xl justify-center items-center ${
        isSelected 
          ? 'bg-background-secondary' 
          : 'bg-primary'
      }`}
      onPress={() => handlePress?.(groupName)}
      activeOpacity={0.7}
    >
      <Text 
        className={`font-bold ${
          isSelected 
            ? 'text-primary' 
            : 'text-background'
        }`}
      >
        {groupName}
      </Text>
    </TouchableOpacity>
  )
}

export { MuscularGroupButton }
// ...existing code...