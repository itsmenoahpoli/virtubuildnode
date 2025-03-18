import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { APP_SENTRY_DSN } from "./settings.config";

Sentry.init({
	dsn: APP_SENTRY_DSN,
	integrations: [nodeProfilingIntegration()],
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
});
