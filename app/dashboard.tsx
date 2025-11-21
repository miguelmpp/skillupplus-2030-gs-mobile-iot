import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "../src/components/ProgressBar";
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
const DEFAULT_META_HORAS_SEMANA = 6; // fallback geral

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

function getMetaSemanalPorArea(area: string | undefined): number {
  switch (area) {
    case "ia":
      return 8; // IA & Dados → mais estudo
    case "dev":
      return 6; // dev → 6h/sem
    case "ux":
      return 5; // UX → 5h/sem
    case "esg":
      return 4; // ESG → 4h/sem
    default:
      return DEFAULT_META_HORAS_SEMANA;
  }
}

export default function DashboardScreen() {
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [carregando, setCarregando] = useState(true);

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
        console.log("Erro ao carregar dados no Dashboard:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const totalTrilhas = trilhas.length;
  const totalMetaHoras = trilhas.reduce((acc, t) => acc + t.metaHoras, 0);
  const totalCargaSemanal = trilhas.reduce((acc, t) => acc + t.cargaSemanal, 0);
  const cargaMediaSemanal =
    totalTrilhas > 0 ? totalCargaSemanal / totalTrilhas : 0;

  const metaSemanalRecomendada = getMetaSemanalPorArea(perfil?.areaInteresse);

  const progressoPlanejamento =
    metaSemanalRecomendada > 0
      ? totalCargaSemanal / metaSemanalRecomendada
      : 0;

  const progressoPercent = Math.round(
    Math.max(0, Math.min(progressoPlanejamento, 1)) * 100
  );

  const areaInteresseLabel = getAreaInteresseLabel(perfil?.areaInteresse);
  const primeiroNome = perfil?.nome?.split(" ")[0] ?? "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Painel de Progresso</Text>

        {perfil ? (
          <Text style={styles.text}>
            {primeiroNome}, este painel considera seu foco atual em{" "}
            <Text style={styles.highlight}>{areaInteresseLabel}</Text> para
            sugerir uma carga mínima semanal de estudo.
          </Text>
        ) : (
          <Text style={styles.text}>
            Aqui você acompanha um resumo das trilhas que cadastrou e o quanto
            sua carga de estudo planejada se aproxima de uma meta mínima
            recomendada para requalificação contínua.
          </Text>
        )}

        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#e5e7eb" />
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <>
            {/* Card de resumo geral */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Resumo das trilhas</Text>

              <Text style={styles.itemText}>
                Trilhas cadastradas:{" "}
                <Text style={styles.itemValue}>{totalTrilhas}</Text>
              </Text>

              <Text style={styles.itemText}>
                Horas totais planejadas:{" "}
                <Text style={styles.itemValue}>{totalMetaHoras}h</Text>
              </Text>

              <Text style={styles.itemText}>
                Carga semanal total:{" "}
                <Text style={styles.itemValue}>{totalCargaSemanal}h/sem</Text>
              </Text>

              <Text style={styles.itemText}>
                Carga semanal média por trilha:{" "}
                <Text style={styles.itemValue}>
                  {cargaMediaSemanal.toFixed(1)}h/sem
                </Text>
              </Text>
            </View>

            {/* Card de progresso em relação à meta recomendada por área */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Planejamento vs. meta</Text>

              <Text style={styles.text}>
                Para o seu foco em{" "}
                <Text style={styles.highlight}>{areaInteresseLabel}</Text>, a
                carga mínima recomendada é de{" "}
                <Text style={styles.highlight}>
                  {metaSemanalRecomendada}h de estudo por semana
                </Text>
                . Abaixo, veja o quanto sua carga semanal planejada se aproxima
                dessa meta.
              </Text>

              <View style={styles.progressRow}>
                <ProgressBar progress={progressoPlanejamento} />
              </View>

              <Text style={styles.progressLabel}>
                {progressoPercent}% da carga semanal recomendada
              </Text>

              <Text style={styles.hintText}>
                Se o valor ficar muito acima de 100%, talvez o plano esteja
                pesado demais para a sua rotina. Se ficar muito abaixo, pode
                faltar consistência de estudo ao longo do semestre.
              </Text>
            </View>

            {/* Card explicando como o Dashboard será usado no relatório */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Como isso entra na GS</Text>
              <Text style={styles.text}>
                • Uso de armazenamento local (AsyncStorage) para manter o plano
                de estudos.
              </Text>
              <Text style={styles.text}>
                • Personalização da meta semanal de estudo conforme a área de
                interesse do usuário.
              </Text>
              <Text style={styles.text}>
                • Cálculo de indicadores simples (carga total, média, meta
                recomendada) com uma barra progressiva que conecta o app à ideia
                de acompanhamento contínuo de upskilling para o futuro do
                trabalho.
              </Text>
            </View>
          </>
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
  itemText: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },
  itemValue: {
    color: "#e5e7eb",
    fontWeight: "600",
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
  progressRow: {
    marginTop: 12,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: "#e5e7eb",
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
  },
});
