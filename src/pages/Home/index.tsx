import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { useDatabaseConnection } from '../../database';
import { useFetchTodos } from '../../hooks';

const Home = () => {
  const { todosRepository, categoriesRepository } = useDatabaseConnection();
  const { todos, isLoading, fetchTodos } = useFetchTodos();

  console.log(JSON.stringify(todos, null, 2));

  const handleCreateTodo = async () => {
    try {
      const todo = await todosRepository.create({
        name: 'name',
        description: 'description',
        categories: [],
      });

      const category01 = await categoriesRepository.create({
        name: 'category 01',
        description: 'description',
        todo,
      });

      const category02 = await categoriesRepository.create({
        name: 'category 02',
        description: 'description',
        todo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initialLoad = () => {
    try {
      fetchTodos();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      initialLoad();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleCreateTodo}
      >
        <Text style={{ color: 'white' }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
