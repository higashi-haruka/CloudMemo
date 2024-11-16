import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // ログインと新規登録に使用するコンポーネント

import { Alert } from 'react-native'; // アラートを表示するコンポーネント

export default function Login({ navigation }) {
  // useStateの宣言
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  // ユーザの新規登録を行う関数
  const createUser = () => {
    console.log(`${mail},${pass}`);
    createUserWithEmailAndPassword(auth, mail, pass)
      .then(() => {
        // 成功時の処理
        navigation.navigate('MemoList', { userId: 'test@mail.com' });
        console.log('新規登録しました!');
      })
      .catch((err) => {
        // 失敗時の処理
        console.log(err.code);
        Alert.alert('エラー');
      });
  };
  // ユーザのログインを行う関数
  const loginUser = () => {
    console.log(`${mail},${pass}`);
    signInWithEmailAndPassword(auth, mail, pass)
      .then(() => {
        // 成功時の処理
        navigation.navigate('MemoList', { userId: 'test@mail.com' });
        console.log('ログインしました!');
      })
      .catch((err) => {
        // 失敗時の処理
        console.log(err.code);
        Alert.alert('エラー');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          value={mail}
          autoCorrect={false}
          onChangeText={(text) => {
            setMail(text);
          }}
          placeholder='メールアドレス'
        />
        <TextInput
          style={styles.textInput}
          value={pass}
          autoCorrect={false}
          onChangeText={(text) => {
            setPass(text);
          }}
          placeholder='パスワード'
        />
      </View>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={loginUser}>
        <Text style={styles.loginText}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.createUserText}>新規登録</Text>
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
  },
  inputArea: {
    margin: 20, // 要素の外側の余白
  },
  textInput: {
    margin: 7,
    paddingHorizontal: 10, // 要素の内側の余白（左右）
    height: 43, // 高さ
    width: 320, // 幅
    borderRadius: 6, // 要素の境界の外側の角を丸める
    backgroundColor: '#eee',
    fontSize: 18, // 文字の大きさ
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    width: 300,
    backgroundColor: '#F5F5F6',
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#5dacbd',
    marginBottom: 10,
  },
  loginText: {
    color: 'white', // 文字の色
    fontWeight: 'bold', // 文字の太さ
    fontSize: 16,
  },
  createUserText: {
    color: '#555',
  },
});
