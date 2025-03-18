import { Application } from "express";
import { SystemRouter, AuthRouter, UserRolesRouter } from "./module-routers";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";

const routesConfig = [
	{
		uri: "/system",
		router: SystemRouter,
	},
	{
		uri: "/auth",
		router: new AuthRouter().routerRoutes,
	},
	{
		uri: "/user-roles",
		router: new UserRolesRouter().routerRoutes,
	},
];

const printRouteRoutes = (route: any) => {
	const uriModule = route.uri.replace("/", "").toUpperCase();
	console.log("--------------------------------------------------------------------------------------");
	console.log(`${uriModule} ${route.uri} Routes \n---------------`);

	route.router.stack.forEach((stack: any) => {
		if (stack.route) {
			// @ts-ignore
			const methods = Object.keys(stack.route?.methods).join(", ").toUpperCase();

			console.log(`${methods} ${route.uri}${stack.route.path}`);
		}
	});
	console.log("--------------------------------------------------------------------------------------");
};

export const initializeApiRoutes = (app: Application, apiPrefix: string = "/api") => {
	routesConfig.forEach((route) => {
		const uri: string = apiPrefix.concat(route.uri);

		app.use(uri, route.router);

		if (SETTINGS.checkCurrentEnvironment(AppEnvironments.DEV)) {
			printRouteRoutes(route);
		}
	});
};
