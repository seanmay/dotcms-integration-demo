# Sean May: DotCMS Blog Implementation

Apologies for the tangles.

Getting it started:

- cd to root of project (you're here)

```bash
$> npm i
$> npm run build:client
$> npm run serve
```

You may be prompted to hit `-y` on serve, if you haven't used http-serve, prior.

Open `http://127.0.0.1:8080`

Note that this will store some data in IndexedDB; if you want to clear your caches/app storage, after the fact. Or consider running in an anonymous instance.

Please check [CONSIDERATIONS.md](CONSIDERATIONS.md) for some potential high-level concerns with the demo platform.
