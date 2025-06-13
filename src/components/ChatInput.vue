<template>
  <form class="chat-input" @submit.prevent="onSend">
    <input v-model="input" type="text" placeholder="Écrivez votre message..." />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['send']);
const input = ref('');

function onSend() {
  if (input.value.trim()) {
    emit('send', input.value.trim());
    input.value = '';
  }
}
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 12px;
  position: sticky;
  bottom: 0;
  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(31, 38, 135, 0.10);
  padding: 12px 8px 8px 8px;
  z-index: 2;
}
input[type="text"] {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-family: inherit;
  background: rgba(255,255,255,0.7);
  font-size: 1rem;
  box-shadow: 0 1px 4px 0 rgba(31, 38, 135, 0.06);
  transition: box-shadow 0.2s;
}
input[type="text"]:focus {
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.12);
}
button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #222;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(31, 38, 135, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
button:hover {
  background: linear-gradient(135deg, #fed6e3 0%, #a8edea 100%);
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.16);
}
</style> 