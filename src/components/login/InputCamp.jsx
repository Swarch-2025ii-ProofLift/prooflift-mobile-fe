import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

function InputCamp({ 
  type = "text", 
  placeholder, 
  name, 
  control, 
  errors, 
  validate, 
  icon
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Este campo es obligatorio",
        ...validate
      }}
      render={({ field: { onChange, value } }) => (
        <View className="w-10/12 mb-2">
          <View className="relative">
            {icon && (
              <FontAwesome5
                name={icon}
                size={20}
                color="background"
                style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 1 }}
              />
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor="#AAAAAA" 
              secureTextEntry={isPassword && !show}
              className="input"
            />
            {isPassword && (
              <TouchableOpacity
                className="icon__password"
                onPress={() => setShow(!show)}
              >
                <FontAwesome5 
                  name={show ? "eye-slash" : "eye"} 
                  size={20} 
                  color="background" 
                />
              </TouchableOpacity>
            )}
          </View>
          {errors?.[name] && (
            <Text className="text-red-500 text-sm">{errors[name].message}</Text>
          )}
        </View>
      )}
    />
  );
}

export { InputCamp };
