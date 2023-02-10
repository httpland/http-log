import { type ChainableHandler } from "./deps.ts";
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

/**
 * @example
 * ```ts
 * import { createHandler } from "https://deno.land/x/http_log/mod.ts";
 *
 * const logger = createHandler();
 * logger(new Request("http://localhost"))
 * ```
 *
 * output:
 * ```bash
 * <method> <url-path> <colored:response-status> - <response-time>ms
 * ```
 */
export function createHandler(options?: Options): ChainableHandler {
  const { onLog = console.log } = options ?? {};

  const handler: ChainableHandler = async (request, next) => {
    const start = performance.now();

    const response = await next();

    const end = performance.now();
    const context: Context = { start, end };
    const responseLog = formatResponse(request, response, context);

    onLog(responseLog);

    return response;
  };

  return handler;
}
