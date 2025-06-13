<template>
  <div class="chat-window">
    <div v-for="(msg, idx) in messages" :key="idx" :class="['message', msg.role]">
      <span class="sender">{{ msg.role === 'user' ? 'Vous' : 'Bot' }} :</span> {{ msg.content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

defineProps<{ messages: Message[] }>();
</script>

<style scoped>
.chat-window {
  flex: 1 1 auto;
  overflow-y: auto;
  background: rgba(255,255,255,0.12);
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.message {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0;
  padding: 10px 16px;
  border-radius: 16px;
  max-width: 80%;
  font-size: 1rem;
  word-break: break-word;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
  backdrop-filter: blur(2px);
}
.message.user {
  background: rgba(168, 237, 234, 0.7);
  align-self: flex-end;
  color: #222;
}
.message.bot {
  background: rgba(237, 231, 246, 0.7);
  align-self: flex-start;
  color: #222;
}
.sender {
  font-weight: bold;
  margin-right: 8px;
  opacity: 0.7;
}
</style> 