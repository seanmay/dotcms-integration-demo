import { createRoot } from "react-dom/client";
import React from "react";

import data_schema from "root/config/data-cache.schema.json" with { "type": "json" };

import { DataCache } from "@core/storage.js";
import { AuthService } from "@services/auth.service.js";
import { resolve_endpoints } from "@services/endpoints.js";
import { BlogService } from "@services/blog.service.js";



// ImportMaps are great; import locators make modules easy to use, but `fetch` does not use the import resolver for its URLs.
// We're going to do this symbol resolution manually, for now, to keep concrete URLs in the configuration JSON
const endpoints = resolve_endpoints();

const cache = await DataCache.open(data_schema);
const auth = AuthService(endpoints.cms);
const blog = BlogService(endpoints, cache);

const root = createRoot(document.querySelector("[data-app-root]"), { });
root.render(React.createElement("div", {}, ["Hooray!"]));



const auth_response = await auth.get_token("admin@dotcms.com", "admin");
blog.load_blogs().then(console.log);

const nav_response = await fetch("https://demo.dotcms.com/api/v1/nav/?depth=5", {
  headers: [["Authorization", `Bearer ${auth_response.entity.token}`]],
}).then(res => res.json());



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

