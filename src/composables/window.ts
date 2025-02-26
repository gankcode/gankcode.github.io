export const useWindow = () => {
  const router = useRouter();
  const win: Ref<Window | null> = ref(null);

  const open = (url: string, target: string | undefined = "_blank") => {
    if (!url) {
      return;
    }
    if (url.toLowerCase().startsWith("http")) {
      win.value?.open?.(url, target);
    } else {
      const route = router.resolve({
        name: url,
      });
      win.value?.open?.(route.href, target);
    }
  };

  onMounted(() => {
    win.value = window;
  });

  onUnmounted(() => {
    win.value = null;
  });

  return {
    window,
    open,
  };
};
