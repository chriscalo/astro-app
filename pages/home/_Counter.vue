<script setup>
  import { ref, onMounted } from "vue";
  import rpc from "~/util/rpc.js";
  const count = ref(0);
  const message = ref("Loading…");
  const response = await rpc.greetingService.greet("World", true);
  message.value = response.message;
</script>

<template>
  <p>{{ message }}</p>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
  button {
    font-weight: bold;
  }
</style>
