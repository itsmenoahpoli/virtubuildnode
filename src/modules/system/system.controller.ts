import { type Request, type Response, type NextFunction, type RequestHandler } from "express";
import { HttpStatusCode } from "@/types";

export const SystemController = {
	healthcheck: (request: Request, response: Response, next: NextFunction): void => {
		response
			.status(HttpStatusCode.OK)
			.json({
				message: "SYSTEM_ONLINE",
			})
			.send();
	},
};
