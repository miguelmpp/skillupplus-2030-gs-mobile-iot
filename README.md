# SkillUpPlus 2030 – Global Solution Mobile Development & IoT

Protótipo de aplicativo **mobile** desenvolvido em **React Native com Expo**, como parte da  
**Global Solution – Mobile Development & IoT (1º semestre de 2025)**, alinhado ao tema:

> **O Futuro do Trabalho – Pilar da Conectividade & IoT**

O app simula uma plataforma de **upskilling e reskilling** para estudantes e profissionais, integrando:
- planejamento de trilhas de aprendizado,
- painel de progresso com indicadores,
- simulação de cenários com dispositivos IoT,
- navegação híbrida (Stack + Tabs + Drawer),
- e persistência local com AsyncStorage.

---

## 👥 Equipe

- **Miguel Parrado** – RM554007  
- **Matheus Farias** – RM554254  

---

## 🎯 Objetivo do Aplicativo

O **SkillUpPlus 2030** foi pensado para:

- Ajudar o usuário a **planejar trilhas de desenvolvimento** (skills técnicas, digitais e comportamentais) até 2030.
- Conectar esse planejamento ao tema de **Conectividade & IoT**, simulando dispositivos em diferentes cenários de trabalho (coworking, fábrica, home office).
- Demonstrar na prática conceitos vistos em aula:
  - Componentes de UI (inputs, switches, picker, navegação).
  - Gerenciamento de estado (`useState`, `useEffect`).
  - Armazenamento local com **AsyncStorage**.
  - Navegação híbrida com **React Navigation** (Drawer + Bottom Tabs + Stack).

---

## 🧩 Funcionalidades Principais

### 1. Login & Perfil Local (`/login`)

Tela para cadastrar um **perfil local** no dispositivo:

- Campos:
  - Nome completo
  - E-mail institucional
  - Senha (apenas local)
  - Área de interesse principal:
    - IA & Dados
    - Desenvolvimento de Software
    - UX/UI
    - Sustentabilidade & ESG
- Dados salvos com **AsyncStorage**, permitindo que o app “lembre” o perfil.
- Usado para **personalizar** outras telas (Trilhas e Dashboard).

---

### 2. Trilhas de Upskilling (`/trilhas`)

Tela para montar as **trilhas de estudo** do usuário:

Campos do formulário:
- Nome da trilha (ex.: “Fundamentos de IA para o trabalho”)
- Área de interesse da trilha
- Nível atual (Iniciante, Intermediário, Avançado)
- Meta total de horas da trilha
- Carga semanal de estudo (h/sem)

Recursos:
- Uso de `useState` para controlar o formulário e a lista de trilhas.
- Validações básicas (campos obrigatórios, números > 0, carga semanal ≤ meta).
- Salvamento das trilhas em **AsyncStorage** na chave `@skillupplus:trilhas`.
- Lista das trilhas cadastradas logo abaixo do formulário.
- Mensagem de boas-vindas personalizada:
  - “Olá, Miguel! Vamos planejar trilhas focadas em Inteligência Artificial & Dados.”

---

### 3. Painel de Progresso (`/dashboard`)

Tela que consolida as trilhas cadastradas e mostra **indicadores**:

Indicadores calculados:
- Quantidade de trilhas cadastradas.
- Horas totais planejadas.
- Carga semanal total (soma de todas as trilhas).
- Carga semanal média por trilha.

Personalização por área de interesse:
- A partir do perfil salvo, define uma **meta semanal recomendada**, por exemplo:
  - IA & Dados → 8h/sem
  - Desenvolvimento → 6h/sem
  - UX → 5h/sem
  - ESG → 4h/sem

Progresso:
- Componente `ProgressBar` (em `src/components/ProgressBar.tsx`) que mostra:
  - Quanto da meta semanal recomendada o usuário já planejou (0–100%).

---

### 4. Conectividade & IoT (`/iot`)

Tela que funciona como um **laboratório de cenários IoT**:

- **Picker** para escolher o cenário:
  - Coworking híbrido
  - Fábrica conectada
  - Home office
- Lista de **dispositivos simulados**:
  - Totem de presença
  - Sensor de ocupação da sala
  - Wearable de bem-estar

Cada dispositivo possui:
- Descrição do papel no ambiente de trabalho.
- Um **Switch** para marcar Online/Offline.
- Resumo final:
  - Quantos dispositivos estão online / offline naquele cenário.

Essa tela conecta o app ao pilar de **Conectividade & IoT**, mostrando como dados de dispositivos podem apoiar decisões sobre espaço, bem-estar e produtividade.

---

### 5. Central de Navegação (Drawer + Tabs + Stack) (`/navegacao`)

Área criada especificamente para **demonstrar navegação híbrida**, como solicitado na GS:

