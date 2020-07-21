module.exports = {
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "json",
        "js"
    ],
        "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    },
    "testMatch": [
        "**/tests/**/*.ts"
    ]
}