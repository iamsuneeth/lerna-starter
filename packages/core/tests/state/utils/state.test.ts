import { createReduxState, createReduxStateWithTransformer } from "../../../src/utils/state";

describe("State creation utility tests", () => {
    interface TestStateType1 {
        important: boolean;
        data: string;
    }
    interface TestInput1 {
        items: number;
        description: string;
    }
    const testState1 = createReduxState<TestStateType1>({ namespace: "testName1" });
    const testState2 = createReduxStateWithTransformer<TestStateType1, TestInput1>({
        namespace: "testName2",
        dataTransformer: input => ({ important: input.items < 10, data: input.description }),
    });

    test("should return start action without payload", () => {
        const expectedAction = {
            type: testState1.actions.start.getType(),
            error: false,
        };
        expect(testState1.actions.start()).toEqual(expectedAction);
    });

    it("should return error with given message", () => {
        const errorMessage = "error message";
        const expectedAction = {
            type: testState1.actions.fail.getType(),
            payload: new Error("error message"),
            error: true,
        };
        expect(testState1.actions.fail(errorMessage)).toEqual(expectedAction);
    });

    it("should return action with provided payload as is", () => {
        const payload = {
            important: false,
            data: "something trivial",
        };
        const expectedAction = {
            type: testState1.actions.success.getType(),
            payload: payload,
            error: false,
        };
        expect(testState1.actions.success(payload)).toEqual(expectedAction);
    });

    it("should return action with transformed payload for input data", () => {
        const payload = {
            items: 20,
            description: "something trivial",
        };
        const expectedAction = {
            type: testState2.actions.success.getType(),
            payload: {
                important: false,
                data: payload.description,
            },
            error: false,
        };
        expect(testState2.actions.success(payload)).toEqual(expectedAction);
    });

    it("should return initial state for unrecoganized action", () => {
        expect(testState1.reducer(undefined, { type: "random" })).toEqual(testState1.defaultState);
    });

    it("should change loading to true for start action", () => {
        expect(testState1.reducer(testState1.defaultState, testState1.actions.start())).toEqual({
            ...testState1.defaultState,
            loading: true,
        });
    });

    it("should change error and loading -> false on error action,", () => {
        const error = "this is an error";
        const startState = {
            ...testState2.defaultState,
            loading: true,
        };
        expect(testState2.reducer(startState, testState2.actions.fail(error))).toEqual({
            ...testState2.defaultState,
            error,
            loading: false,
        });
    });

    it("should change error -> undefined,loading -> false and data on success,", () => {
        const error = "this is an error";
        const startState = {
            ...testState2.defaultState,
            loading: true,
            error,
        };
        const payload = {
            items: 20,
            description: "something trivial",
        };
        const expectedState = {
            ...testState2.defaultState,
            data: {
                important: false,
                data: payload.description,
            },
        };
        expect(testState2.reducer(startState, testState2.actions.success(payload))).toEqual(expectedState);
    });
});
