## Potential Issues w/ Platform and / or Config

The following issues were enough of a worry that I thought I would mention them, here, just in case.  
If they are specific to the test-bed, or they are the result of end-user setup, and aren't this way by default, that's fine, but I thought they would warrant a deeper look, if they are causing customer problems, or are flying under the radar:

1. the Page API dumps IP / geographical information on frdont-end requests, without prompting for it
    - if improperly handled, or if improperly cached, or thoughtlessly embedded, this could be a problem
2. the GraphQL binding appears to fail on preflight OPTIONS calls, meaning auth headers are not allowed.

Please look into these. Again, if this is 100% tenant (/self-host) config, then that's cool.

## Challenges with Take-Home / Challenges as a Customer / External Developer

Less-important, but if you have multiple people going through this challenge, or this test-bed is used for onboarding customers (or their instances work similarly), these things should be looked into as a way of reducing friction:

1. Navigation API requires auth
   - the navbar **can't work for guests**, while the GraphQL API **must be public** (in a Headless + CORS workflow)
   - both have strong cases for guest and authenticated access
2. The CMS **ContentType** for `Banner` in the take-home, all of its associated Velocity templates, all of its associated **Content**, all refer to the full-screen splash, on the index page, in the "Hero" position, with multiple pieces of content, but only 1 published example exists (the full-screen splash)
   - I understood the request in the take-home prompt for an ad/product based carousel, but by the time I found the published example for `Banner`, to understand how to lay out the content for `Banner` data, it was already day-5, so I made the `BannerCarousel` out of splash screens, on the last day; additionally, I made the included product-cards within product placements, rotate through their images, via cross-fade
   - Please consider changing the prompt / instructions / **ContentType** in the test-bed, et cetera, to make this clearer, either for future candidates, or for any client developer, trying to understand the application
   - As a corollary to this request, please consider adding (or making more apparent) a visualization for the actual composite component, rather than just its individual parts, outside of a page context. The only reason I identified the `Banner` was because I recognized where the image was being used, and could cross-reference that with the payload for that particular banner, and the layout of the .vtl
3. Documentation on the demo site, even logged in, will link to tools / sandboxes which will 404, or 401 (), on the destination site; one was a 5XX Gateway error.
4. Similar to #3, the OpenAPI generated endpoint documentation didn't match the resources outlined in the www.dotcms.com endpoint.


Additionally: I didn't get as deep as I wanted to in the "with tooling" experience, because of the snags I hit with the toolless approach; and the toolless approach was landed on, because the role is to help customers get *more* out of a CMS, and a lot of clients I've worked with have legacy systems, and devs / QAs who aren't even in tthe same department as content/marketing, or there is a development team backing the CMS view, but are not the team who are asked to make things work on the front-end.

To that end, lower-importance concerns, which I didn't get to test deeply, were 1 instance per kind of Content per Container, et cetera.
