# http-log

HTTP request and response log middleware and format utilities.

## Usage

```ts
import { createHandler } from "https://deno.land/x/http_log/mod.ts";

const logHandler = createHandler();
logHandler(new Request("http://localhost"));
```

output:

```bash
<method> <url-path> <colored:response-status> - <response-time>ms
GET / 200 - 10ms
```

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
