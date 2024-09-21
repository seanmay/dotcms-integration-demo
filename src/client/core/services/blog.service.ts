import type { EndpointConfig } from "@services/endpoints";
import type { DataCache } from "@core/storage";
import { load_text } from "@core/loaders.js";
import { tap } from "@core/utils.js";

/*
const blog_query = await fetch(`${endpoints.app.queries}/blogs.graphql`).then(res => res.text());
const blog_data = await fetch("https://demo.dotcms.com/api/v1/graphql", {
  method: "POST",
  body: JSON.stringify({ query: blog_query }),
})
  .then((res) => res.json())
  .then(tap(console.log));
*/
export const BlogService = (endpoints: EndpointConfig,  cache: DataCache) => {
  const load_blogs = async () => {
    const results = await cache.get_all("BlogCollection", 100);

    return results.length
      ? results : fetch_blogs();
  };

  let blog_query!: string;

  const fetch_blogs = async () => {
    blog_query ??= await load_text(`${endpoints.app.queries}./blogs.graphql`);
    const method = "POST";
    const body = JSON.stringify({ query: blog_query });
    return await fetch(`https://demo.dotcms.com/api/v1/graphql`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body,
    })
      .then((res) => res.json())
      .then(tap(cache_blogs));
  };

  const cache_blogs = (results: any) =>
    cache.add("BlogCollection", results.data.blogs);

  const blog_service = { fetch_blogs, load_blogs };

  return blog_service;
};