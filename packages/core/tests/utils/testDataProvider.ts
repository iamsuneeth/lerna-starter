import * as fs from "fs";
import { TEST_DATA_DIR } from "../constants/constants";

export const getTestData = (identifier: string) => {
    try {
        const data = fs.readFileSync(`${TEST_DATA_DIR}/${identifier}.json`);
        return JSON.parse(data.toString());
    } catch (error) {
        throw new Error(`Test data -> ${identifier}.json not found or is corrupt`);
    }
};
