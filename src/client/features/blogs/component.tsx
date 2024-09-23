import { use, useCallback, useEffect, useState } from "react";
import { ServiceProvider } from "@core/providers.js";
import { BlogRoll } from "../blog-roll/component.js";
import { useBlogCollection } from "../blog-roll/hooks.js";
import { DocumentBuilder } from "root/core/components/main.js";
import { flushSync, preload } from "react-dom";

export const BlogPage = () => {
  const system = use(ServiceProvider);

  const [blogs, update_blog_list] = useBlogCollection();
  const [path, set_path] = useState("/");

  const select_blog = useCallback((blog) => {
    history.pushState({}, null, `/blogs/${blog.urlTitle}`);
    set_path(`/blogs/${blog.urlTitle}`);
    document.startViewTransition?.(() => {
      flushSync(() => {});
    });
  }, []);

  useEffect(() => {
    const initial_path = new URL(location.href).pathname;
    if (!initial_path.startsWith(`/blogs/`)) {
      history.replaceState({}, null, `/blogs/`);
      set_path(`/blogs/`);
    } else {
      set_path(initial_path);
    }
  }, []);

  const parts = path.slice(1).split("/");
  const blog_id = parts[1];
  const blog = blogs.current.find(blog => blog.urlTitle === blog_id);

  return blog
    ? <Blog blog={blog} />
    : <BlogRoll blogs={blogs} update_list={update_blog_list} onSelected={select_blog} />
};

export const Blog = ({ blog }) => {
  preload(`${import.meta.url}/../style.css`, { as: "style" });
  return (
    <article className="blog-post" style={{ viewTransitionName: blog.urlTitle }}>
      <link rel="stylesheet" href={`${import.meta.url}/../style.css`} />
      <h1>{blog.title}</h1>
      <DocumentBuilder node={blog.blogContent.json} components={{ }} />
    </article>
  );
};