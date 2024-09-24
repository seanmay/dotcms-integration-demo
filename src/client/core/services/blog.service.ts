import type { EndpointConfig } from "@services/endpoints";
import type { DataCache } from "@core/storage";
import { load_text } from "@core/loaders.js";
import { tap } from "@core/utils.js";


export const BlogService = (endpoints: EndpointConfig,  cache: DataCache) => {
  const load_blogs = async () => {
    const results = await cache.get_all("BlogCollection", 100);

    const current_list = results.map(blog => blog.urlTitle);
    return results.length
      ? results : fetch_blogs();
  };

  const preload_images = (blogs) => {
    blogs.forEach(blog => {
      const image = new Image();
      const image_lg = new Image();
      const src = `${endpoints.cms.site}.${blog.image.fileAsset.versionPath}/webp`;
      image.src = `${src}/20q`;
      image_lg.src = `${src}/80q`;
    });
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
      .then(tap(cache_blogs))
      .then(tap(preload_images));
  };

  const cache_blogs = (blogs: any) =>
    cache.add("BlogCollection", blogs);

  const blog_service = { fetch_blogs, load_blogs };

  return blog_service;
};