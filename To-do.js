import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Todo() {
  const [texto, setTexto] = useState('');
  const [tarefa, setTarefa] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [estaFinalizado, setFinalizado] = useState(false);


  const renderItem = ( {item} ) => {
           
      return (
      <View style={styles.divItem}>
        <Text style={[styles.itemLista, item.status && { textDecorationLine: 'line-through'}]}>
          {item.texto}
        </Text>
        <View style={styles.divIcons}>
        <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
          <Ionicons name={item.status ? "checkmark-circle" : "ellipse"} size={24} color="green" />
        </TouchableOpacity>
        </View>
      </View>
  )};

  const addTarefa = () => {

    if (texto === '') {
      return alert('Digite uma tarefa');
    } else {

      const novaTarefa = { id: idCounter, texto: texto, status: estaFinalizado };
      
      setTarefa([...tarefa, novaTarefa]);
      setTexto('');
      setIdCounter(idCounter + 1);
    }
  };

  const deletarTarefa = (id) => {
          setTarefa(tarefa.filter(item => item.id !== id ))
  };

  // concluido - procurar sobre o map depos
  const concluirTarefa = (id) => {
          for (i = 0; i < tarefa.length; i++){
          if (tarefa[i].id === id){
              tarefa[i].status = !tarefa[i].status
              setTarefa([...tarefa])
              break;
          }
          }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do dia</Text>
      <FlatList
        data={tarefa}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={texto}
          onChangeText={setTexto}
          />
        <TouchableOpacity
          style={styles.addBtn} 
          onPress={addTarefa}>
          <Ionicons name="add" size={30} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 85
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  addBtn: {
    marginLeft: 10,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'white',
  },
  divItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemLista: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divIcons: {
    flexDirection: 'row',
    paddingLeft: 5,
  }
});
