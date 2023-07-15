import { onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

export function useWindowSize() {
  const store = useStore();

  const handleResize = () => {
    setTimeout(() => {
      store.dispatch("updateScreenWidth", window.innerWidth);
    }, 0);
  };
  handleResize
  
  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
  return handleResize;
}
