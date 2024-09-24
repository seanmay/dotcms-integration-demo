import { use, useCallback } from "react";
import { useBlogCollection } from "root/features/blog-roll/hooks.js";
import { ServiceProvider } from "root/core/providers.js";
import { ComponentMap, DocumentBuilder } from "root/core/components/main.js";
import { flushSync, preload } from "react-dom";


export const BlogRoll = ({ blogs, update_list, onSelected }) => {
  preload(`${import.meta.url}/../style.css`, { as: "style" });
  // const [blogs, accept_pending_blogs] = useBlogCollection();
  const system = use(ServiceProvider);

  const transition_pending_blogs = () => {
    document.startViewTransition?.(() => flushSync(update_list))
      ?? update_list();
  };

  const navigate_to_blog = useCallback((e, blog) => {
    e.preventDefault();
    e.stopPropagation();
    history.pushState({}, null, `/blogs/${blog.urlTitle}`);
    onSelected(blog);
  }, []);

  return (
    <section className="blog-roll">
      <link rel="stylesheet" href={`${import.meta.url}/../style.css`} />
      {!!blogs?.pending.length && (
        <button className="blog-content-button" onClick={transition_pending_blogs}>More Blogs</button>
      )}
      <section className="blog-list" hidden={!blogs?.current.length}>
        {blogs?.current.map((blog, i) => (
          <a
            onClick={(e) => navigate_to_blog(e, blog)}
            href={`/blogs/${blog.urlTitle}`}
            key={blog.urlTitle}
            style={{ viewTransitionName: `blog-card-${blog.urlTitle}`}}
          >
            <BlogCard
              blog={blog}
              img={`${system.endpoints.cms.site}.${blog.image.fileAsset.versionPath}`}
            />
          </a>
        ))}
      </section>
    </section>
  );
};


const BlogCard = ({ blog, img }) => {
  const image = blog.image.fileAsset;
  return (
    <article
      className="blog-card"
      style={{ viewTransitionName: blog.urlTitle }}>
      <div className="blog-image-clip">
        <img
          style={{ viewTransitionName: `${blog.urlTitle}-image` }}
          title={image.name}
          width={image.width}
          height={image.height}
          src={`${img}/webp/20q`}
        />
      </div>
      <div className="card-details">
        <span className="blog-chip">{blog.tags.sort()[0]}</span>
        <h2 style={{ viewTransitionName: `${blog.title}` }}>{blog.title}</h2>
        <p>{blog.teaser}</p>
      </div>
    </article>
  );
};
