# Research / Findings / Questions

**Little Things**

- Postman API test-suite is not public
- Missing comma in /content-type-api writeup `PUT ContentType > Payload > "folder": SYSTEM_FOLDER\n`
- Found it hard to determine fields for BlogCollection and nested types, using just the content author views (lack of obvious linkage into subtypes; navigation felt like it involved going back to the sidebar + memorization)
- ...click the expanded menu text button, to read the labels (not a bug... me yelling at my past self)...
- Typed GraphQL playground with tabbed auto-complete was a lifesaver
- As is REST API documentation

**Bigger Things**

- It was challenging to find the /dotAdmin login in the site documentation; I didn't even know that I needed to find the admin path, to figure out what was exposed in the demo site and how to access it
- Why is the NavBar authenticated when the Blogs / GraphQL access are *not*?
- (for me) Consider doing *a* thing with the SDK... maybe page-layout? Already building recursive-descent components for `blogContent`, so `PageView` is more of the same. Just so that I have a sense of how it operates and can speak to it
- (for me) Consider using blog tags to query Banner / Promo
