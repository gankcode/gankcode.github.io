<template>
  <div class="container mx-auto p-4">
    <!-- 正则表达式输入区域 -->
    <div class="mb-4">
      <UTextarea
        v-model="regex"
        :rows="1"
        class="font-mono"
        placeholder="输入正则表达式..."
        :ui="{ base: 'resize-none' }"
      />
      <div class="mt-2 flex items-center">
        <UCheckbox v-model="isGlobal" label="全局搜索" />
      </div>
    </div>

    <!-- 测试文本输入区域 -->
    <div class="mb-4">
      <UTextarea
        v-model="testText"
        :rows="8"
        class="font-mono"
        placeholder="输入要测试的文本..."
      />
    </div>

    <!-- 匹配结果区域 -->
    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-2">匹配结果</h3>

      <div v-if="matchResults.length" class="space-y-2">
        <div
          v-for="(result, index) in matchResults"
          :key="index"
          class="bg-white dark:bg-gray-700 p-4 rounded"
        >
          <div class="font-mono">匹配内容: {{ result.match }}</div>
          <div v-if="result.groups.length" class="mt-1">
            <div class="text-sm text-gray-600 dark:text-gray-400">分组:</div>
            <div
              v-for="(group, gIndex) in result.groups"
              :key="gIndex"
              class="font-mono ml-4"
            >
              组 {{ gIndex + 1 }}: {{ group }}
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500">无匹配结果</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const regex = ref("");
const testText = ref("");
const isGlobal = ref(false);

interface MatchResult {
  match: string;
  groups: string[];
}

const matchResults = computed<MatchResult[]>(() => {
  if (!regex.value || !testText.value) return [];

  try {
    const flags = isGlobal.value ? "g" : "";
    const regexObj = new RegExp(regex.value, flags);
    const results: MatchResult[] = [];

    let match;
    if (isGlobal.value) {
      while ((match = regexObj.exec(testText.value)) !== null) {
        results.push({
          match: match[0],
          groups: match.slice(1),
        });
      }
    } else {
      match = regexObj.exec(testText.value);
      if (match) {
        results.push({
          match: match[0],
          groups: match.slice(1),
        });
      }
    }

    return results;
  } catch (error) {
    console.error("正则表达式错误:", error);
    return [];
  }
});
</script>
