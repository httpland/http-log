import { type Middleware } from "./deps.ts";
import { formatResponse } from "./format.ts";
import type { Context } from "./types.ts";

export interface Options {
  /**
   * @default console.log
   */
  readonly onLog?: LogCallback;
}

export interface LogCallback {
  (text: string): void;
}

/** Create HTTP logger middleware.
 *
 * @example
 * ```ts
 * import logger from "https://deno.land/x/http_log@$VERSION/mod.ts";
 *
 * const middleware = logger();
 * middleware(new Request("http://localhost"), () => new Response("ok"))
 * ```
 *
 * output:
 * ```bash
 * <method> <url:path:?search> <colored:response-status> <headers:content-length:unit> - <response-time:unit>
 * ```
 */
export function logger(options?: Options): Middleware {
  const { onLog = console.log } = options ?? {};

  const handler: Middleware = async (request, next) => {
    const start = performance.now();

    const response = await next(request.clone());

    const end = performance.now();
    const context: Context = { start, end };
    const responseLog = formatResponse(
      request.clone(),
      response.clone(),
      context,
    );

    onLog(responseLog);

    return response;
  };

  return handler;
}
