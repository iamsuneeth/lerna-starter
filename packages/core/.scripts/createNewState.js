const fs = require("fs");
const stateParentPath = "src/state";
const hooksFolder = `src/hooks`;
const createFiles = stateName => {
    const stateFolder = `${stateParentPath}/${stateName}`;
    const hookName = `${hooksFolder}/use${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}State.ts`;
    if (fs.existsSync(stateFolder)) {
        throw Error("state already exists");
    }
    fs.mkdirSync(stateFolder);
    fs.closeSync(fs.openSync(`${stateFolder}/${stateName}-action-types.ts`, "w"));
    fs.closeSync(fs.openSync(`${stateFolder}/${stateName}-actions.ts`, "w"));
    fs.closeSync(fs.openSync(`${stateFolder}/${stateName}-reducers.ts`, "w"));
    fs.closeSync(fs.openSync(`${stateFolder}/${stateName}-sagas.ts`, "w"));
    if (fs.existsSync(hookName)) {
        throw Error("hook already exists");
    }
    fs.closeSync(fs.openSync(hookName, "w"));
};

const params = process.argv.slice(2);
if (params.length == 0) {
    throw Error("state name is missing!!");
}
const stateName = params[0];
createFiles(stateName);
