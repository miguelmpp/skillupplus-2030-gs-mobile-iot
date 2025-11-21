import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();

function IntroScreen() {
  return (
    <View style={styles.innerScreen}>
      <Text style={styles.innerTitle}>Navegação híbrida</Text>
      <Text style={styles.innerText}>
        Esta área foi criada apenas para demonstrar, em um exemplo simples, o
        uso combinado de Drawer, Tabs e Stack, como pedido na GS de Mobile.
      </Text>
      <Text style={styles.innerText}>
        • O menu lateral (Drawer) dá acesso à área principal e à tela de
        resumo.{"\n"}
        • As abas (Tabs) trocam entre Início, Trilhas e Progresso.{"\n"}
        • Dentro da aba Trilhas, há uma navegação em pilha (Stack) entre lista
        e detalhes.
      </Text>
    </View>
  );
}

function TrilhasListaScreen({ navigation }: any) {
  return (
    <View style={styles.innerScreen}>
      <Text style={styles.innerTitle}>Trilhas (Stack - Lista)</Text>
      <Text style={styles.innerText}>
        Esta é a tela de lista da pilha de navegação. Aqui poderíamos listar
        trilhas cadastradas no app principal.
      </Text>
      <Text
        style={[styles.innerText, styles.linkText]}
        onPress={() =>
          navigation.navigate("Detalhe", {
            nome: "Trilha exemplo de IA",
          })
        }
      >
        ➜ Ir para detalhes da trilha
      </Text>
    </View>
  );
}

function TrilhasDetalheScreen({ route }: any) {
  const { nome } = route.params || { nome: "Trilha exemplo" };

  return (
    <View style={styles.innerScreen}>
      <Text style={styles.innerTitle}>Trilhas (Stack - Detalhe)</Text>
      <Text style={styles.innerText}>
        Aqui seria exibido o detalhamento da trilha selecionada.
      </Text>
      <Text style={styles.innerText}>Trilha selecionada: {nome}</Text>
    </View>
  );
}

function ProgressoMiniScreen() {
  return (
    <View style={styles.innerScreen}>
      <Text style={styles.innerTitle}>Mini Progresso</Text>
      <Text style={styles.innerText}>
        Esta aba poderia mostrar um resumo simplificado do progresso, como um
        “snapshot” do painel principal.
      </Text>
      <Text style={styles.innerText}>
        No relatório, você pode explicar que esta área foi criada apenas para
        evidenciar o uso das Tabs em conjunto com o Drawer.
      </Text>
    </View>
  );
}

function TrilhasStackNavigator() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#020617" },
        headerTintColor: "#e5e7eb",
        headerTitleAlign: "center",
      }}
    >
      <StackNav.Screen
        name="Lista"
        component={TrilhasListaScreen}
        options={{ title: "Trilhas (lista)" }}
      />
      <StackNav.Screen
        name="Detalhe"
        component={TrilhasDetalheScreen}
        options={{ title: "Detalhe da trilha" }}
      />
    </StackNav.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#020617" },
        headerTintColor: "#e5e7eb",
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: "#020617" },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={IntroScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="TrilhasStack"
        component={TrilhasStackNavigator}
        options={{ title: "Trilhas" }}
      />
      <Tab.Screen
        name="MiniProgresso"
        component={ProgressoMiniScreen}
        options={{ title: "Progresso" }}
      />
    </Tab.Navigator>
  );
}

function DrawerResumoScreen() {
  return (
    <View style={styles.innerScreen}>
      <Text style={styles.innerTitle}>Resumo da navegação</Text>
      <Text style={styles.innerText}>
        Explicação:
      </Text>
      <Text style={styles.innerText}>
        • O app principal usa rotas em pilha (Stack) para navegar entre telas
        como Login, Trilhas, Dashboard e IoT.{"\n"}
        • Esta seção demonstra explicitamente o uso de Drawer + Tabs +
        Stack usando React Navigation.{"\n"}
      </Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#020617" },
        headerTintColor: "#f9fafb",
        headerTitleAlign: "center",
        drawerStyle: { backgroundColor: "#020617" },
        drawerActiveTintColor: "#f97316",
        drawerInactiveTintColor: "#e5e7eb",
      }}
    >
      <Drawer.Screen
        name="Principal"
        component={TabsNavigator}
        options={{ title: "Área principal" }}
      />
      <Drawer.Screen
        name="ResumoNavegacao"
        component={DrawerResumoScreen}
        options={{ title: "Resumo da navegação" }}
      />
    </Drawer.Navigator>
  );
}

export const options = {
  headerShown: false,
};

export default function NavegacaoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <DrawerNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  innerScreen: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },
  innerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9fafb",
    marginBottom: 8,
  },
  innerText: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  linkText: {
    color: "#f97316",
    fontWeight: "600",
  },
});
