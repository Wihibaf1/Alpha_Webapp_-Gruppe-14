import { defineApp } from "rwsdk/worker"
import { route, render } from "rwsdk/router"

import { Document } from "@/app/Document"
import { Home } from "@/app/pages/Home"
import { Login } from "@/app/pages/LoginPage"
import { Recipes } from "@/app/pages/Recipes"

export default defineApp([
  render(Document, [
    route("/", () => <Login />),
    route("/login", () => <Login />),
    route("/home", () => <Home />),
    route("/recipes", () => <Recipes />),
    route("/ping", () => <h1>Pong!</h1>),
  ]),
])
