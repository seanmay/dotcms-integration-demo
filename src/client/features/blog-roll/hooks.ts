import { use, useCallback, useEffect, useState } from "react";
import { ServiceProvider } from "@core/providers.js";

type BlogLists = { current: any[]; pending: any[]; };

export const useBlogCollection = () => {
  const system = use(ServiceProvider);
  const current_state = useState<BlogLists>({
    current: [],
    pending: []
  });

  const [blogdata, update_blog_data] = current_state;
  const promote_pending_blogs = useCallback(() => {
    if (!blogdata.pending.length)
      return;
    const current = [...blogdata.pending, ...blogdata.current];
    update_blog_data({ current, pending: [] });
  }, current_state);

  useEffect(() => {
    system.blog
      .load_blogs()
      .then((blogs) =>
        update_blog_data(() => ({
          current: blogs.slice(0, 2),
          pending: blogs.slice(2),
        }))
      );
  }, []);

  useEffect(() => {
    const available_blogs = [...blogdata.current, ...blogdata.pending];
    const timer_id = setInterval(async () => {
      const blogs = await system.blog.load_blogs();
      const new_blogs = blogs.filter(blog => !available_blogs.some(test => blog.urlTitle === test.urlTitle));
      if (!new_blogs.length)
        return;

      const pending = [...blogdata.pending, ...new_blogs];
      update_blog_data({ current: blogdata.current, pending });
    }, 2_000);

    return () => clearInterval(timer_id);
  }, current_state);

  return [blogdata, promote_pending_blogs] as const;
};
