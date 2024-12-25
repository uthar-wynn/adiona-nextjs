import { Hono } from "hono"
import { handle } from "hono/vercel"

import costs from "@/features/costs/server/route"
import fillups from "@/features/fillups/server/route"
import vehicles from "@/features/vehicles/server/route"

const app = new Hono().basePath("/api")

const routes = app
    .route("/fillups", fillups)
    .route("/costs", costs)
    .route("/vehicles", vehicles)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes