import {ServiceBroker} from "moleculer";

module.exports = function tracingBrokerCalls(name: string = 'no-service') {
    let spanOptions = {service: {fullName: name}};
    return {
        call(next: any) {
            return function (this: ServiceBroker, actionName: string, params: any, opts: any) {
                const span: any = this.tracer.startSpan('calling: ' + actionName, spanOptions);
                opts = opts || {};
                opts.parentSpan = span;
                return next(actionName, params, opts)
                    .finally(() => {
                        span.finish();
                    });
            };
        },
    }
};