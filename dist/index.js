"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tracingBrokerCalls(name = "no-service") {
    const spanOptions = { service: { fullName: name } };
    return {
        call(next) {
            return function (actionName, params, opts) {
                const span = this.tracer.startSpan("calling: " + actionName, spanOptions);
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
exports.default = tracingBrokerCalls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQXdCLGtCQUFrQixDQUFDLE9BQWUsWUFBWTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3BELE9BQU87UUFDTixJQUFJLENBQUMsSUFBUztZQUNiLE9BQU8sVUFBK0IsVUFBa0IsRUFBRSxNQUFXLEVBQUUsSUFBUztnQkFDL0UsTUFBTSxJQUFJLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQVUsRUFBRSxXQUFXLENBQUUsQ0FBQztnQkFDaEYsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztxQkFDbkMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDYixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBZkQscUNBZUMifQ==