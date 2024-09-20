document.body.append(new Text("It works."));

import { DataCache } from "@core/storage.js";
import { AuthService } from "@services/auth.service.js";
import { resolve_cms_endpoints, resolve_app_endpoints } from "@services/endpoints.js";

import data_schema from "root/config/data-cache.schema.json" with { type: "json" };

const cache = DataCache.open(data_schema);

const endpoints = {
  cms: resolve_cms_endpoints(),
  app: resolve_app_endpoints(),
};

const auth = AuthService(endpoints.cms);

const tap = <T extends any>(f: <U extends T>(x: U) => any) => (x: T) => {
  f<T>(x);
  return x;
};

const auth_response = await auth.get_token("admin@dotcms.com", "admin");

const nav_response = await fetch("https://demo.dotcms.com/api/v1/nav/?depth=5", {
  headers: [["Authorization", `Bearer ${auth_response.entity.token}`]],
}).then(res => res.json());

const blog_query = await fetch(`${endpoints.app.queries}/blogs.graphql`).then(res => res.text());
await fetch("https://demo.dotcms.com/api/v1/graphql", {
  method: "POST",
  body: JSON.stringify({ query: blog_query }),
})
  .then((res) => res.json())
  .then(tap(console.log));


//    author
//    blogContent
