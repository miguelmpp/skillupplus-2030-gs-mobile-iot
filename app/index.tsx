import { Link } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appName}>SkillUpPlus 2030</Text>
        <Text style={styles.subtitle}>
          Trilha de upskilling para o futuro do trabalho, conectada ao pilar de
          conectividade & IoT.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que você pode fazer aqui?</Text>
          <Text style={styles.cardText}>• Planejar trilhas de aprendizado.</Text>
          <Text style={styles.cardText}>
            • Registrar micro-habilidades e cursos.
          </Text>
          <Text style={styles.cardText}>
            • Simular conexão com dispositivos IoT (totens, sensores, etc).
          </Text>
          <Text style={styles.cardText}>
            • Acompanhar seu progresso ao longo do semestre.
          </Text>
        </View>

        {/* Botões do menu principal */}
                <View style={styles.menu}>
          <Link href="/trilhas" asChild>
            <TouchableOpacity style={styles.menuButtonPrimary}>
              <Text style={styles.menuButtonPrimaryText}>
                Planejar trilha de upskilling
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/dashboard" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>
                Ver painel de progresso
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/iot" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>
                Conectividade & IoT
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>
                Configurar login e perfil
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/navegacao" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>
                Central de navegação (Drawer/Tabs/Stack)
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/sobre" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>
                Sobre o aplicativo
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.footer}>
          GS – Mobile Development & IoT • ES 5º semestre
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617", // quase preto
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f9fafb",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#0b1220",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  menu: {
    gap: 12,
    marginBottom: 24,
  },
  menuButtonPrimary: {
    backgroundColor: "#e11d48",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  menuButtonPrimaryText: {
    color: "#f9fafb",
    fontSize: 15,
    fontWeight: "600",
  },
  menuButton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  menuButtonText: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
  },
});
