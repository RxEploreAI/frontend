<template>
  <div class="app-container">
    <Header />
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

<script lang="ts" setup>
import { useChat } from "@ai-sdk/vue";
import ChatWindow from "./components/ChatWindow.vue";
import ChatInput from "./components/ChatInput.vue";
import Header from "./components/Header.vue";
const url = "https://run.mocky.io/v3/e078ff39-879e-42c7-9a59-3b199f98d89e";
const { messages, input, handleSubmit, status } = useChat({
  api: url,
  initialMessages: [
    {
      role: "system",
      content: "Comment puis-je vous aider aujourd'hui",
    },
  ],
  onFinish(message, info) {
    console.log("✅ Finished streaming message:", message);
    console.log("📊 Token usage:", info.usage);
    console.log("🛑 Finish reason:", info.finishReason);
  },
  onError(error) {
    console.error("❌ An error occurred:", error);
  },
  onResponse(response) {
    console.log("📥 ✅ Received HTTP response from server:", response);
  },
});

async function handleSubmitWithLog() {
  messages.value.push({
    role: "user",
    content: input.value,
  });

  // Vide l'input
  input.value = "";

  const response = await fetch(url);
  const data = await response.json();

  setTimeout(() => {
    console.log(data.messages);
    messages.value.push(...data.messages);
  }, 500);
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
