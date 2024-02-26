import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Portal,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";

export default function Todo() {
  const [texto, setTexto] = useState("");
  const [tarefa, setTarefa] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [estaFinalizado, setFinalizado] = useState(false);
  const [textoEditado, setTextoEditado] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.divItem}>
        <Text
          style={[
            styles.itemLista,
            item.status && { textDecorationLine: "line-through" },
          ]}
        >
          {item.texto}
        </Text>
        <View style={styles.divIcons}>
          <TouchableOpacity onPress={() => editarTarefa(item.id)}>
            <Ionicons name="create" size={24} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
            <Ionicons
              name={item.status ? "checkmark-circle" : "ellipse"}
              size={24}
              color="#a6f1a6"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const addTarefa = () => {
    if (texto === "") {
      return alert("Digite uma tarefa");
    } else {
      const novaTarefa = {
        id: idCounter,
        texto: texto,
        status: estaFinalizado,
      };
      setTarefa([...tarefa, novaTarefa]);
      setTexto("");
      setIdCounter(idCounter + 1);
    }
  };

  const deletarTarefa = (id) => {
    setTarefa(tarefa.filter((item) => item.id !== id));
  };

  const concluirTarefa = (id) => {
    setTarefa(
      tarefa.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const editarTarefa = (id) => {
    showModal();
    setTextoEditado(tarefa[id].texto);
    setEditandoId(id);
  };

  const confirmarEdicaoTarefa = () => {
    if (textoEditado === "") {
      return alert("Digite uma tarefa");
    } else {
      for (let i = 0; i < tarefa.length; i++) {
        if (tarefa[i].id === editandoId) {
          tarefa[i].texto = textoEditado;
          break;
        }
      }
      setTarefa([...tarefa]); // Atualizando a lista de tarefas
      setTextoEditado("");
      setEditandoId(null);
      hideModal();
    }
  };

  return (
    <ImageBackground
      source={require("./assets/background-login.webp")}
      style={styles.background}
    >
      <View style={styles.container}>
        <PaperProvider>
          <Text style={styles.greeting}>Olá, usuário</Text>
          <Text style={styles.subtitle}>O que você tem que fazer hoje?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite uma tarefa"
              value={texto}
              onChangeText={setTexto}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addTarefa}>
              <Ionicons name="add" size={30} color="#C0C0C0" />
            </TouchableOpacity>
          </View>

          <Text style={styles.taskListTitle}>Sua lista de tarefas:</Text>
          <FlatList
            data={tarefa}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: "white",
                alignItems: "center",
                padding: 50,
              }}
            >
              <TextInput
                style={styles.inputModal}
                placeholder="Editar tarefa"
                value={textoEditado}
                onChangeText={setTextoEditado}
              />
              <TouchableOpacity
                style={styles.botaoModal}
                onPress={confirmarEdicaoTarefa}
              >
                <Text style={styles.textoBotaoModal}>Confirmar</Text>
              </TouchableOpacity>
            </Modal>
          </Portal>
        </PaperProvider>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 20,
    paddingTop: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderColor: "gray",
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  taskInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  addBtn: {
    marginLeft: 10,
    borderRadius: 50,
    padding: 5,
    backgroundColor: "white",
  },
  taskListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  divItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "gray"
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  itemLista: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoModal: {
    borderRadius: 15,
    backgroundColor: "purple",
  },
  textoBotaoModal: {
    padding: 12,
    color: "white",
    fontWeight: "bold",
  },
  inputModal: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
