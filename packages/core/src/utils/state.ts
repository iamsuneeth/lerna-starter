/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createReducer, PayloadReducer1, ActionCreator } from "redux-act";
import { State, DetailsState } from "../state";

export const createSequenceActionType = (namespace: string) => ({
    START: `${namespace}/start`,
    FAILURE: `${namespace}/failure`,
    SUCCESS: `${namespace}/success`,
    API: `${namespace}/api`,
});

export type ActionTypeStructure = ReturnType<typeof createSequenceActionType>;

export const createDefaultActionStructure = ({ API, START, FAILURE }: ActionTypeStructure) => ({
    start: createAction(START),
    fail: createAction<Error>(FAILURE, (message: string) => new Error(message)),
    api: createAction(API),
});

interface ActionStructure {
    start: ActionCreator<any>;
    fail: ActionCreator<any>;
    api: ActionCreator<any>;
    success: ActionCreator<any>;
}

const defaultStateTemplate = {
    loading: false,
    error: undefined,
};

export const createReducerStructure = <DATA>(initialValue: DATA, actions: ActionStructure) => {
    const defaultState = {
        ...defaultStateTemplate,
        data: initialValue,
    };
    const reducer = createReducer<State<DATA>>({}, defaultState);
    reducer.on(actions.start, state => ({
        ...state,
        loading: true,
    }));
    reducer.on(actions.fail, (state, payload: Error) => ({
        ...state,
        error: payload.message,
        loading: false,
    }));

    reducer.on(actions.success, (state, payload: DATA) => ({
        ...state,
        data: payload,
        loading: false,
        error: undefined,
    }));
    return {
        reducer,
        defaultState,
    };
};

export const createDetailsReducerStructure = <INPUT, DATA>(
    initialValue: DetailsState<DATA>,
    actions: ActionStructure,
) => {
    const defaultState = {
        ...defaultStateTemplate,
        data: initialValue,
    };
    const reducer = createReducer<State<DetailsState<DATA>>>({}, defaultState);
    reducer.on(actions.start, state => ({
        ...state,
        loading: true,
    }));
    reducer.on(actions.fail, (state, payload: Error) => ({
        ...state,
        error: payload.message,
        loading: false,
    }));

    reducer.on(actions.success, (state, payload: DetailsState<DATA>) => ({
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
        loading: false,
        error: undefined,
    }));
    return {
        reducer,
        defaultState,
    };
};

interface CreateReduxStateProps<DATA> {
    namespace: string;
    initialValue: DATA;
}

export const createReduxState = <DATA>({ namespace, initialValue }: CreateReduxStateProps<DATA>) => {
    const actionTypes = createSequenceActionType(namespace);
    const actions = {
        ...createDefaultActionStructure(actionTypes),
        success: createAction<DATA, DATA>(actionTypes.SUCCESS),
    };

    return { actions, ...createReducerStructure<DATA>(initialValue, actions) };
};

interface CreateReduxStateWithTransformerProps<DATA, INPUT> extends CreateReduxStateProps<DATA> {
    dataTransformer: PayloadReducer1<INPUT, DATA>;
}

export const createReduxStateWithTransformer = <DATA, INPUT = any>({
    namespace,
    initialValue,
    dataTransformer,
}: CreateReduxStateWithTransformerProps<DATA, INPUT>) => {
    const actionTypes = createSequenceActionType(namespace);
    const actions = {
        ...createDefaultActionStructure(actionTypes),
        success: createAction<INPUT, DATA, {}>(actionTypes.SUCCESS, dataTransformer),
    };

    return {
        actions,
        ...createReducerStructure<DATA>(initialValue, actions),
    };
};

export const createReduxStateWithTransformerInput = <DATA, INPUT = any, API_INPUT = any>({
    namespace,
    initialValue,
    dataTransformer,
}: CreateReduxStateWithTransformerProps<DATA, INPUT>) => {
    const actionTypes = createSequenceActionType(namespace);
    const actions = {
        ...createDefaultActionStructure(actionTypes),
        api: createAction<API_INPUT>(actionTypes.API),
        success: createAction<INPUT, DATA, {}>(actionTypes.SUCCESS, dataTransformer),
    };

    return {
        actions,
        ...createReducerStructure<DATA>(initialValue, actions),
    };
};

interface CreateReduxDetailsStateProps<DATA, INPUT> {
    namespace: string;
    initialValue: DetailsState<DATA>;
    dataTransformer: PayloadReducer1<INPUT, DetailsState<DATA>>;
}

export const createReduxDetailsState = <DATA, INPUT = any, API_INPUT = any>({
    namespace,
    initialValue,
    dataTransformer,
}: CreateReduxDetailsStateProps<DATA, INPUT>) => {
    const actionTypes = createSequenceActionType(namespace);
    const actions = {
        ...createDefaultActionStructure(actionTypes),
        api: createAction<API_INPUT>(actionTypes.API),
        success: createAction<INPUT, DetailsState<DATA>, {}>(actionTypes.SUCCESS, dataTransformer),
    };

    return {
        actions,
        ...createDetailsReducerStructure<INPUT, DATA>(initialValue, actions),
    };
};
