import {ServiceBroker} from "moleculer";

export default function tracingBrokerCalls(name: string = "no-service") {
	const spanOptions = {service: {fullName: name}};
	return {
		call(next: any) {
			return function(this: ServiceBroker, actionName: string, params: any, opts: any) {
				const span: any = this.tracer.startSpan("calling: " + actionName, spanOptions);
				opts = opts || {};
				opts.parentSpan = span;
				return next(actionName, params, opts)
					.finally(() => {
						span.finish();
					});
			};
		},
	};
}
