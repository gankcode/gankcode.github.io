export const useNavigation = () => {
  const router = useRouter();
  const localePath = useLocalePath();

  const links = ref([
    {
      label: "nav.home",
      icon: "la la-home",
      root: true,
      click: () => {
        router.push(localePath("/"));
      },
    },
    {
      label: "nav.articles",
      icon: "la la-book",
      click: () => {
        router.push(localePath("/articles"));
      },
    },
    {
      label: "nav.projects",
      icon: "la la-box",
      click: () => {
        router.push(localePath("/projects"));
      },
    },
    {
      label: "nav.tools",
      icon: "la la-tools",
      click: () => {
        router.push(localePath("/tools"));
      },
    },
    {
      label: "nav.about",
      icon: "la la-user",
      click: () => {
        router.push(localePath("/about"));
      },
    },
  ]);

  return {
    links,
  };
};
