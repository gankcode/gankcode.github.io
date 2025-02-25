<template>
  <div>
    <h1>字符计数器</h1>
    <textarea
      v-model="text"
      placeholder="在这里输入文本..."
      rows="5"
      cols="50"
    />
    <p>字符数：{{ characterCount }}</p>
    <p>单词数：{{ wordCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const text = ref("");

const characterCount = computed(() => text.value.length);

const wordCount = computed(() => {
  return text.value
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
});
</script>
