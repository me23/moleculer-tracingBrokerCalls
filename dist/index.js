"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tracingBrokerCalls(name = "no-service") {
    const spanOptions = { service: { fullName: name } };
    return {
        call(next) {
            return function (actionName, params, opts) {
                let span;
                if (this.tracer) {
                    span = this.tracer.startSpan("calling: " + actionName, spanOptions);
                    opts = opts || {};
                    opts.parentSpan = span;
                }
                return next(actionName, params, opts)
                    .finally(() => {
                    if (span) {
                        span.finish();
                    }
                });
            };
        },
    };
}
exports.default = tracingBrokerCalls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQXdCLGtCQUFrQixDQUFDLE9BQWUsWUFBWTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3BELE9BQU87UUFDTixJQUFJLENBQUMsSUFBUztZQUNiLE9BQU8sVUFBK0IsVUFBa0IsRUFBRSxNQUFXLEVBQUUsSUFBUztnQkFDL0UsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQVUsRUFBRSxXQUFXLENBQUUsQ0FBQztvQkFDckUsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjtnQkFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztxQkFDbkMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDYixJQUFHLElBQUksRUFBQzt3QkFDUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2Q7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUM7UUFDSCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFwQkQscUNBb0JDIn0=