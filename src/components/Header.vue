<template>
  <header class="header-glass">
    <span class="logo-text">RxploreAI</span>
  </header>
</template>

<style scoped>
.header-glass {
  width: 100vw;
  min-width: 100vw;
  padding: 12px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.38);
  box-shadow: 0 2px 12px 0 rgba(6, 97, 118, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;
}
.logo-text {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #858d8c;
  opacity: 0.95;
  text-shadow: 0 1px 4px rgba(5, 97, 118, 0.1);
}
</style>
