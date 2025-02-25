import { useFormat } from '~/composables/useFormat' // 导入 useFormat 的类型

declare module 'vue' {
  interface ComponentCustomProperties {
    $fmt: ReturnType<typeof useFormat>
  }
}

export {}