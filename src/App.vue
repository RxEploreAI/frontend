<template>
  <div class="app-container">
    <Header />
    <transition name="info-fade">
      <InfoText v-if="showInfoText" />
    </transition>
    <div class="chat-area">
      <ChatWindow
        :messages="messages"
        :is-loading="status === 'submitted' || status === 'streaming'"
      />
      <ChatInput
        v-model:input-value="input"
        :is-loading="status === 'submitted' || status === 'streaming'"
        @submit="handleSubmitWithLog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import ChatWindow from "./components/ChatWindow.vue";
import ChatInput from "./components/ChatInput.vue";
import Header from "./components/Header.vue";
import InfoText from "./components/InfoText.vue";

const url = 'http://192.168.70.123:8000/chat';

const messages = ref([
  {
    role: 'system',
    content: "Comment puis-je vous aider aujourd'hui",
  },
]);

const input = ref('');
const status = ref('ready');

const showInfoText = computed(() => messages.value.length === 1);

async function handleSubmitWithLog() {
  const question = input.value.trim();
  if (!question) return;
  status.value = "submitted";
  messages.value.push({
    role: 'user',
    content: question,
  });
  input.value = '';
  try {
    const response = await axios.post(url, {
      content: question,
    });
    console.log('Réponse du backend :', response.data);
    if (response.data?.messages) {
      messages.value.push({
        role: 'assistant',
        content: response.data.messages[0].content,
      });
    } else {
      messages.value.push({
        role: 'assistant',
        content: " Une erreur est servenue.",
      });
    }
  } catch (error) {
    console.error('Erreur :', error);
    messages.value.push({
      role: 'assistant',
      content: "Une erreur est survenue. Veuillez réessayer.",
    });
  } finally {
    status.value = "ready";
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
  /* flex-grow: 1; // pour couvrir la zone en hauteur */
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
  margin-top: auto !important;
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

.info-fade-enter-active,
.info-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1);
}
.info-fade-enter-from,
.info-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.info-fade-enter-to,
.info-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
