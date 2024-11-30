import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MemoList({ navigation, route }) {
  // useStateの宣言
  const [memoList, setMemoList] = useState('');

  // パラメータの取得
  const userId = route.params.userId;

  //ログアウトアラート
  const logoutAlert = () => {
    Alert.alert('ログアウトしますか？', '', [
      { text: 'はい', onPress: () => logout() },
      {
        text: 'キャンセル',
        onPress: () => console.log('ログアウトをキャンセルしました。'),
        style: 'cancel',
      },
    ]);
  };

  //ログアウト関数
  const logout = () => {
    console.log('ログアウトしました。');
    navigation.goBack();
  };

  //削除アラート
  const memoDelete = async (docId) => {
    Alert.alert('削除しますか？', '', [
      { text: 'はい', onPress: () => onDelete(docId) },
      {
        text: 'キャンセル',
        onPress: () => console.log('削除をキャンセルしました。'),
        style: 'cancel',
      },
    ]);
  };
  // メモ削除関数
  const onDelete = async (docId) => {
    try {
      // Firestore内の指定ドキュメントを参照
      const docRef = doc(db, 'users', userId, 'memos', docId);
      // ドキュメントを削除
      await deleteDoc(docRef);
      console.log('ドキュメントの削除に成功しました!');
    } catch (error) {
      console.error('ドキュメントの削除に失敗しました: ', error);
    }
  };
  // リストのレンダリング
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.memo}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MemoEdit', { userId: userId }, { id: item.docId });
            }}
          >
            <Text style={styles.title}>{item.memo}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.delete} onPressIn={() => memoDelete(item.docId)}>
          <MaterialIcons name='delete' size={30} color='#555' />
        </TouchableOpacity>
      </View>
    );
  };

  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPressIn={logoutAlert}>
            <MaterialCommunityIcons name='logout' size={24} color='#5dacbd' />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  // メモリストの取得
  useEffect(() => {
    // Firestoreのメモコレクションを参照
    const memosCollectionRef = collection(db, 'users', userId, 'memos');
    // データを日付で並び替えてクエリを作成
    const memosQuery = query(memosCollectionRef, orderBy('date', 'desc'));

    // Firestoreのリアルタイム更新を利用してデータを取得
    const unsubscribe = onSnapshot(memosQuery, (querySnapshot) => {
      // 取得したドキュメントを配列に変換
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const docId = doc.id;
      // 状態管理でメモリストを更新
      setMemoList(docs);
    });
    // クリーンアップで購読を解除
    return unsubscribe;
  }, [userId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={memoList}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('MemoEdit', { userId: userId }, { id: '' });
        }}
      >
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
    width: 350,
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
    height: 30,
  },
  date: {
    fontSize: 18,
    alignItems: 'center',
  },
  memo: { width: 250, height: 60 },

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
