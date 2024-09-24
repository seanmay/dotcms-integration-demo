import { useCallback, useEffect, useState } from "react";

export const useNavigation = () => {
  const [url, set_url] = useState(new URL(location.href, "/"));
  const on_path_update = useCallback(
    (e: PopStateEvent) => set_url(new URL(location.href, "/")),
    [url.href]
  );

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("popstate", on_path_update, controller);
    return () => controller.abort();
  }, [url.href]);

  return {
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    navigate: (path) => history.pushState({}, null, path),
    back: () => history.go(-1),
    forward: () => history.go(+1),
  };
};
