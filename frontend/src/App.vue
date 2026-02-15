<template>
  <div class="container">
    <h2>Smart Design Assistant</h2>
    <textarea v-model="prompt" placeholder="Enter design requirement..." />
    <button @click="getFeedback">Get AI Feedback</button>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const prompt = ref("");
const response = ref("");

const getFeedback = async () => {
  const res = await axios.post("http://localhost:3000/design-feedback", {
    prompt: prompt.value
  });
  response.value = res.data.reply;
};
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
  font-family: Arial;
}

textarea {
  width: 100%;
  height: 100px;
}

button {
  margin-top: 10px;
}
</style>
