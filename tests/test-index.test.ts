
import { ServiceBroker, Middleware } from "moleculer";
import middleware from "./../index";

describe("A broker call", () => {
	it("should add a span", async () => {
		let span: any;
		const sBroker = new ServiceBroker({
			logLevel: undefined,
			middlewares: [middleware("invoker") as Middleware]
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
