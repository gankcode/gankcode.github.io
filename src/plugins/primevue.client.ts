import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import StyleClass from 'primevue/styleclass';
import AnimateOnScroll from 'primevue/animateonscroll';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.directive('focustrap', FocusTrap);
    nuxtApp.vueApp.directive('styleclass', StyleClass);
    nuxtApp.vueApp.directive('animateonscroll', AnimateOnScroll);
})
