<template>
  <form class="chat-input" @submit.prevent="$emit('submit')">
    <input
      :value="inputValue"
      @input="
        $emit('update:input-value', ($event.target as HTMLInputElement).value)
      "
      type="text"
      placeholder="Écrivez votre message..."
    />
    <button type="submit" :disabled="isLoading || !inputValue.trim()">
      Envoyer
    </button>
  </form>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

defineProps<{
  inputValue: string;
  isLoading: boolean;
}>();

defineEmits<{
  (e: "submit"): void;
  (e: "update:input-value", value: string): void;
}>();
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 12px;
  position: sticky;
  bottom: 0;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(31, 38, 135, 0.1);
  padding: 8px;
  z-index: 2;
}
input[type="text"] {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.7);
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
  background: #a8edea;
  color: #3b3b3b;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(31, 38, 135, 0.08);
  transition:
    background 0.4s,
    box-shadow 0.2s;
}
button:hover {
  background: rgb(250, 218, 228);
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.16);
}
button:disabled {
  background: rgb(199, 199, 199);
  cursor: default;
  opacity: 0.3;
}
</style>
