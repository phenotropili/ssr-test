const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entry = { api: "./src/server/api-server.ts" };

module.exports = {
	mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
	target: "node",
	devtool: "inline-source-map",
	entry: entry,
	output: {
		path: path.resolve(__dirname, "build", "server"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	// don't compile node_modules
	externals: [nodeExternals()],
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "src/server/mock-data", to: "mock-data" }],
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							// use the tsconfig in the server directory
							configFile: "src/server/tsconfig.json",
						},
					},
				],
			},
		],
	},
};
