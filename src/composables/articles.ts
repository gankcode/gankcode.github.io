export const useArticles = () => {

  const localeRoute = useLocaleRoute();
  const { getPagePathArray, getLocalePath } = useLocalePage()

  const getArticleIdByRoute=():string=>{
    const routes = getPagePathArray(true)
    if (routes.length<2) {
      return ""
    }else{
      routes.splice(0,2,routes[1], routes[0])
      return routes.join("/") 
    }
  }

  const getRouteByArticleId=(articleId:string)=>{
    const routes = articleId.split("/")
    if (routes.length<2) {
      return ""
    }else{
      routes.splice(0,2,routes[1], routes[0])
      const loc = getLocalePath();
      const route =( "/"+routes.join("/")).replace(loc , "")
      return localeRoute(route)?.path
    }
  }

  const getArticleById=async(articleId:string)=>{
    const { data: article } = await useAsyncData(() =>
      queryCollection("articles").where("id", "=", articleId).first()
    );
    return article.value;
  }

  return {
    getArticleIdByRoute,
    getRouteByArticleId,
    getArticleById
  }

}
