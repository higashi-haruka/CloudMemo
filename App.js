import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login'; // ログイン画面
import MemoList from './src/screens/MemoList'; // メモ一覧画面
import MemoEdit from './src/screens/MemoEdit'; // メモ編集画面

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name='MemoList'
          component={MemoList}
          options={{
            title: 'メモ一覧',
            headerStyle: {
              backgroundColor: '#b0e0e6',
            },
            headerTintColor: '#555',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackVisible: false,
            gestureEnabled: false,
            headerTitleAlign: 'center',
            headerRight: () => <MaterialCommunityIcons name='logout' size={24} color='black' />,
          }}
        />
        <Stack.Screen
          name='MemoEdit'
          component={MemoEdit}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#b0e0e6',
            },
            headerRight: () => <MaterialIcons name='save-alt' size={24} color='black' />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
