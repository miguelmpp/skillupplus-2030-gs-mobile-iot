import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loadUserProfile,
  UserProfile,
} from "../src/storage/authStorage";

type Trilha = {
  id: string;
  nome: string;
  area: string;
  nivel: string;
  metaHoras: number;
  cargaSemanal: number;
};

const TRILHAS_STORAGE_KEY = "@skillupplus:trilhas";

function getAreaInteresseLabel(area: string | undefined) {
  switch (area) {
    case "ia":
      return "Inteligência Artificial & Dados";
    case "dev":
      return "Desenvolvimento de Software";
    case "ux":
      return "Experiência do Usuário (UX/UI)";
    case "esg":
      return "Sustentabilidade & ESG";
    default:
      return "Desenvolvimento profissional";
  }
}

export default function TrilhasScreen() {
  const [perfil, setPerfil] = useState<UserProfile | null>(null);

  const [nome, setNome] = useState("");
  const [area, setArea] = useState("");
  const [nivel, setNivel] = useState<"Iniciante" | "Intermediário" | "Avançado" | "">("");
  const [metaHoras, setMetaHoras] = useState("");
  const [cargaSemanal, setCargaSemanal] = useState("");
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega perfil e trilhas ao abrir a tela
  useEffect(() => {
    async function carregarDados() {
      try {
        const profile = await loadUserProfile();
        if (profile) {
          setPerfil(profile);
        }

        const stored = await AsyncStorage.getItem(TRILHAS_STORAGE_KEY);
        if (stored) {
          const parsed: Trilha[] = JSON.parse(stored);
          setTrilhas(parsed);
        }
      } catch (error) {
        console.log("Erro ao carregar dados na tela de Trilhas:", error);
        Alert.alert(
          "Ops...",
          "Não foi possível carregar suas trilhas salvas. Tente novamente mais tarde."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  async function salvarTrilhasNoStorage(lista: Trilha[]) {
    try {
      await AsyncStorage.setItem(TRILHAS_STORAGE_KEY, JSON.stringify(lista));
    } catch (error) {
      console.log("Erro ao salvar trilhas no AsyncStorage:", error);
      Alert.alert(
        "Aviso",
        "A trilha foi cadastrada, mas não foi possível salvá-la no armazenamento local."
      );
    }
  }

  function handleSelecionarNivel(valor: "Iniciante" | "Intermediário" | "Avançado") {
    setNivel(valor);
  }

  async function handleAdicionarTrilha() {
    if (!nome.trim() || !area.trim() || !nivel || !metaHoras.trim() || !cargaSemanal.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de salvar.");
      return;
    }

    const meta = Number(metaHoras.replace(",", "."));
    const carga = Number(cargaSemanal.replace(",", "."));

    if (isNaN(meta) || isNaN(carga) || meta <= 0 || carga <= 0) {
      Alert.alert(
        "Valores inválidos",
        "Meta de horas e carga semanal devem ser números maiores que zero."
      );
      return;
    }

    if (carga > meta) {
      Alert.alert(
        "Atenção",
        "A carga semanal não pode ser maior que a meta total de horas da trilha."
      );
      return;
    }

    const novaTrilha: Trilha = {
      id: String(Date.now()),
      nome: nome.trim(),
      area: area.trim(),
      nivel,
      metaHoras: meta,
      cargaSemanal: carga,
    };

    const atualizadas = [novaTrilha, ...trilhas];
    setTrilhas(atualizadas);
    await salvarTrilhasNoStorage(atualizadas);

    // limpa o formulário
    setNome("");
    setArea("");
    setNivel("");
    setMetaHoras("");
    setCargaSemanal("");

    Alert.alert("Trilha adicionada", "Sua trilha de upskilling foi registrada com sucesso!");
  }

  async function handleLimparTrilhas() {
    if (trilhas.length === 0) {
      Alert.alert("Nada para limpar", "Você ainda não cadastrou nenhuma trilha.");
      return;
    }

    Alert.alert(
      "Limpar trilhas",
      "Tem certeza que deseja apagar todas as trilhas cadastradas?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(TRILHAS_STORAGE_KEY);
              setTrilhas([]);
            } catch (error) {
              console.log("Erro ao limpar trilhas do AsyncStorage:", error);
              Alert.alert(
                "Erro",
                "Não foi possível apagar as trilhas. Tente novamente."
              );
            }
          },
        },
      ]
    );
  }

  const primeiroNome = perfil?.nome?.split(" ")[0] ?? "";
  const areaInteresseLabel = getAreaInteresseLabel(perfil?.areaInteresse);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trilhas de Upskilling</Text>

        {perfil ? (
          <Text style={styles.text}>
            Olá, <Text style={styles.highlight}>{primeiroNome}</Text>! Vamos planejar trilhas
            focadas em{" "}
            <Text style={styles.highlight}>{areaInteresseLabel}</Text>.
          </Text>
        ) : (
          <Text style={styles.text}>
            Monte sua trilha personalizada de desenvolvimento para o futuro do
            trabalho. Os dados ficam salvos localmente no seu aparelho.
          </Text>
        )}

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Nova trilha</Text>

          <Text style={styles.label}>Nome da trilha</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Fundamentos de IA para o trabalho"
            placeholderTextColor="#6b7280"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Área de interesse</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Inteligência Artificial, Dados, UX..."
            placeholderTextColor="#6b7280"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Nível atual</Text>
          <View style={styles.nivelRow}>
            {["Iniciante", "Intermediário", "Avançado"].map((opcao) => {
              const ativo = nivel === opcao;
              return (
                <TouchableOpacity
                  key={opcao}
                  style={[styles.nivelButton, ativo && styles.nivelButtonAtivo]}
                  onPress={() =>
                    handleSelecionarNivel(opcao as "Iniciante" | "Intermediário" | "Avançado")
                  }
                >
                  <Text
                    style={[styles.nivelButtonText, ativo && styles.nivelButtonTextAtivo]}
                  >
                    {opcao}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Meta total de horas da trilha</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 40"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={metaHoras}
            onChangeText={setMetaHoras}
          />

          <Text style={styles.label}>Carga semanal de estudo (horas)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 4"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={cargaSemanal}
            onChangeText={setCargaSemanal}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleAdicionarTrilha}>
            <Text style={styles.saveButtonText}>Salvar trilha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={handleLimparTrilhas}>
            <Text style={styles.clearButtonText}>Limpar todas as trilhas</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de trilhas cadastradas */}
        {carregando ? (
          <Text style={styles.loadingText}>Carregando trilhas salvas...</Text>
        ) : trilhas.length > 0 ? (
          <View style={styles.lista}>
            <Text style={styles.sectionTitle}>Minhas trilhas cadastradas</Text>

            {trilhas.map((trilha) => (
              <View key={trilha.id} style={styles.trilhaCard}>
                <Text style={styles.trilhaNome}>{trilha.nome}</Text>
                <Text style={styles.trilhaMeta}>
                  Área: <Text style={styles.trilhaValor}>{trilha.area}</Text>
                </Text>
                <Text style={styles.trilhaMeta}>
                  Nível: <Text style={styles.trilhaValor}>{trilha.nivel}</Text>
                </Text>
                <Text style={styles.trilhaMeta}>
                  Meta total:{" "}
                  <Text style={styles.trilhaValor}>{trilha.metaHoras}h</Text>
                </Text>
                <Text style={styles.trilhaMeta}>
                  Carga semanal:{" "}
                  <Text style={styles.trilhaValor}>{trilha.cargaSemanal}h/sem</Text>
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma trilha cadastrada ainda. Comece criando uma nova acima. 😊
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f9fafb",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 12,
  },
  highlight: {
    color: "#e5e7eb",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#0b1220",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#e5e7eb",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#020617",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f9fafb",
    fontSize: 14,
  },
  nivelRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  nivelButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 8,
    alignItems: "center",
  },
  nivelButtonAtivo: {
    backgroundColor: "#e11d48",
    borderColor: "#e11d48",
  },
  nivelButtonText: {
    fontSize: 12,
    color: "#e5e7eb",
  },
  nivelButtonTextAtivo: {
    fontWeight: "600",
    color: "#f9fafb",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#22c55e",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#022c22",
    fontSize: 15,
    fontWeight: "600",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  clearButtonText: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "500",
  },
  lista: {
    marginTop: 8,
  },
  trilhaCard: {
    backgroundColor: "#020617",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 12,
    marginBottom: 10,
  },
  trilhaNome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 4,
  },
  trilhaMeta: {
    fontSize: 13,
    color: "#9ca3af",
  },
  trilhaValor: {
    color: "#e5e7eb",
    fontWeight: "500",
  },
  loadingText: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
});
