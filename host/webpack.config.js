const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federationConfig = {
	name: "host",
	filename: "remoteEntry.js",
	exposes: {},
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
		port: 3000,
		historyApiFallback: true,
		open: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
		},
	},
	module: {
		rules: [
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
