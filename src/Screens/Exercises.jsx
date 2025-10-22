import { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/exercises/SearchBar";
import { MuscularGroupButton } from "../components/exercises/MuscularGroupButton";
import { ExerciseCard } from "../components/exercises/ExerciseCard";
import { exercisesAPI } from "../API/exercises";

const muscleGroups = ["Todos", "Pecho", "Espalda", "Piernas", "Hombros", "Brazos", "Core"];

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  
  //Estados para paginación
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20; // Ajusta según tu backend

  //Cargar ejercicios desde la API
  const loadExercises = async (pageNum = 1, isLoadMore = false) => {
    if (isLoadMore && !hasMore) return; // No cargar si no hay más

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await exercisesAPI.getExercises({
        group: selectedGroup,
        q: searchQuery,
        page: pageNum,
        limit: ITEMS_PER_PAGE,
      });

      const newItems = data.items || data;
      
      if (isLoadMore) {
        setExercises(prev => [...prev, ...newItems]);
      } else {
        setExercises(newItems);
      }

      //Verificar si hay más páginas
      if (data.total_pages) {
        setHasMore(pageNum < data.total_pages);
      } else {
        // Si no viene total_pages, asumir que hay más si viene un array completo
        setHasMore(newItems.length === ITEMS_PER_PAGE);
      }

    } catch (error) {
      console.error("Error cargando ejercicios:", error);
      if (!isLoadMore) setExercises([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  //Cargar al montar el componente
  useEffect(() => {
    loadExercises(1, false);
  }, []);

  // Recargar cuando cambie grupo o búsqueda (reset de paginación)
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadExercises(1, false);
  }, [selectedGroup, searchQuery]);

  //Cargar más ejercicios (scroll infinito)
  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadExercises(nextPage, true);
    }
  }, [page, loadingMore, hasMore]);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  //Renderizar cada ejercicio
  const renderExerciseItem = ({ item }) => (
    <ExerciseCard
      id={item.id || item._id}
      title={item.name || "Ejercicio sin nombre"}
      bodyPart={item.group || "Sin grupo"}
    />
  );

  

  //Footer del FlatList (indicador de carga)
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  };

  //Componente vacío
  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text style={{ color: '#9CA3AF' }}>No se encontraron ejercicios</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <View className="w-11/12 self-center mt-4">
        <Text className="h1__title text-white">Explorar Ejercicios</Text>
      </View>

      <View className="items-center py-4">
        <SearchBar onSearch={handleSearch} />
      </View>

      <View className="h-20 px-4 py-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', gap: 12 }}
        >
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

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item, index) => {
            const uniqueKey = item.id 
              ? `exercise-${item.id}-${index}` 
              : `exercise-noId-${item.name}-${index}`;
            return uniqueKey;
          }}
          contentContainerStyle={{ 
            flexGrow: 1, 
            alignItems: 'center', 
            gap: 24, 
            paddingBottom: 120,
            paddingTop: 10 
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} 
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Header />
    </SafeAreaView>
  );
}

export { Exercises };