- **Drawer Navigation** (menu lateral):
  - Área principal (Tabs)
  - Resumo da navegação
- **Bottom Tab Navigation**:
  - Início
  - Trilhas
  - Progresso
- **Stack Navigation** dentro da aba Trilhas:
  - Tela de lista
  - Tela de detalhe
  - Navegação em pilha (Lista → Detalhe) com `navigate()`.

Essa parte é ideal para **prints de tela** no PDF, provando uso combinado de:
- Drawer
- Tabs
- Stack

---

### 6. Sobre o aplicativo (`/sobre`)

Tela de documentação interna:

- Explica o propósito do app.
- Lista as funcionalidades principais.
- Lista as tecnologias utilizadas.
- Apresenta a **equipe** com nomes e RMs.
- Dá dicas de como usar a própria tela no relatório da GS.

---

## 🛠️ Stack Tecnológica

- **React Native** (via Expo)
- **Expo Router** – rotas baseadas em arquivos (pasta `app/`)
- **React Navigation**
  - `@react-navigation/drawer`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/native-stack`
- **AsyncStorage**
  - `@react-native-async-storage/async-storage`
- **Picker**
  - `@react-native-picker/picker`
- Hooks principais:
  - `useState`, `useEffect`

---

## 📁 Estrutura de Pastas (simplificada)

```text
skillupplus2030/
  app/
    _layout.tsx          # Stack raiz do expo-router (configura cabeçalho)
    index.tsx            # Home - menu principal SkillUpPlus 2030
    trilhas.tsx          # Trilhas de Upskilling (form + AsyncStorage)
    dashboard.tsx        # Painel de Progresso (indicadores + ProgressBar)
    iot.tsx              # Conectividade & IoT (cenários + dispositivos)
    login.tsx            # Login & Perfil local (AsyncStorage)
    navegacao.tsx        # Central de navegação (Drawer + Tabs + Stack)
    sobre.tsx            # Tela Sobre o app + equipe

  src/
    components/
      ProgressBar.tsx    # Componente de barra de progresso
    storage/
      authStorage.ts     # Funções para salvar/carregar/limpar perfil do usuário

  assets/
    ...                  # Ícones/imagens padrão gerados pelo Expo

  package.json
  tsconfig.json
  app.json
  babel.config.js
  README.md
````

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

* **Node.js** instalado
* **npm** ou **yarn**
* Conta gratuita no **Expo** (opcional, mas ajuda)
* Aplicativo **Expo Go** instalado no celular (Android ou iOS)

### Passos

1. **Clonar o repositório** (quando estiver no GitHub):

   ```bash
   git clone https://github.com/seu-usuario/skillupplus2030.git
   cd skillupplus2030
   ```

2. **Instalar dependências**:

   ```bash
   npm install
   ```

3. **Rodar o projeto com Expo**:

   ```bash
   npx expo start
   ```

4. No terminal ou na página que abrir no navegador:

   * Escanear o **QR Code** com o app **Expo Go** no celular
   * Ou usar o simulador (se tiver Android Studio / emulador configurado – opcional)

> Para a GS, o uso de **Expo Go no celular** já é suficiente, sem necessidade de emulador.

---

## 📸 Sugestão de Prints para o PDF da GS

Algumas telas que valem muito a pena tirar print:

* Home SkillUpPlus 2030 (menu principal).
* Login & Perfil Local, com dados preenchidos.
* Trilhas de Upskilling, mostrando trilhas cadastradas.
* Painel de Progresso, com barra de progresso e indicadores.
* Conectividade & IoT com alguns dispositivos Online/Offline.
* Central de Navegação:

  * Drawer aberto (menu lateral).
  * Tabs embaixo (Início / Trilhas / Progresso).
  * Navegação Lista → Detalhe na aba Trilhas.

---

## 📚 Conexão com o Tema “Futuro do Trabalho”

O app se conecta ao tema proposto pela GS da seguinte forma:

* **Futuro do Trabalho**: foca em **upskilling e reskilling contínuos**, simulando como um colaborador pode planejar e acompanhar seu desenvolvimento com apoio de tecnologia.
* **Conectividade & IoT**: simula cenários de ambiente de trabalho conectado (coworking, fábrica, home office) com dispositivos IoT que fornecem dados sobre presença, ocupação e bem-estar.
* **Mobile & Experiência do Usuário**: permite acesso rápido via smartphone, com interface simples, focada em clareza e experimentação prática (laboratório de navegação, laboratório IoT).

---

## 📄 Licença / Uso

Projeto desenvolvido para fins **acadêmicos**, no contexto da **Global Solution – Mobile Development & IoT (FIAP)**.
Uso livre para estudo, apresentação e evolução do trabalho.

