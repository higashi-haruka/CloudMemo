import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3DarkTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
// import App from './src/App';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login'; // ログイン画面
import MemoList from './src/screens/MemoList'; // メモ一覧画面
import MemoEdit from './src/screens/MemoEdit'; // メモ編集画面

const Stack = createNativeStackNavigator();
// const customDarkTheme = {
//   ...MD3DarkTheme,
//   colors: {
//     ...MD3DarkTheme.colors,
//     primary: '#ffffff', // プライマリカラー
//     background: '#000000', // 背景色
//     surface: '#000000', // サーフェイスの色
//     onSurface: '#ffffff', // サーフェイス上のテキスト・アイコンの色
//   },
// };

export default function App() {
  return (
    // <PaperProvider>
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
