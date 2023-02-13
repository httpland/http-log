# http-log

HTTP log middleware for standard `Request` and `Response`.

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware is exported by default.

```ts
import logger from "https://deno.land/x/http_log@$VERSION/mod.ts";

const middleware = logger();
middleware(new Request("http://localhost"), () => new Response("ok"));
```

output:

```bash
<method> <url:path:?search> <colored:response-status> <headers:content-length:unit> - <response-time:unit>
GET / 200 - 10ms
```

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
