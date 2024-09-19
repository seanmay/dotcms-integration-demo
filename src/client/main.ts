document.body.append(new Text("It works."));

import { AuthService } from "./services/auth.service.js";

const auth = AuthService({
  auth_endpoint: "https://demo.dotcms.com/api/v1/authentication/api-token",
});

auth.get_token("admin@dotcms.com", "admin")
  .then((output) => console.log(output));

const tap = <T extends any>(f: <U extends T>(x: U) => any) => (x: T) => {
  f<T>(x);
  return x;
};

await fetch("https://demo.dotcms.com/api/v1/nav/?depth=5", {
  headers: [
    [
      "Authorization",
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGk0YjY5ZDEwMC0xMDRkLTRhMGMtYWNkYS0wZDM5ZmU0YmVjZTIiLCJ4bW9kIjoxNzI2NzUwMjMwMDAwLCJuYmYiOjE3MjY3NTAyMzAsImlzcyI6ImE0M2RjZjYwYzkiLCJleHAiOjE3MjY4MzY2MzAsImlhdCI6MTcyNjc1MDIzMCwianRpIjoiNGNjM2VhM2YtODU4Mi00NzBjLTkyOWEtMDdkZTMzYzQ5NjdhIn0.3p8wsPv4S320KnzoHbPTv7XgAzybTHysvSYEnBGyOnQ`,
    ],
  ],
})
  .then((res) => res.json())
  .then(tap(console.log));



const graphql_headers = new Headers();
const blog_query = await fetch("./queries/blogs.graphql").then(res => res.text());
await fetch("https://demo.dotcms.com/api/v1/graphql", {
  method: "POST",
  body: JSON.stringify({ query: blog_query }),
})
  .then((res) => res.json())
  .then(tap(console.log));

//    author
//    blogContent
