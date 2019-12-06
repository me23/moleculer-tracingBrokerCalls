import { ServiceBroker } from "moleculer";

export default function tracingBrokerCalls(name: string = "no-service") {
	const spanOptions = { service: { fullName: name } };
	return {
		call(next: any) {
			return function( this: ServiceBroker, actionName: string, params: any, opts: any ) {
				let span: any;
				if ( this.hasOwnProperty("tracer") && false !== this.tracer.isEnabled()  ){
					span = this.tracer.startSpan("calling: " + actionName, spanOptions );
					opts = opts || {};
					opts.parentSpan = span;
				}
				return next(actionName, params, opts)
					.finally(() => {
						if(span){
							span.finish();
						}
				});
			};
		},
	};
}
