# Findings

Musings about challenges / issues / hang-ups.

In the initial "meet the leads" interview, the message that I took from the meeting was that the goal is to help pre-existing customers get more value out of their investment.

This project has been approached from the standpoint of:

> I can't understand the friction and rigidity, and stickiness of patterns, unless I go deep on it, myself.
> If there are new customers using new tools which wrap the experience, that's great, but I know a LOT of enterprises with a LOT of Legacy and Legacy*-Nouveau* code, who put pressure on their developers / designers, to update experiences, or deliver experiences to different device formats, without rewrites or getting stuck in technical debt.
> I can't help them if my understanding is as deep as "put it in the magic box, and a styled page comes out the other side".
> For some of the bigger companies, the devs doing the integrating and the content authors aren't even in the same corporate entity, let alone on the same team.
> The companies that are fine with WYSIWYG layouts and the majority of control being in the walled-garden, with designers and content-authors doing the majority of development in the CMS are probably *fine*, or even happy, so long as they don't want to deviate from their templated page, on a desktop site.
> I have no stats or insights into which clients use what, to which degree, so I choose to think about the ones who would actively *seek* to build dynamic experiences, using dotCMS as the backbone of their managed / published content, but not the backbone of their experience / behavioral design. 

The following contents are, in large part, a reflection upon that.

## Developer Experience

The goal I gave myself was to think like a developer, being tasked with making *new* things, using existing content and exposed API features.

If I were part of a 10-person company, who had existing CMS templated pages / content, but wanted to use that content to build *new* experiences (bring in a designer-led design-system, port some content into a native mobile app, without wrapping the page in a WebView container, et cetera)

### Documentation

- API Playground does *not* match the API docs
  - as an example, AUTH:
    - OpenAPI Playground: `POST /api/v1/authentication`
    - DotCMS Authentication Docs: `POST /api/v1/authentication/api-token/`
  - links in the documentation `/docs/latest/` (not necessarily the dotAdmin backend) 
- finding information on binding `ContentType` schemas with `Content` from the standpoint of manually creating a new widget, from existing published data, outside of the Headed walled garden is ***hard***

## CMS Connection

- The /graphql endpoint exposed is trailing-slash sensitive
- The /graphql endpoint can bail on preflight OPTIONS calls

## Content Implementation

- some JSON content (`BlogContent`) is a node-based tree that can be walked
- some JSON content (`Banner`) is a `contentlet` meant to be plugged into a Container
- even when asking for Headless JSON access to data (`PageLayout`), the body expects a live head (at minimum a binding to ) and Velocity metaprogramming `"widgetCode" : "#dotParse('/application/vtl/carousel/banner-carousel.vtl')"`
  - which leads to a metaprogrammed HTML template
  - that metaprogrammed HTML template can only exist ***1*** time on the page, because it has a hardcoded `id="bannerCarousel"` id. Meaning that while you could *technically* put more of them on a page, only the first one in the HTML DOM tree is accessible, via JS, by ID, unless the innards of this template are dynamically modified at runtime, and not just injected via `parent.innerHTML = container` ... and given multiple portions of the template include reference to that ID, hardcoded (the carousel container itself, but also the anchor tags), I feel that's unlikely.
