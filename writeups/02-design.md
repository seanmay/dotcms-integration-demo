# Design Intent

My goal here is to have a streamlined dev experience, and given the scramble to make something work, *and* simultaneously (hopefully) not be atrocious, ***and*** ideally demonstrating getting my hands nerdy, rather than leaning completely upon SDKs and libs (because if I can do the one, I can certainly do the other).

With the goal being streamlined dev / ease of refactoring, build pipelines are taking a backseat; this might even be capable of running 100% from a static server, while also supporting ServiceWorker for offline / local-first experiences (if the deadline doesn't creep up on me).

Even if this succeeds in being 100% statically contained (minus dotCMS CORS calls) and offline-cached, it should include some means of hosting static files, and returning index.html for any non-static file. Will include local means, rather than making this public.

## Organization / Notes

**Rationale**

- everything interesting will be in `src/client` and built to `dist/client`
- final build *might* be bundled, but everything will be built loose and reference an `importmap`
  - `CacheStorage` generally has lookup times in the `ns` range for static requests
  - good for app files, and as optimistic data fetches that can be updated while running
- where reasonable, code will be colocated by feature, and factored out into common components as needed
- styles / templates / logic will be colocated, where joined in purpose, and factored out as needed (component-based architecture, rather than MVC/MVVM architecture)
- services will almost exclusively be in a core folder, with bindings to views (eg: hooks) as needed

**Conceptual / Target Overview**

```
/src/server -- "just in case" (https, etc)
/src/client
- index.html
- main.js  -- void main() app entry
  /config
  - importmap.json -- import aliases
  - bootstrap.js   -- binds importmap; registers ServiceWorker(maybe?); launches main()
  /libs -- vendor folder, if I *need* anything that would otherwise be `node_modules` or bundled
  /core
    /services   -- CMS bindings / etc
    /components -- atomic components
  /features -- logical "blocks" of behavior
  /pages -- page-level orchestration of features / behavior
```

Over-engineering? Perhaps... I don't expect all of this will be fully fleshed out, unless I crank out the whole app.
