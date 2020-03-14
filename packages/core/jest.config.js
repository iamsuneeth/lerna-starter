module.exports = {
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            diagnostics: {
                ignoreCodes: ["TS2345"],
            },
        },
    },
};
