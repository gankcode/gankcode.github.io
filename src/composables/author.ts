export const useAuthor = () => {
  const config = useRuntimeConfig();

  const getAuthor = (name: string): any => {
    if (!name) {
      return null;
    }
    const authors = config.public.authors;
    return Object.values(authors).find((author) => {
      return author.name?.toLowerCase?.() === name?.toLowerCase?.();
    });
  };
  return {
    getAuthor,
  };
};
