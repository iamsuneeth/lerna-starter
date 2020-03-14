import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { createLogger } from "redux-logger";
import { rootReducer } from "../state/reducers";
import { rootSaga } from "../state/saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppState } from "../state/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface SSRStore extends Store {
    sagaTask: Task;
}

export const configureStore = (loadedState?: AppState) => {
    const middleware = [];
    const sagaMiddleware = createSagaMiddleware();

    middleware.push(sagaMiddleware);
    if (process.env.NODE_ENV !== "production") {
        middleware.push(createLogger());
    }

    const store = loadedState
        ? createStore(
              rootReducer,
              loadedState,
              process.env.NODE_ENV !== "production"
                  ? composeWithDevTools(applyMiddleware(...middleware))
                  : applyMiddleware(...middleware),
          )
        : createStore(
              rootReducer,
              process.env.NODE_ENV !== "production"
                  ? composeWithDevTools(applyMiddleware(...middleware))
                  : applyMiddleware(...middleware),
          );

    (store as SSRStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};
