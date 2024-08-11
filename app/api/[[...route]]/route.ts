import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// Handle errors
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal server error" });
});

const routes = app.route("/accounts", accounts);

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
