"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function tracingBrokerCalls(name = 'no-service') {
    let spanOptions = { service: { fullName: name } };
    return {
        call(next) {
            return function (actionName, params, opts) {
                const span = this.tracer.startSpan('calling: ' + actionName, spanOptions);
                opts = opts || {};
                opts.parentSpan = span;
                return next(actionName, params, opts)
                    .finally(() => {
                    span.finish();
                });
            };
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxrQkFBa0IsQ0FBQyxPQUFlLFlBQVk7SUFDcEUsSUFBSSxXQUFXLEdBQUcsRUFBQyxPQUFPLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUMsQ0FBQztJQUM5QyxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQVM7WUFDVixPQUFPLFVBQStCLFVBQWtCLEVBQUUsTUFBVyxFQUFFLElBQVM7Z0JBQzVFLE1BQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQy9FLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7cUJBQ2hDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFDIn0=