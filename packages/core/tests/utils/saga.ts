import { runSaga, Saga } from "redux-saga";
import { AnyAction } from "redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sagaRecorder = async (saga: Saga, action: AnyAction) => {
    const dispatched: AnyAction[] = [];
    await runSaga(
        {
            dispatch: (action: AnyAction) => dispatched.push(action),
        },
        saga,
        action,
    ).toPromise();
    return dispatched;
};
