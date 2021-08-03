const path = require('path');

const workspaceRoot = path.join(__dirname, "../packages");

module.exports = {
    reactStrictMode: false,
    webpack: (config, { defaultLoaders }) => {
        const module = {
            ...config.module,
            rules: config.module.rules.concat([
                {
                    test: /\.(ts|tsx)$/,
                    include: [workspaceRoot],
                    exclude: /node_modules/,
                    use: 
                    [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
            ])
        };
        return {
            ...config,
            module
        };
    },
};
