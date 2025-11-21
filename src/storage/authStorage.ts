import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "@skillupplus:user";

export type UserProfile = {
  nome: string;
  email: string;
  senha: string;
  areaInteresse: string;
};

export async function saveUserProfile(profile: UserProfile) {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.log("Erro ao salvar perfil do usuário:", error);
    throw error;
  }
}

export async function loadUserProfile(): Promise<UserProfile | null> {
  try {
    const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserProfile;
  } catch (error) {
    console.log("Erro ao carregar perfil do usuário:", error);
    return null;
  }
}

export async function clearUserProfile() {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.log("Erro ao limpar perfil do usuário:", error);
    throw error;
  }
}
