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
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  loadUserProfile,
  saveUserProfile,
  clearUserProfile,
  UserProfile,
} from "../src/storage/authStorage";

export default function LoginScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [areaInteresse, setAreaInteresse] = useState("ia");
  const [carregando, setCarregando] = useState(true);
  const [jaTemLoginSalvo, setJaTemLoginSalvo] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const profile = await loadUserProfile();
        if (profile) {
          setNome(profile.nome);
          setEmail(profile.email);
          setSenha(profile.senha);
          setAreaInteresse(profile.areaInteresse || "ia");
          setJaTemLoginSalvo(true);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  async function handleSalvar() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha nome, e-mail e senha.");
      return;
    }

    const profile: UserProfile = {
      nome: nome.trim(),
      email: email.trim(),
      senha: senha,
      areaInteresse,
    };

    try {
      await saveUserProfile(profile);
      setJaTemLoginSalvo(true);
      Alert.alert(
        "Login salvo",
        "Seus dados de acesso foram salvos neste dispositivo."
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível salvar o login. Tente novamente mais tarde."
      );
    }
  }

  async function handleLimpar() {
    if (!jaTemLoginSalvo) {
      Alert.alert("Nada para apagar", "Nenhum login salvo neste dispositivo.");
      return;
    }

    Alert.alert(
      "Apagar login",
      "Tem certeza que deseja remover o login salvo neste aparelho?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await clearUserProfile();
              setNome("");
              setEmail("");
              setSenha("");
              setAreaInteresse("ia");
              setJaTemLoginSalvo(false);
            } catch (error) {
              Alert.alert(
                "Erro",
                "Não foi possível apagar o login. Tente novamente."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login & Perfil Local</Text>
        <Text style={styles.text}>
          Esta tela simula o login do usuário para a plataforma SkillUpPlus
          2030. Os dados são armazenados localmente (AsyncStorage) para que o
          app “lembre” o perfil no próximo acesso.
        </Text>

        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#e5e7eb" />
            <Text style={styles.loadingText}>Carregando dados salvos...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            {jaTemLoginSalvo && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Login já salvo neste dispositivo</Text>
              </View>
            )}

            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#6b7280"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail institucional</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@fiap.com.br"
              placeholderTextColor="#6b7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha (local)</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite uma senha"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Text style={styles.label}>Área de interesse principal</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={areaInteresse}
                onValueChange={(value) => setAreaInteresse(value)}
                dropdownIconColor="#e5e7eb"
                style={styles.picker}
              >
                <Picker.Item
                  label="Inteligência Artificial & Dados"
                  value="ia"
                  color="#e5e7eb"
                />
                <Picker.Item
                  label="Desenvolvimento de Software"
                  value="dev"
                  color="#e5e7eb"
                />
                <Picker.Item
                  label="Experiência do Usuário (UX/UI)"
                  value="ux"
                  color="#e5e7eb"
                />
                <Picker.Item
                  label="Sustentabilidade & ESG"
                  value="esg"
                  color="#e5e7eb"
                />
              </Picker>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
              <Text style={styles.saveButtonText}>Salvar login neste dispositivo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={handleLimpar}>
              <Text style={styles.clearButtonText}>Apagar login salvo</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>O que isso demonstra</Text>
          <Text style={styles.text}>
            • Demonstra que o app possui uma tela de login/perfil.
          </Text>
          <Text style={styles.text}>
            • Mostra o uso de AsyncStorage para persistir dados sensíveis
            localmente.
          </Text>
          <Text style={styles.text}>
            • A área de interesse pode ser usada para personalizar trilhas e
            recomendações em outras telas.
          </Text>
        </View>
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
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#0b1220",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginTop: 16,
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
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#020617",
    marginBottom: 8,
  },
  picker: {
    color: "#e5e7eb",
    width: "100%",
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
  loadingBox: {
    marginTop: 24,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#083344",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    color: "#e0f2fe",
  },
});
