import { useState, useEffect } from "react";
import {View, TextInput } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  // Búsqueda en tiempo real con debounce (solo si no se ha enviado con Enter)
  useEffect(() => {
    if (isSearchSubmitted) return; // No buscar en tiempo real si ya se envió con Enter
    
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        onSearch(query.trim());
      } else if (query.trim() === '') {
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch, isSearchSubmitted]);

  const handleSubmit = () => {
    const searchTerm = query.trim();
    
    if (searchTerm.length >= 2) {
      onSearch(searchTerm);
      setQuery(''); // Limpiar el input
      setIsSearchSubmitted(true); // Marcar que se envió la búsqueda
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
    
    // Si el usuario empieza a escribir de nuevo, volver al modo tiempo real
    if (isSearchSubmitted && text.length > 0) {
      setIsSearchSubmitted(false);
    }
    
    // Si borra todo manualmente, limpiar búsqueda solo si no está en modo "enviado"
    if (text.trim() === '' && !isSearchSubmitted) {
      onSearch('');
    }
  };


  return (
    <View onSubmit={handleSubmit} className="relative w-11/12 bg-tertiary rounded-2xl">
      <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <FontAwesome5 
          name="search"  
          size={18}
          color="#6B7280" 
        />
      </View>
      <TextInput
        className='h-12 pl-10 pr-8 text-secondary bg-transparent
                rounded-2xl border border-transparent 
                placeholder-gray-400' 
        placeholder="Buscar ejercicios"
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  )
}

export { SearchBar }