<template>
  <div>
    <h1>简单计算器</h1>
    <input v-model.number="num1" type="number" placeholder="第一个数字" />
    <select v-model="operation">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">×</option>
      <option value="/">÷</option>
    </select>
    <input v-model.number="num2" type="number" placeholder="第二个数字" />
    <button @click="calculate">=</button>
    <p>结果：{{ result }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const num1 = ref(0);
const num2 = ref(0);
const operation = ref("+");
const result = ref(0);

const calculate = () => {
  switch (operation.value) {
    case "+":
      result.value = num1.value + num2.value;
      break;
    case "-":
      result.value = num1.value - num2.value;
      break;
    case "*":
      result.value = num1.value * num2.value;
      break;
    case "/":
      result.value = num1.value / num2.value;
      break;
  }
};
</script>
