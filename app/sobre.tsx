import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre o SkillUpPlus 2030</Text>

        <Text style={styles.text}>
          O SkillUpPlus 2030 é um protótipo de aplicativo mobile desenvolvido
          para a Global Solution de Mobile Development & IoT, alinhado ao tema
          “O Futuro do Trabalho”.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Objetivo do app</Text>
          <Text style={styles.text}>
            • Apoiar estudantes e profissionais a planejarem suas trilhas de{" "}
            <Text style={styles.highlight}>upskilling</Text> e{" "}
            <Text style={styles.highlight}>reskilling</Text> rumo a 2030.{"\n"}
            • Integrar esse planejamento com o pilar de{" "}
            <Text style={styles.highlight}>Conectividade & IoT</Text>, simulando
            dispositivos no ambiente de trabalho.{"\n"}
            • Registrar dados localmente (AsyncStorage) para demonstrar
            persistência, estado e cálculo de indicadores.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Equipe</Text>
          <Text style={styles.text}>
            • Miguel Parrado – <Text style={styles.highlight}>RM554007</Text>
          </Text>
          <Text style={styles.text}>
            • Matheus Farias – <Text style={styles.highlight}>RM554254</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Principais funcionalidades</Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Login & Perfil Local</Text>: tela de
            configuração de usuário, com armazenamento local do perfil e área de
            interesse principal.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Trilhas de Upskilling</Text>: cadastro
            de trilhas com meta de horas, carga semanal e nível atual,
            permitindo planejar o desenvolvimento contínuo.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Painel de Progresso</Text>: resumo de
            trilhas cadastradas, horas totais planejadas e comparação com uma
            meta semanal recomendada personalizada pela área de interesse.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Conectividade & IoT</Text>: laboratório
            que simula cenários (coworking, fábrica, home office) com
            dispositivos IoT (totem, sensores, wearables) e estados online/offline.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Navegação híbrida</Text>: área
            dedicada para demonstrar o uso combinado de Drawer, Tabs e Stack
            com React Navigation, conforme exigido pelo professor.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tecnologias utilizadas</Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>React Native</Text> com Expo.{"\n"}
            • <Text style={styles.highlight}>expo-router</Text> para rotas baseadas
            em arquivos.{"\n"}
            • <Text style={styles.highlight}>React Navigation</Text> para o
            laboratório de navegação (Drawer, Bottom Tabs, Stack).{"\n"}
            • <Text style={styles.highlight}>
              @react-native-async-storage/async-storage
            </Text>{" "}
            para persistência local.{"\n"}
            • <Text style={styles.highlight}>@react-native-picker/picker</Text> para
            seleção de cenários e área de interesse.
          </Text>
        </View>

        <Text style={styles.footer}>
          Global Solution – Mobile Development & IoT • 1º semestre de 2025
        </Text>
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
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 8,
  },
  footer: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
  },
});
