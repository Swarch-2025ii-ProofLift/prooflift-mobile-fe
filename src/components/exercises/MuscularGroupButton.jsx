import { TouchableOpacity, Text } from "react-native"

function MuscularGroupButton({ groupName, isSelected = false, onClick }) {
  return (
    <TouchableOpacity
      className={`w-24 h-10 rounded-2xl justify-center items-center ${
        isSelected 
          ? 'bg-background-secondary' 
          : 'bg-primary'
      }`}
      onPress={() => onClick?.(groupName)}
      activeOpacity={0.7}  // ✅ Efecto al presionar
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