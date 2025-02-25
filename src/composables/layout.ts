export const useLayout = () => {
  const layout = ref("home");

  const update = (_: Event) => {};

  onMounted(() => {
    window.addEventListener("resize", update);
    window.dispatchEvent(
      new Event("resize", { bubbles: false, cancelable: false }),
    );
  });
  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    layout,
  };
};
