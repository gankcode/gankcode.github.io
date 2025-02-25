export const useArticles = () => {

  const { getPagePathArray } = useLocalePage()

  const getArticleIdByRoute=():string=>{
    const routes = getPagePathArray(true)
    if (routes.length<2) {
      return ""
    }else{
      routes.splice(0,2,routes[1], routes[0])
      return routes.join("/") 
    }
  }

  const getRouteByArticleId=async(articleId:string)=>{
    const routes = articleId.split("/")
    if (routes.length<2) {
      return ""
    }else{
      routes.splice(0,2,routes[1], routes[0])
      return routes.join("/") 
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
