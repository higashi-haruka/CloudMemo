import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import moment from 'moment'; // 日付を扱うためのライブラリ

import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore'; // 保存に必要な関数

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MemoEdit({ navigation, route, id }) {
  // パラメータの取得;
  const userId = route.params.userId;
  // const docId = id.params.id;

  // useStateの宣言
  const [memo, setMemo] = useState('');

  // 新規作成
  const memoCreate = async () => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss'); // 現在の日付を取得
    try {
      const memosCollectionRef = collection(db, 'users', userId, 'memos'); // 保存先のコレクションを指定

      await addDoc(memosCollectionRef, { memo, date }); // データを Firestore に保存
      console.log('新規メモ作成完了');
      navigation.goBack(); // 前の画面に戻る
    } catch (err) {
      console.error('新規メモ作成に失敗しました:', err); // エラーが発生した場合に表示
    }
  };

  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPressIn={memoCreate}>
            <MaterialIcons name='save-alt' size={24} color='black' />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, memoCreate]);

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        style={styles.textInput}
        placeholder='メモ編集内容'
        value={memo}
        autoCorrect={false}
        onChangeText={(text) => {
          setMemo(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#d4e4e7',
    alignItems: 'center',

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 100,
    borderWidth: 2,
    borderRadius: 6, // 要素の境界の外側の角を丸める
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 25, // 文字の大きさ
    height: '100%',
    width: 400,
    textAlignVertical: 'top',
  },
});
