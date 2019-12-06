"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tracingBrokerCalls(name = "no-service") {
    const spanOptions = { service: { fullName: name } };
    return {
        call(next) {
            return function (actionName, params, opts) {
                let span;
                if (this && this.hasOwnProperty("tracer") && false !== this.tracer.isEnabled()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQXdCLGtCQUFrQixDQUFDLE9BQWUsWUFBWTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3BELE9BQU87UUFDTixJQUFJLENBQUMsSUFBUztZQUNiLE9BQU8sVUFBK0IsVUFBa0IsRUFBRSxNQUFXLEVBQUUsSUFBUztnQkFDL0UsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsSUFBSyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRztvQkFDakYsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLEVBQUUsV0FBVyxDQUFFLENBQUM7b0JBQ3JFLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDdkI7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7cUJBQ25DLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ2IsSUFBRyxJQUFJLEVBQUM7d0JBQ1AsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBcEJELHFDQW9CQyJ9