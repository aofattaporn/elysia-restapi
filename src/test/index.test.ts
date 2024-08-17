// test/index.test.ts
import { describe, expect, it } from "bun:test";
import { app } from "..";

describe("index.test", () => {
  it("testing => GET: /hello ", async () => {
    const response = await app
      .handle(new Request("http://localhost/hello"))
      .then((res) => res.text());

    expect(response).toBe("Helloworld");
  });
});
