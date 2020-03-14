import { HttpAPI } from "./httpApi";

export enum InterfaceType {
    HTTP = "HTTP",
    JSON = "JSON",
    FIREBASE = "FIREBASE",
}

export class APIInterfaceFactory {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(interfaceType: InterfaceType = InterfaceType.HTTP) {
        switch (interfaceType) {
            case InterfaceType.FIREBASE:
            case InterfaceType.JSON:
                throw new Error("not implemented yet");
            default:
                return HttpAPI.getInstance();
        }
    }
}
