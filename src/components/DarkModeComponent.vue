<template>
  <div>
    <button @click="toggleTheme" class="nav-link bg-transparent border-0 p-0 m-0">
      <img src="../assets/sun.svg" alt="Sun Icon" v-if="!isDark" style="width: 24px; height: 24px;" class="img-fluid">
      <img src="../assets/moon.svg" alt="Moon Icon" v-if="isDark" style="width: 24px; height: 24px;" class="img-fluid">
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(true);

function applyTheme() {
  const body = document.body;
  body.classList.remove('light', 'dark');
  body.classList.add(isDark.value ? 'dark' : 'light');
  localStorage.setItem('theme', JSON.stringify(isDark.value));
}

function initializeThemePreference() {
  const storedTheme = localStorage.getItem('theme');
  isDark.value = storedTheme ? JSON.parse(storedTheme) : true;
  applyTheme();
}

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
}

onMounted(() => {
  initializeThemePreference();
});
</script>
