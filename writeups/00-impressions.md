# Impressions / Intent

Documenting initial thought processes, relating to the reading of the challenge prompt, and initial ideas relating to approach, goals, pros / cons, etc. Mostly a "thinking out loud" scratch-pad.

## Assessment

### Criterion #1: Build a Web App

- Aim to build a 0-backend SPA, "just http serve index.html, somehow" app if it can be helped (include means / instructions, via `npx ` command, or whatever)...
- Consider React or LitHTML, avoid boilerplate-heavy frameworks
- ServiceWorker for caching? Build a 
- Personal goal is minimizing devops overhead: focus on page and source code, and minimize time futzing with build process / config / hosting / tooling / etc
- Additional personal goal: try to ad-hoc more than leaning on libraries; want to "get it done", but also want to demonstrate actual problem-solving, given the nature of the role. Risk of less polish / cohesion, but also, the role will be to assess client needs and understand the breadth of the challenge; saying "put bootstrap on it!" won't suffice (though perhaps Shadcn-UI could act as a basis for some of the actual visual components ... if it doesn't conflict too deeply with CDN data layout, and any potentially embedded HTML with embedded styling)


### Criterion #2: Build Components

**Expected Component List**  

- Banner (carousel ... consider mechanisms and accessibility)
- Promo (? figure out dimensions / placement)
- BlogRoll & Page
- Blog & Page
- NavBar

**The Rest of the Owl**

- Sign-in(?) don't want to commit secrets; don't really want to write a proxy with manual setup, expressly for auth, though
- caching fetch service? ServiceWorker?


### Bonus Points

- NavigationAPI for navbar
- render a PageAPI page, by laying out provided content (is there a ... node-based mode for the PageAPI, or does it all include embedded HTML?)
- use GraphQL for blog list / blog pages
- demonstrate addition of components in CMS and have them show up on-site

## Tactics

- Focus on auth and CMS connections, before anything else
- Build in support for GraphQL queries / Nav REST queries, from the start
- Is there a WebSocket to bind or WebHook to register for content updates?
- Nail data-handling, macro layout, component / service separation, app orchestration...
- ...then focus on polish
