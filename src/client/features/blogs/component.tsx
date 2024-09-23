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
  const blog_img = blog
    ? `${system.endpoints.cms.site}.${blog?.titleImage.versionPath}`
    : "";

  return blog
    ? <Blog blog={blog} img={blog_img} />
    : <BlogRoll blogs={blogs} update_list={update_blog_list} onSelected={select_blog} />
};

export const Blog = ({ blog, img }) => {
  preload(`${import.meta.url}/../style.css`, { as: "style" });

  return (
    <article className="blog-post" style={{ viewTransitionName: blog.urlTitle }}>
      <link rel="stylesheet" href={`${import.meta.url}/../style.css`} />
      <img style={{ viewTransitionName: `${blog.urlTitle}-image` }} src={img} />
      <h1>{blog.title}</h1>
      <DocumentBuilder node={blog.blogContent.json} components={BlogNodeComponents} />
    </article>
  );
};


// Nodes built for recursive descent. No time to research every field on every ContentField on every ContentType.
// Definitely no time for the Velocity metaprogramming and node-parsing .vtls to pull JSON out...
// Will try to write components for dot____ nodes
// But I will log everything that comes through the blogs in the demo content, and develop what is used.
const BlogNodeComponents = {
  doc: ({ node, children }) => { console.log("doc", node); return <section>{children}</section>; },
  text: ({ node, children }) => { console.log("Text", node); return <span>{node.text}</span>; },
  paragraph: ({ node, children }) => { console.log("Paragraph", node); return <p>{children}</p>; },
  heading: ({ node, children }) => { console.log("Heading", node); const H = `h${node.attrs.level}`; return <H>{children}</H>; },
  bulletList: ({ node, children }) => { console.log("BulletList", node); return <ul>{children}</ul>; },
  listItem: ({ node, children }) => { console.log("ListItem", node); return <li>{children}</li>; },
  table: ({ node, children }) => { console.log("Table", node); return <table>{children}</table>; }, // TODO: not actual tables; try to figure out if I can build something resize-friendly
  tableHeader: ({ node, children }) => { console.log("TableHeader", node); return <th>{children}</th>; },
  tableRow: ({ node, children }) => { console.log("TableRow", node); return <tr>{children}</tr>; },
  tableCell: ({ node, children }) => { console.log("TableCell", node); return <td>{children}</td>; },
  dotContent: ({ node, children }) => { console.log(`DotContent`, node); return null; },
  dotImage: ({ node, children }) => { console.log("DotImage", node); return <CMSComponents.Image node={node} />; },
};




const CMSImage = ({ node }) => {
  const system = use(ServiceProvider);
  const src = `${system.endpoints.cms.site}.${node.attrs.src}`;
  const { alt, title } = node.attrs;
  return <img {...{ alt, title, src }} />;
};

const CMSComponents = {
  Image: CMSImage,
};