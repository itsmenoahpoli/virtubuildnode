import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { initializeApiRoutes } from "@/routers";
import {
  initializeMiddlewares,
  GlobalErrorHandlerMiddleware,
} from "@/middlewares";
import { initializeDatabase } from "@/database";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";
import {
  swaggerSpec,
  swaggerUi,
  swaggerUiOptions,
} from "@/configs/swagger.config";

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.disable("powered-by");

initializeMiddlewares(app);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

initializeApiRoutes(app);
initializeDatabase();

app.use(GlobalErrorHandlerMiddleware);

const runApp = (): void => {
  const appPort = SETTINGS.APP_PORT;

  if (!appPort) {
    console.error(`[ERROR]: No app port specified from settings`);
    return;
  }

  app.listen(appPort, "0.0.0.0", () => {
    if (SETTINGS.APP_ENV === AppEnvironments.DEV) {
      console.info(`[APP]: App started and running in ${SETTINGS.APP_URL}`);
      console.info(
        `[SWAGGER]: API documentation available at ${SETTINGS.APP_URL}/api-docs`
      );
    }
  });
};

export { runApp };
