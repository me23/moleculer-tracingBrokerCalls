"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const index_1 = __importDefault(require("./../index"));
describe("A broker call", () => {
    it("should NOT add a span", async () => {
        let span;
        const sBroker = new moleculer_1.ServiceBroker({
            logLevel: 'fatal',
            middlewares: [index_1.default("invoker")],
            tracing: {
                enabled: false,
            }
        });
        const service = sBroker.createService({
            name: "service",
            actions: {
                ping(ctx) {
                    span = ctx.options.parentSpan;
                    return Promise.resolve("pong");
                }
            }
        });
        return new Promise((resolve, reject) => {
            sBroker.start()
                .then(() => {
                sBroker.call("service.ping").then((res) => {
                    expect(res).toBe("pong");
                    expect(span).toBe(undefined);
                    resolve();
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
    it("should add a span", async () => {
        let span;
        const sBroker = new moleculer_1.ServiceBroker({
            logLevel: 'fatal',
            middlewares: [index_1.default("invoker")],
            tracing: {
                enabled: true,
                stackTrace: true,
            }
        });
        const service = sBroker.createService({
            name: "service",
            actions: {
                ping(ctx) {
                    span = ctx.options.parentSpan;
                    return Promise.resolve("pong");
                }
            }
        });
        return new Promise((resolve, reject) => {
            sBroker.start()
                .then(() => {
                sBroker.call("service.ping").then((res) => {
                    expect(res).toBe("pong");
                    expect(span.name).toBe("calling: service.ping");
                    expect(span.service.fullName).toBe("invoker");
                    resolve();
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1pbmRleC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvdGVzdC1pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EseUNBQXNEO0FBQ3RELHVEQUFvQztBQUVwQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUU5QixFQUFFLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdEMsSUFBSSxJQUFTLENBQUM7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFhLENBQUM7WUFDakMsUUFBUSxFQUFFLE9BQU87WUFDakIsV0FBVyxFQUFFLENBQUMsZUFBVSxDQUFDLFNBQVMsQ0FBZSxDQUFDO1lBQ2xELE9BQU8sRUFBRTtnQkFDUixPQUFPLEVBQUUsS0FBSzthQUNkO1NBQ0QsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRTtnQkFDUixJQUFJLENBQUMsR0FBUTtvQkFDWixJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQzlCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsQ0FBQzthQUNEO1NBQ0QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsS0FBSyxFQUFtQjtpQkFDL0IsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2xDLElBQUksSUFBUyxDQUFDO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBYSxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxDQUFDLGVBQVUsQ0FBQyxTQUFTLENBQWUsQ0FBQztZQUNsRCxPQUFPLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsVUFBVSxFQUFFLElBQUk7YUFDaEI7U0FDRCxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFO2dCQUNSLElBQUksQ0FBQyxHQUFRO29CQUNaLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDOUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO2FBQ0Q7U0FDRCxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxLQUFLLEVBQW1CO2lCQUMvQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=