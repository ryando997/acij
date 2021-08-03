const presets = [
    [
        "@babel/preset-typescript"
    ],
    [
        "@babel/preset-env", {
            bugfixes: true,
			loose: true,
			modules:  'commonjs',
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            }
        }
    ], 
    [
        "@babel/preset-flow"
    ], 
];

const plugins = [
    [
        "babel-plugin-module-resolver",
        {
            root: ["."],
            alias: {
                "@ryan/acij": './packages/acij',
                "@ryan/react-acij": './packages/react-acij',
                "@ryan/utils": './packages/utils',
            }
        }
    ]
];

const ignore = ["src/packages/**/*.ts", "src/packages/**/*.tsx"]

module.exports = { presets, plugins, ignore };