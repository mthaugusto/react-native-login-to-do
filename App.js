import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import Todo from './To-do';

export default function TodoList() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [botao, setBotao] = useState('Entrar');
  const [styleBotao, setStyleBotao] = useState(styles.entrarContainer);
  const [autenticado, setAutenticado] = useState(false);

  const logar = () => {
    setEmail('');
    setSenha('');
    if (email === '') {
      Alert.alert("Por favor, digite um e-mail")
    } else {
      if ((email === 'mthaugusto@hotmail.com' || email === 'Mthaugusto@hotmail.com') && senha === 'teste') {
        setBotao('Logando, aguarde...');
        setStyleBotao({ ...styles.entrarContainer, backgroundColor: 'green' });
        setTimeout(() => {
          setAutenticado(true);
        }, 3000);
      } else {
        setStyleBotao({ ...styles.entrarContainer, backgroundColor: 'red' });
        setBotao('Senha errada... tente novamente.');
        setTimeout(() => {
          setBotao('Entrar');
          setStyleBotao(styles.entrarContainer);
        }, 3000);
      }
    }
  };

    if (autenticado) {
     return <Todo/>;
  }
  
  return (
    <View style={styles.containerMaior}>
      <Image style={styles.icon} source={require('./assets/login-app-icon.png')} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.esqueceuASenha}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styleBotao} onPress={logar}>
        <Text style={styles.entrar}>{botao}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMaior: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
  },
  forgotPasswordContainer: {
    width: '80%',
    marginTop: 10,
  },
  esqueceuASenha: {
    color: '#007bff',
    textAlign: 'right',
  },
  entrarContainer: {
    backgroundColor: 'blue',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
  },
  entrar: {
    color: 'white',
    textAlign: 'center',
  },
});
