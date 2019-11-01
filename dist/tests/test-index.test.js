"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const index_1 = __importDefault(require("./../index"));
describe("A broker call", () => {
    it("should add a span", async () => {
        let span;
        const sBroker = new moleculer_1.ServiceBroker({
            logLevel: undefined,
            middlewares: [index_1.default("invoker")]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1pbmRleC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvdGVzdC1pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EseUNBQXNEO0FBQ3RELHVEQUFvQztBQUVwQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM5QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEMsSUFBSSxJQUFTLENBQUM7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFhLENBQUM7WUFDakMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLENBQUMsZUFBVSxDQUFDLFNBQVMsQ0FBZSxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDckMsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLEdBQVE7b0JBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7YUFDRDtTQUNELENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsT0FBTyxDQUFDLEtBQUssRUFBbUI7aUJBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==