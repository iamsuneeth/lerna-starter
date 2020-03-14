import { rootReducer } from "./reducers";

export * from "./common/types";

export type AppState = ReturnType<typeof rootReducer>;
