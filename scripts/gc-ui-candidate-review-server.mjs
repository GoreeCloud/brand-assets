/**
 * Local-only, read-only inspection of the rejected GoreeCloud UI design archive.
 *
 * Never serves official masters, project metadata, source maps, or arbitrary
 * filesystem paths. No network dependencies, telemetry, generated images,
 * persistent writes, authentication tokens or dynamic remote URLs.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const folder = new URL("../products/gc-ui/candidates/frame-relay-v1/", import.meta.url);
const sources = new Map([
  ["/review.html", ["review.html", "text/html; charset=utf-8"]],
  ["/app-icon.svg", ["app-icon.svg", "image/svg+xml"]],
  ["/symbol.svg", ["symbol.svg", "image/svg+xml"]],
  ["/favicon.svg", ["favicon.svg", "image/svg+xml"]],
  ["/logo-light.svg", ["logo-light.svg", "image/svg+xml"]],
  ["/logo-dark.svg", ["logo-dark.svg", "image/svg+xml"]],
  ["/artwork.svg", ["artwork.svg", "image/svg+xml"]]
]);
const csp = [
  "default-src 'none'",
  "img-src 'self'",
  "style-src 'unsafe-inline'",
  "script-src 'none'",
  "object-src 'none'",
  "connect-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'"
].join("; ");

function headers(res, status, type = "text/plain; charset=utf-8", length = 0) {
  res.writeHead(status, {
    "Content-Type": type,
    "Content-Length": String(length),
    "Cache-Control": "no-store",
    "Content-Security-Policy": csp,
    "Cross-Origin-Resource-Policy": "same-origin",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  });
}

export function createCandidateReviewServer() {
  const server = createServer(async (req, res) => {
    const method = req.method || "";
    if (method !== "GET" && method !== "HEAD") {
      res.writeHead(405, { "Allow": "GET, HEAD", "Cache-Control": "no-store" });
      res.end();
      return;
    }
    // Exact, fixed-origin paths only. Refuse escape sequences and all queries:
    // this isn't a generic file server, a route resolver, or an API.
    const requested = req.url || "";
    if (!requested.startsWith("/") || /[%?#\\]/.test(requested)) {
      headers(res, 404);
      res.end();
      return;
    }
    const route = requested === "/" ? "/review.html" : requested;
    const resource = sources.get(route);
    if (!resource) {
      headers(res, 404);
      res.end();
      return;
    }
    const [filename, mime] = resource;
    try {
      const bytes = await readFile(new URL(filename, folder));
      if (bytes.length > 64 * 1024) throw new Error("Local review asset exceeds size limit");
      headers(res, 200, mime, bytes.length);
      res.end(method === "HEAD" ? undefined : bytes);
    } catch {
      // Do not leak local filesystem details or path contents to clients.
      if (!res.headersSent) headers(res, 500);
      res.end();
    }
  });
  server.requestTimeout = 10_000;
  server.headersTimeout = 5_000;
  return server;
}

function parsePort(argv) {
  if (argv.length === 1 && argv[0] === "--help") return null;
  if (argv.length === 0) return 8766;
  if (argv.length !== 2 || argv[0] !== "--port" || !/^\d+$/.test(argv[1])) {
    throw new TypeError("Usage: node scripts/gc-ui-candidate-review-server.mjs [--port 8766]");
  }
  const port = Number(argv[1]);
  if (!Number.isSafeInteger(port) || port < 1024 || port > 65535)
    throw new RangeError("Port must be an integer between 1024 and 65535");
  return port;
}

const invoked = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (invoked) {
  try {
    const port = parsePort(process.argv.slice(2));
    if (port === null) {
      console.log("Usage: node scripts/gc-ui-candidate-review-server.mjs [--port 8766]");
    } else {
      const server = createCandidateReviewServer();
      server.once("error", error => { console.error("Local review unavailable:", error.code || error.message); process.exitCode = 1; });
      server.listen(port, "127.0.0.1", () => {
        console.log("REJECTED identity archive (not for adoption): http://127.0.0.1:" + port + "/review.html");
        console.log("Press Ctrl+C to stop. Rejected concept only; no existing application identity is changed.");
      });
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
