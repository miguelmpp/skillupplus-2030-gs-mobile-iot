import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";

type Cenario = "coworking" | "fabrica" | "homeoffice";

type DispositivoIoT = {
  id: string;
  nome: string;
  tipo: string;
  online: boolean;
};

export default function IoTScreen() {
  const [cenario, setCenario] = useState<Cenario>("coworking");
  const [dispositivos, setDispositivos] = useState<DispositivoIoT[]>([
    {
      id: "totem",
      nome: "Totem de presença",
      tipo: "Controle de acesso e registro de ponto",
      online: true,
    },
    {
      id: "sensor",
      nome: "Sensor de ocupação da sala",
      tipo: "Monitoramento de uso de estações e salas",
      online: true,
    },
    {
      id: "wearable",
      nome: "Wearable de bem-estar",
      tipo: "Acompanha passos, pausas e sinais de fadiga",
      online: false,
    },
  ]);

  function handleToggleDispositivo(id: string) {
    setDispositivos((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, online: !d.online } : d
      )
    );
  }

  const total = dispositivos.length;
  const online = dispositivos.filter((d) => d.online).length;
  const offline = total - online;

  function getDescricaoCenario(c: Cenario) {
    switch (c) {
      case "coworking":
        return "Espaço de coworking híbrido, com estações compartilhadas e totens de check-in na entrada.";
      case "fabrica":
        return "Ambiente industrial com chão de fábrica, sensores de presença em áreas críticas e dispositivos vestíveis para ergonomia.";
      case "homeoffice":
        return "Cenário de trabalho remoto, com monitoramento leve de presença em reuniões e bem-estar via wearables.";
      default:
        return "";
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Conectividade & IoT</Text>
        <Text style={styles.text}>
          Este laboratório simula dispositivos IoT conectados ao ambiente de
          trabalho e como eles poderiam apoiar decisões sobre espaço, bem-estar
          e requalificação.
        </Text>

        {/* Seção de cenário */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Selecionar cenário de teste</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={cenario}
              onValueChange={(value) => setCenario(value as Cenario)}
              dropdownIconColor="#e5e7eb"
              style={styles.picker}
            >
              <Picker.Item
                label="Coworking híbrido"
                value="coworking"
                color="#e5e7eb"
              />
              <Picker.Item
                label="Fábrica conectada"
                value="fabrica"
                color="#e5e7eb"
              />
              <Picker.Item
                label="Home office"
                value="homeoffice"
                color="#e5e7eb"
              />
            </Picker>
          </View>
          <Text style={styles.text}>{getDescricaoCenario(cenario)}</Text>
        </View>

        {/* Seção de dispositivos */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dispositivos simulados</Text>
          {dispositivos.map((d) => (
            <View key={d.id} style={styles.deviceRow}>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{d.nome}</Text>
                <Text style={styles.deviceType}>{d.tipo}</Text>
                <Text
                  style={[
                    styles.deviceStatus,
                    d.online ? styles.statusOnline : styles.statusOffline,
                  ]}
                >
                  {d.online ? "Online" : "Offline"}
                </Text>
              </View>
              <Switch
                value={d.online}
                onValueChange={() => handleToggleDispositivo(d.id)}
                trackColor={{ false: "#374151", true: "#22c55e" }}
                thumbColor={d.online ? "#022c22" : "#9ca3af"}
              />
            </View>
          ))}
        </View>

        {/* Resumo */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Resumo do cenário</Text>
          <Text style={styles.text}>
            Dispositivos no cenário selecionado:{" "}
            <Text style={styles.boldValue}>{total}</Text>
          </Text>
          <Text style={styles.text}>
            Online: <Text style={styles.boldValue}>{online}</Text> | Offline:{" "}
            <Text style={styles.boldValue}>{offline}</Text>
          </Text>
          <Text style={styles.text}>
            No relatório da GS, você pode explicar que esta tela representa um
            “modo laboratório” para testar como diferentes combinações de
            dispositivos IoT poderiam apoiar o trabalho híbrido e a gestão de
            espaços.
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 8,
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
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  deviceInfo: {
    flex: 1,
    paddingRight: 12,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f9fafb",
  },
  deviceType: {
    fontSize: 13,
    color: "#9ca3af",
  },
  deviceStatus: {
    marginTop: 2,
    fontSize: 12,
  },
  statusOnline: {
    color: "#22c55e",
  },
  statusOffline: {
    color: "#f97316",
  },
  boldValue: {
    fontWeight: "600",
    color: "#e5e7eb",
  },
});
