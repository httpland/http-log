import {
  blue,
  formatBytes,
  green,
  isClientErrorStatus,
  isInformationalStatus,
  isRedirectStatus,
  isServerErrorStatus,
  isSuccessfulStatus,
  red,
  type Status,
  white,
  yellow,
} from "./deps.ts";
import type { Context } from "./types.ts";

interface Format {
  // deno-lint-ignore no-explicit-any
  (...args: readonly any[]): string;
}

export interface FormatStr extends Format {
  (input: string): string;
}

export interface MatchResponse {
  (response: Response): boolean;
}

export interface Formatter {
  readonly match: MatchResponse;
  readonly format: FormatStr;
}

export interface CheckStatus {
  (status: Status): boolean;
}

export function withStatus(checkStatus: CheckStatus): MatchResponse {
  return (response) => checkStatus(response.status);
}

export const statusFormatters: Formatter[] = [
  { match: withStatus(isInformationalStatus), format: white },
  { match: withStatus(isSuccessfulStatus), format: green },
  { match: withStatus(isRedirectStatus), format: blue },
  { match: withStatus(isClientErrorStatus), format: yellow },
  { match: withStatus(isServerErrorStatus), format: red },
];

export function formatURL(url: URL): string {
  return url.pathname + url.search + url.hash;
}

export function formatResponse(
  request: Request,
  response: Response,
  context: Context,
): string {
  const diff = context.end - context.start;
  const method = request.method;
  const url = new URL(request.url);
  const urlStr = formatURL(url);
  const status = response.status;
  const statusFormatter = statusFormatters.find(({ match }) => match(response));
  const statusStr = statusFormatter?.format(status.toString()) ?? status;
  const msStr = Math.round(diff) + "ms";
  const contentLength = response.headers.get("content-length");
  const contentLengthStr = contentLength
    ? formatBytes(Number(contentLength)).replace(" ", "")
    : undefined;
  const tokens = [method, urlStr, statusStr, contentLengthStr, "-", msStr]
    .filter(Boolean);

  return tokens.join(" ");
}
