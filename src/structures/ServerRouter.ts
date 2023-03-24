import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as errorCodes from "../utilities/errorCodes";

import { IRoute } from "../utilities/types";
import { readdir } from "fs/promises";
import { join } from "path";

export default class ServerRouter {
  private readonly PORT = Number(process.env.PORT) || 3000;
  public app: express.Application = express();
  public router: Router = express.Router();
  public server;

  constructor() {
    this.init();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(join(__dirname, "..", "dist")));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use("/api", this.router);
    this.app.get("/*", (req, res) => {
      res.sendFile(join(__dirname, "..", "dist", "index.html"));
    });
    this.app.get("/*", (req, res) => errorCodes.notFoundError(res));
    this.server = this.app.listen(this.PORT, () => {
      console.log(`http://localhost:${this.PORT}`);
    });
  }

  async init() {
    const routeFiles = await readdir(join(__dirname, "..", "routes"));

    for (const file of routeFiles) {
      const route: IRoute = await import(`../routes/${file}`);
      this.router.use(route.default.path, route.default.router);
    }
  }
}
