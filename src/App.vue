<template>
  <div class="app-container">
    <h1>Bot Conversationnel</h1>
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

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const messages = ref<Message[]>([]);


async function handleSend(message: string) {
  messages.value.push({ role: 'user', content: message });
  const botReply = await apiCall();
  try {
    setTimeout(() => {
    messages.value.push({ role: 'bot', content: botReply });
    }, 500);
  } catch (error) {
    messages.value.push({ role: 'bot', content: 'Erreur lors de l’appel à l’API.' });
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}
.chat-area {
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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