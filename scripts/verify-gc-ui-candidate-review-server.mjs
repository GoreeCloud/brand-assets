/**
 * Integration checks for the candidate's loopback-only, read-only preview.
 * Uses Node's native HTTP client, never opens a browser or generates imagery.
 */
import assert from "node:assert/strict";
import { request } from "node:http";
import { createCandidateReviewServer } from "./gc-ui-candidate-review-server.mjs";

const server = createCandidateReviewServer();
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

function get(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = request({
      host: "127.0.0.1",
      port: server.address().port,
      path, method,
      timeout: 3000
    }, res => {
      const buffers = [];
      res.on("data", chunk => buffers.push(chunk));
      res.on("end", () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: Buffer.concat(buffers).toString("utf8")
      }));
      res.on("error", reject);
    });
    req.once("error", reject);
    req.once("timeout", () => req.destroy(new Error("Loopback preview timeout")));
    req.end();
  });
}

try {
  assert.equal(server.address().address, "127.0.0.1");
  const html = await get("/review.html");
  assert.equal(html.status, 200);
  assert.match(html.headers["content-type"], /^text\/html/);
  assert.equal(html.headers["cache-control"], "no-store");
  assert.equal(html.headers["x-content-type-options"], "nosniff");
  assert.equal(html.headers["cross-origin-resource-policy"], "same-origin");
  assert.equal(html.headers["referrer-policy"], "no-referrer");
  assert.match(html.headers["content-security-policy"], /script-src 'none'/);
  assert.match(html.headers["content-security-policy"], /connect-src 'none'/);
  assert.match(html.body, /Not approved\./);
  assert.equal((await get("/")).body, html.body, "Landing path must open the review, not a file listing");

  for (const name of [
    "app-icon.svg","symbol.svg","favicon.svg",
    "logo-light.svg","logo-dark.svg","artwork.svg"
  ]) {
    const response = await get("/" + name);
    assert.equal(response.status, 200, name);
    assert.equal(response.headers["content-type"], "image/svg+xml");
    assert.match(response.body, /^<svg xmlns=/);
    assert.equal(Number(response.headers["content-length"]), Buffer.byteLength(response.body));
    const head = await get("/" + name, "HEAD");
    assert.equal(head.status, 200);
    assert.equal(head.body.length, 0);
    assert.equal(head.headers["content-length"], response.headers["content-length"]);
  }

  for (const path of [
    "/README.md", "/manifest.json", "/../../package.json", "/.git/config",
    "/%2e%2e/package.json", "/favicon.svg?download=1",
    "/favicon.svg#hash", "/%66avicon.svg", "//example.org/favicon.svg"
  ]) {
    assert.equal((await get(path)).status, 404, path + " must not leak repo content");
  }
  assert.equal((await get("/review.html", "POST")).status, 405);
  assert.equal((await get("/favicon.svg", "PUT")).status, 405);
  console.log("PASS GC UI candidate loopback review: 7 allowlisted files, secure headers, method/path rejection, no derivatives or network fetches");
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}
