import { ServiceBroker } from "moleculer";
export default function tracingBrokerCalls(name?: string): {
    call(next: any): (this: ServiceBroker, actionName: string, params: any, opts: any) => any;
};
