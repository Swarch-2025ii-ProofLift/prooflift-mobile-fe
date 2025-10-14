import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

function FormInput({ children, buttonText, onSubmit, navigation }) {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const [buttonContent, setButtonContent] = useState(buttonText);

  return (
    <View className="items-center gap-6 w-full">
      {React.Children.map(children, child =>
        React.cloneElement(child, { control, errors, watch })
      )}
      <TouchableOpacity
        className="button"
        onPress={handleSubmit((data) => onSubmit(data, setButtonContent))}
      >
        <Text className="button__text">{buttonContent}</Text>
      </TouchableOpacity>
    </View>
  );
}

export { FormInput };

