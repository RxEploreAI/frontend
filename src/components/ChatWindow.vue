<template>
  <div class="chat-window" ref="chatWindowRef">
    <transition-group name="msg-fade" tag="div">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message', msg.role, { loading: msg.loading }]"
      >
        <span class="sender"
          >{{ msg.role === "user" ? "Vous" : "Raymond" }} :</span
        >
        {{ msg.content }}
      </div>
    </transition-group>
    <template v-if="isLoading">
      <span class="dots-loading"
        ><span>.</span><span>.</span><span>.</span></span
      >
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick } from "vue";

interface Message {
  role: "user" | "bot";
  content: string;
  loading?: boolean;
}

const props = defineProps<{ messages: Message[], isLoading: boolean }>();
const chatWindowRef = ref<HTMLElement | null>(null);

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (chatWindowRef.value) {
      chatWindowRef.value.scrollTop = chatWindowRef.value.scrollHeight;
    }
  },
);
</script>

<style scoped>
.chat-window {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.12);
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.msg-fade-enter-active {
  transition:
    opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.msg-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.msg-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.msg-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.msg-fade-leave-from {
  opacity: 1;
}
.msg-fade-leave-to {
  opacity: 0;
}
.message {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 0;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 1rem;
  word-break: break-word;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.05);
  backdrop-filter: blur(2px);
  text-align: left;
  background: rgba(237, 231, 246, 0.6);
  color: #3b3b3b;
}
.message.user {
  background: rgba(168, 237, 234, 0.6);
}
.message.assistant,
.message.system {
  background: none;
  box-shadow: none;
  backdrop-filter: none;
}
.message.loading {
  background: none;
  box-shadow: none;
  justify-content: flex-start;
}
.dots-loading {
  display: inline-block;
  font-size: 1.5em;
  letter-spacing: 2px;
  padding: 0 18px;
}
.dots-loading span {
  opacity: 0.2;
  animation: blink 1.4s infinite both;
}
.dots-loading span:nth-child(1) {
  animation-delay: 0s;
}
.dots-loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.dots-loading span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}
.sender {
  flex-shrink: 0;
  font-weight: bold;
  margin-right: 8px;
  opacity: 0.6;
}
</style>
