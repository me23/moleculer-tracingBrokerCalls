
import { ServiceBroker, Middleware } from "moleculer";
import middleware from "./../index";

describe("A broker call", () => {

	it("should NOT add a span", async () => {
		let span: any;
		const sBroker = new ServiceBroker({
			logLevel: 'fatal',
			middlewares: [middleware("invoker") as Middleware],
			tracing: {
				enabled: false,
			}
		});
		const service = sBroker.createService({
			name: "service",
			actions: {
				ping(ctx: any) {
					span = ctx.options.parentSpan;
					return Promise.resolve("pong");
				}
			}
		});
		return new Promise((resolve, reject) => {
			(sBroker.start() as Promise<any>)
				.then(() => {
					sBroker.call("service.ping").then((res: any) => {
						expect(res).toBe("pong");
						expect(span).toBe(undefined);
						resolve();
					});
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	});
	it("should add a span", async () => {
		let span: any;
		const sBroker = new ServiceBroker({
			logLevel: 'fatal',
			middlewares: [middleware("invoker") as Middleware],
			tracing: {
				enabled: true,
				stackTrace: true,
			}
		});
		const service = sBroker.createService({
			name: "service",
			actions: {
				ping(ctx: any) {
					span = ctx.options.parentSpan;
					return Promise.resolve("pong");
				}
			}
		});
		return new Promise((resolve, reject) => {
			(sBroker.start() as Promise<any>)
				.then(() => {
					sBroker.call("service.ping").then((res: any) => {
						expect(res).toBe("pong");
						expect(span.name).toBe("calling: service.ping");
						expect(span.service.fullName).toBe("invoker");
						resolve();
					});
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	});
});
