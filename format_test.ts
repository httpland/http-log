import { assertEquals, describe, it } from "./_dev_deps.ts";
import { formatResponse, formatURL } from "./format.ts";
import { green, red, yellow } from "./deps.ts";

describe("formatResponse", () => {
  it("should pass", () => {
    const table: [Request, Response, string][] = [
      [
        new Request("http://localhost"),
        new Response(),
        `GET / ${green("200")} - 10ms`,
      ],
      [
        new Request("http://localhost/root", { method: "POST" }),
        new Response(null, { status: 404 }),
        `POST /root ${yellow("404")} - 10ms`,
      ],
      [
        new Request("http://localhost/root?test=test#hash", { method: "POST" }),
        new Response(null, { status: 500 }),
        `POST /root?test=test#hash ${red("500")} - 10ms`,
      ],
    ];

    table.forEach(([request, response, expected]) => {
      const actual = formatResponse(request, response, { start: 0, end: 10 });

      assertEquals(actual, expected);
    });
  });
});

describe("formatURL", () => {
  it("should pass", () => {
    const table: [URL, string][] = [
      [new URL("http://localhost"), `/`],
      [new URL("http://localhost/root"), `/root`],
      [new URL("http://localhost/root/"), `/root/`],
      [new URL("http://localhost/root/?test=test"), `/root/?test=test`],
      [
        new URL("http://localhost/root/?test=test#hash"),
        `/root/?test=test#hash`,
      ],
    ];

    table.forEach(([url, expected]) => {
      const actual = formatURL(url);

      assertEquals(actual, expected);
    });
  });
});
