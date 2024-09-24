import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync, preload } from "react-dom";
import { ServiceProvider } from "@core/providers.js";
import { BlogRoll } from "../blog-roll/component.js";
import { useBlogCollection } from "../blog-roll/hooks.js";
import { DocumentBuilder } from "@core/components/main.js";
import { CMSComponents, CMSTextMarks } from "../promo/component.js";
import { Banner } from "../promo/banners.js";
import { load_json } from "root/core/loaders.js";


export const BlogPage = () => {
  const system = use(ServiceProvider);

  const [blogs, update_blog_list] = useBlogCollection();
  const [path, set_path] = useState("/");
  const [banners, set_banners] = useState([]); 

  const select_blog = useCallback((blog) => {
    const navigate = () => {
      const path = `/blogs/${blog.urlTitle}`;
      history.pushState({}, null, path);
      set_path(path);
    };
    const transition = () => flushSync(navigate); 
    document.startViewTransition?.(transition) ?? navigate();
  }, [set_path]);

  useEffect(() => {
    const initial_path = new URL(location.href).pathname;
    if (!initial_path.startsWith(`/blogs/`)) {
      history.replaceState({}, null, `/blogs/`);
      set_path(`/blogs/`);
    } else {
      set_path(initial_path);
    }

    fetch_banners(system).then(set_banners);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const on_navigation = () => set_path(location.pathname); 
    window.addEventListener("popstate", on_navigation, controller);
    return () => controller.abort();
  }, [set_path]);

  const parts = path.slice(1).split("/");
  const blog_id = parts[1];
  const blog = [...blogs.current, ...blogs.pending]
    .find(blog => blog.urlTitle === blog_id);
  
  const blog_img = blog
    ? `${system.endpoints.cms.site}.${blog?.titleImage.versionPath}/webp/80q`
    : "";

  const content = blog
    ? <Blog blog={blog} img={blog_img}  />
    : <BlogRoll blogs={blogs} update_list={update_blog_list} onSelected={select_blog} />

  return (
    <>
      <link rel="stylesheet" href={`./features/promo/banner-style.css`}></link>
      <Banner banners={banners} />
      <section className="blog-page-content" style={{ position: "relative" }}>
        {content}
      </section>
    </>
  );
};


export const Blog = ({ blog, img }) => {
  const blog_ref = useRef<HTMLElement>(null);
  const image_ref = useRef<HTMLImageElement>(null);

  preload(`${import.meta.url}/../style.css`, { as: "style" });
  preload(`${import.meta.url}/../../promo/style.css`, { as: "style" });

  useEffect(() => {
    // @ts-ignore
    blog_ref.current.style.viewTransitionName = blog.urlTitle;
    // @ts-ignore
    image_ref.current.style.viewTransitionName = `${blog.urlTitle}-image`;
  }, [blog, img]);

  return (
    <article ref={blog_ref} className="blog-post">
      <link rel="stylesheet" href={`${import.meta.url}/../style.css`} />
      <link rel="stylesheet" href={`${import.meta.url}/../../promo/style.css`} />
      <img ref={image_ref} src={img} width={blog.titleImage.width} height={blog.titleImage.height} />
      <h1>{blog.title}</h1>
      <DocumentBuilder node={blog.blogContent.json} components={BlogNodeComponents} />
    </article>
  );
};


// Nodes built for recursive descent. No time to research every ContentField for every ContentType.
// Definitely no time for the Velocity metaprogramming and node-parsing .vtls to pull JSON out...
// Will try to write components for dot____ nodes
// But I will log everything that comes through the blogs in the demo content, and develop what is used.
const BlogNodeComponents = {
  doc: ({ node, children }) => { return <section>{children}</section>; },
  text: ({ node, children }) => { return (node.marks ?? []).reduceRight(apply_text_mark, node.text); },
  paragraph: ({ node, children }) => { return <p>{children}</p>; },
  // @ts-ignore I know 100% that h1-6 are a thing, and I trust DotCMS to disallow attrs.level=42.
  heading: ({ node, children }) => { const H = `h${node.attrs.level}`; return <H>{children}</H>; },
  bulletList: ({ node, children }) => { return <ul>{children}</ul>; },
  listItem: ({ node, children }) => { return <li>{children}</li>; },
  table: ({ node, children }) => { return <table>{children}</table>; }, // TODO: not actual tables; try to figure out if I can build something resize-friendly on a time-budget.
  tableHeader: ({ node, children }) => { return <th>{children}</th>; },
  tableRow: ({ node, children }) => { return <tr>{children}</tr>; },
  tableCell: ({ node, children }) => { return <td>{children}</td>; },
  dotContent: ({ node, children }) => { return <CMSComponents.Content node={node} />; },
  dotImage: ({ node, children }) => { return <CMSComponents.Image node={node} />; },
};

const apply_text_mark = (children, mark) => {
  const Mark = CMSTextMarks[mark.type];
  return <Mark mark>{children}</Mark>;
};

const fetch_banners = async (system) => {
  const url = "https://demo.dotcms.com/api/content/render/false/query/+contentType:Banner/depth/2";
 
  const token = await system.auth.get_token();
  const banner_data = await load_json(url, {
    method: "GET",
    headers: [["Authorization", `Bearer ${token}`]],
  });
  return banner_data;
};
