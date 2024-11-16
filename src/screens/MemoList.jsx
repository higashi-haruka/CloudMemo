import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// リスト表示したい配列のデータ
const MEMO = [
  {
    id: '1',
    text: 'First Item',
    date: '2024/01/01',
  },
  {
    id: '2',
    text: 'Second Item',
    date: '2024/01/01',
  },
  {
    id: '3',
    text: 'Third Item',
    date: '2024/01/01',
  },
  {
    id: '4',
    text: '4th Item',
    date: '2024/01/01',
  },
];

export default function MemoList({ navigation, route }) {
  // パラメータの取得
  const userId = route.params.userId;
  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name='logout' size={24} color='#5dacbd' />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  // リストのレンダリング
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MemoEdit', { userId: 'test@mail.com' });
            }}
          >
            <Text style={styles.title}>{item.text}</Text>
            <Text style={styles.title}>{item.date}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.delete}>
          <MaterialIcons name='delete' size={30} color='#555' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MEMO}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />

      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name='add-box' size={40} color='black' />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#d4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5dacbd',
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  headertext: {
    alignSelf: 'center',
    color: 'white', // 文字の色
    fontWeight: 'bold', // 文字の太さs
    fontSize: 22, // 文字の大きさ
  },
  logoutButon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 100,
    borderWidth: 2,
    borderRadius: 6, // 要素の境界の外側の角を丸める
  },

  item: {
    width: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 6, // 要素の境界の外側の角を丸める
    padding: 20,
    marginVertical: 5,
  },
  title: {
    fontSize: 22,
  },

  addButton: {
    position: 'absolute', // これを設定することで、他のコンポーネントに邪魔されず固定することができます。
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40, // 要素が起点の下からどれだけ離れているかを示します
    right: 20, // 要素が起点の右からどれだけ離れているかを示します
    height: 50,
    width: 50,
  },
});
