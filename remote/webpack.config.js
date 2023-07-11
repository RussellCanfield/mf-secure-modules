const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const FederatedTypesPlugin = require("@module-federation/typescript").default;
const path = require("path");

const federationConfig = {
	name: "remote",
	filename: "remoteEntry.js",
	exposes: {
		"./Button": "./src/Button",
	},
	shared: {
		react: {
			singleton: true,
			requiredVersion: false,
		},
		"react-dom": {
			singleton: true,
			requiredVersion: false,
		},
	},
};
module.exports = {
	output: {
		publicPath: "auto",
	},
	mode: "production",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
	devServer: {
		port: 3001,
		open: false,
		static: {
			directory: path.join(__dirname, "dist"),
		},
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
		},
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin(federationConfig),
		new FederatedTypesPlugin({ federationConfig }),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
};
