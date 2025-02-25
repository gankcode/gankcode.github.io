export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.$fmt = useFormat()
    nuxtApp.vueApp.config.globalProperties.$env = useRuntimeConfig().public
})
