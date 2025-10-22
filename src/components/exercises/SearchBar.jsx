import React, { useState, useEffect } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  // Debounce: búsqueda en tiempo real cuando no se envió con Enter
  useEffect(() => {
    if (isSearchSubmitted) return; // si se envió con Enter, no hacer búsquedas en tiempo real

    const id = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed.length >= 2) {
        onSearch(trimmed);
      } else if (trimmed === "") {
        onSearch("");
      }
    }, 300);

    return () => clearTimeout(id);
  }, [query, onSearch, isSearchSubmitted]);

  // Enviar búsqueda (al presionar "Buscar" en el teclado)
  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed.length >= 2) {
      onSearch(trimmed);
      // Opcional: limpiar input al enviar (descomenta si lo deseas)
      // setQuery('');
      setIsSearchSubmitted(true);
      Keyboard.dismiss(); // cierra el teclado
    }
  };

  // Cambio de texto en el input
  const handleInputChange = (text) => {
    setQuery(text);

    // Volver al modo "tiempo real" si empieza a escribir de nuevo
    if (isSearchSubmitted && text.length > 0) {
      setIsSearchSubmitted(false);
    }

    // Si borra todo y no estamos en "enviado", limpiar la búsqueda
    if (text.trim() === "" && !isSearchSubmitted) {
      onSearch("");
    }
  };

  return (
    <View className="relative w-11/12 bg-tertiary rounded-2xl flex-row items-center">
      <View className="absolute left-3 z-10">
        <FontAwesome5 name="search" size={18} color="#6B7280" />
      </View>

      <TextInput
        accessibilityLabel="Buscar ejercicios"
        className="h-12 pl-10 pr-8 text-secondary bg-transparent rounded-2xl"
        placeholder="Buscar ejercicios"
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

export { SearchBar };
