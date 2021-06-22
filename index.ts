import { ServiceBroker } from "moleculer";

export default function tracingBrokerCalls(name: string = "no-service") {
	const spanOptions = { service: { fullName: name } };
	return {
		call(next: any) {
			return function( this: ServiceBroker, actionName: string, params: any, opts: any = {} ) {
				let span: any;
				let spanOpt: {[k: string]: any} = Object.assign(spanOptions, {}); //clone spanOptions for each call
				
				//set parent span-infos if available, so the request could be 
				//traced through all services
		        if (opts.requestID != null) {
                    spanOpt.requestID = opts.requestID;
                }
                if(opts.parentCtx != null && opts.parentCtx.span != null && opts.parentCtx.span.id != null){
                    spanOpt.parentID = opts.parentCtx.span.id;
                    spanOpt.traceID = opts.parentCtx.span.traceID;
                    spanOpt.tracing = opts.parentCtx.span.sampled;
                    spanOpt.requestID = spanOpt.requestID || opts.parentCtx.span.requestID;
                } 

				if ( this && this.hasOwnProperty("tracer") && false !== this.tracer.isEnabled()  ){
					span = this.tracer.startSpan("calling: " + actionName, spanOpt );
					
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
