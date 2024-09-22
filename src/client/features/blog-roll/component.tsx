import { use } from "react";
import { useBlogCollection } from "root/features/blog-roll/hooks.js";
import { ServiceProvider } from "root/core/providers.js";




export const BlogRoll = () => {
  const [blogs, accept_pending_blogs] = useBlogCollection();
  const system = use(ServiceProvider);

  return (
    <section>
      {!!blogs.pending.length && <button onClick={accept_pending_blogs}>Show New</button>}
      <ul hidden={!blogs.current.length}>
        {blogs.current.map(blog => <li><BlogCard blog={blog} img={`${system.endpoints.cms.site}.${blog.image.fileAsset.versionPath}`} /></li>)}
      </ul>
    </section>
  );
};


const BlogCard = ({ blog, img }) => (
  <article>
    <picture>
      <img title={blog.image.name} src={`${img}/webp/20q`} />
    </picture>
  </article>
);