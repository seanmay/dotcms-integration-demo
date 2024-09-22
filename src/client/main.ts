import { createRoot } from "react-dom/client";
import data_schema from "root/config/data-cache.schema.json" with { "type": "json" };

import { DataCache } from "@core/storage.js";
import { AuthService } from "@services/auth.service.js";
import { resolve_endpoints } from "@services/endpoints.js";
import { BlogService } from "@services/blog.service.js";


// Don't love it, but ... ehhh
// globalThis.React = React;


// ImportMaps are great; import locators make modules easy to use, but `fetch` does not use the import resolver for its URLs.
// We're going to do this symbol resolution manually, for now, to keep concrete URLs in the configuration JSON
const endpoints = resolve_endpoints();

const cache = await DataCache.open(data_schema);
const auth = AuthService(endpoints.cms);
const blog = BlogService(endpoints, cache);

import { App } from "./app.js";
import { load_json } from "./core/loaders.js";
const root = createRoot(document.querySelector("[data-app-root]"), { });
root.render(App({ system: { auth, blog, cache, endpoints }}));



const auth_response = await auth.get_token("admin@dotcms.com", "admin");
blog.load_blogs().then(console.log);

const nav_response = await fetch("https://demo.dotcms.com/api/v1/nav/?depth=5", {
  headers: [["Authorization", `Bearer ${auth_response.entity.token}`]],
}).then(res => res.json());

load_json("https://demo.dotcms.com/api/content/render/false/query/+contentType:Banner/depth/2", {
  method: "GET"
}).then(console.log);

// const blogs = blog_data.data.blogs;
// console.time("BlogCollection.Process");
// console.time("BlogCollection.add");
// await cache.add("BlogCollection", blogs).then(console.log);
// console.timeEnd("BlogCollection.add");
// console.time("BlogCollection.get");
// await cache.get_all("BlogCollection", 20).then(console.log);
// console.timeEnd("BlogCollection.get");
// console.timeEnd("BlogCollection.Process");
//    author
//    blogContent

