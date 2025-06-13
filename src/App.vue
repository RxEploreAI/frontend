<template>
  <div class="app-container">
    <Header />
    <div class="chat-area">
      <ChatWindow :messages="messages" />
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatInput from './components/ChatInput.vue';
import {apiCall} from "./api/endpoint.ts";
import Header from './components/Header.vue';

interface Message {
  role: 'user' | 'bot';
  content: string;
  loading?: boolean;
}

const messages = ref<Message[]>([]);

async function handleSend(message: string) {
  messages.value.push({ role: 'user', content: message });
  messages.value.push({ role: 'bot', content: '', loading: true });
  try {
    const botReply = await apiCall();
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) {
      messages.value[idx] = { role: 'bot', content: botReply };
    }
  } catch (error: any) {
    let errorMsg = "Erreur lors de l'appel à l'API.";
    if (error?.response?.status === 500) {
      errorMsg = "Le serveur a rencontré une erreur (500).";
    }
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) {
      messages.value[idx] = { role: 'bot', content: errorMsg };
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}
.chat-area {
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
  max-height: calc(100vh - 110px); /* header + margin */
  justify-content: flex-end;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 32px 24px 24px;
  margin: 30px 0;
  position: relative;
  overflow: hidden;
}
h1 {
  color: #fff;
  text-shadow: 0 2px 8px rgba(31, 38, 135, 0.2);
  margin-bottom: 0;
  margin-top: 30px;
}

@media (max-width: 600px) {
  .chat-area {
    padding: 16px 12px 12px;
  }
}
</style> 