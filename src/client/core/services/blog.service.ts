import type { EndpointConfig } from "@services/endpoints";
import type { DataCache } from "@core/storage";
import { load_text } from "@core/loaders.js";
import { tap } from "@core/utils.js";


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
    const headers = { "Content-Type": "text/plain" };
    const body = JSON.stringify({ query: blog_query });

    // text/plain as a dodge for OPTIONS preflight, which /graphql is 404ing
    return await fetch(endpoints.cms.graphql, { method, headers, body })
      .then((res) => res.json())
      .then(query => query.data.blogs)
      .then(tap(cache_blogs));
  };

  const cache_blogs = (blogs: any) =>
    cache.add("BlogCollection", blogs);

  const blog_service = { fetch_blogs, load_blogs };

  return blog_service;
};