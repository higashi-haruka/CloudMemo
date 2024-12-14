import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../firebase';
import { Text, Button, useTheme } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import rogo from '../../assets/logo.png';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // ログインと新規登録に使用するコンポーネント

import { Alert } from 'react-native'; // アラートを表示するコンポーネント

export default function Login({ navigation }) {
  // useStateの宣言 （状態管理）
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const toggleSecureEntry = () => {
    setIsSecureEntry(!isSecureEntry);
  };

  const theme = useTheme();

  //自動ログイン機能
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const resultMail = SecureStore.getItemAsync('mail');
        const resultPass = SecureStore.getItemAsync('pass');
        if (resultMail && resultPass) {
          setMail(resultMail);
          setPass(resultPass);

          alert("🔐 Here's your value 🔐 \n" + resultMail);
          signInWithEmailAndPassword(auth, resultMail, resultPass);
          navigation.navigate('MemoList', { userId: resultMail });
          console.log('自動ログインしました!');
        }
      } catch {
        alert('No values stored under that key.');
      } finally {
        setIsLoading(false);
      }
    };
    autoLogin();
  }, []);

  // ユーザの新規登録を行う関数
  const createUser = () => {
    console.log(`${mail},${pass}`);
    createUserWithEmailAndPassword(auth, mail, pass);
    try {
      // 成功時の処理
      SecureStore.setItemAsync('mail', mail);
      SecureStore.setItemAsync('pass', pass);
      navigation.navigate('MemoList', { userId: mail });
      console.log('新規登録しました!');
    } catch (err) {
      // 失敗時の処理
      console.log(err);
      Alert.alert('エラー');
    }
  };
  // ユーザのログインを行う関数
  const loginUser = () => {
    console.log(`${mail},${pass}`);
    signInWithEmailAndPassword(auth, mail, pass);

    try {
      // 成功時の処理
      SecureStore.setItemAsync('mail', mail);
      SecureStore.setItemAsync('pass', pass);
      navigation.navigate('MemoList', { userId: mail });
      console.log('ログインしました!');
    } catch (err) {
      // 失敗時の処理
      console.log(err.code);
      Alert.alert('エラー');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.rogo} source={rogo} alt='picture' />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          value={mail}
          autoCorrect={false}
          onChangeText={(text) => {
            setMail(text);
          }}
          placeholder='メールアドレス'
          autoCapitalize='none'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={pass}
            autoCorrect={false}
            onChangeText={(text) => {
              setPass(text);
            }}
            placeholder='パスワード'
            secureTextEntry={isSecureEntry}
          />
          <TouchableOpacity style={styles.iconContainer} onPress={toggleSecureEntry}>
            <Ionicons name={isSecureEntry ? 'eye-sharp' : 'eye-off-sharp'} size={24} color='#555' />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button
        icon='teddy-bear'
        mode='contained'
        style={[styles.button, styles.loginButton]}
        onPress={loginUser}
      >
        ログイン
      </Button>
      <Button icon='teddy-bear' mode='contained' style={[styles.button]} onPress={createUser}>
        新規登録
      </Button> */}

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
  rogo: {
    width: 150,
    height: 150,
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
    fontSize: 15, // 文字の大きさ
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
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
