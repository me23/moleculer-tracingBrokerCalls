const moleculer = require('moleculer');
const middleware = require('./../index');

describe('A broker call', () => {
	it ('should add a span', async () => {
		let span;
		const sBroker = new moleculer.ServiceBroker({
			logLevel: 'none',
			middlewares: [middleware('invoker')],
		});
		const service = sBroker.createService({
			name: 'service',
			actions: {
				ping(ctx){
					span = ctx.options.parentSpan;
					return Promise.resolve('pong');
				}
			}
		});
		return new Promise((resolve, reject) => {
			sBroker.start().then(() => {
				sBroker.call('service.ping')
					.then((res) => {
						expect(res).toBe('pong');
						expect(span.name).toBe('calling: service.ping');
						expect(span.service.fullName).toBe('invoker');
						resolve();
					})
					.catch((err)=>{
						reject(err);
					});
			});
		});
	});
});