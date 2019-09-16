module.exports = function tracingBrokerCalls(name='no-service'){
	spanOptions = {service: {fullName: name}};
	return {
		call(next) {
			return function(actionName, params, opts) {
				const span = this.tracer.startSpan('calling: ' + actionName, spanOptions);
				opts = opts || {};
				opts.parentSpan = span;
				return next(actionName, params, opts)
					.finally(()=>{
						span.finish();
				});
			};
		},
	}
}