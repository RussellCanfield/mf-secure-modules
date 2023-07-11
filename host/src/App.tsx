import React, { Suspense, useReducer } from "react";
import ReactDOM from "react-dom";
import { importRemote } from "@module-federation/utilities";
import { ErrorBoundary } from "react-error-boundary";

const Button = React.lazy(() =>
	importRemote({
		url: "http://localhost:3001",
		scope: "remote",
		module: "Button",
	})
);

import "./index.css";

const LogError = (error: Error, info: { componentStack: string }) => {
	console.log(info.componentStack);
};

const App = () => {
	return (
		<ErrorBoundary
			fallbackRender={() => <div>Ut oh...</div>}
			onError={LogError}
		>
			<div className="container">
				Host:
				<Suspense fallback={<div>Loading...</div>}>
					<Button label={"123"} />
				</Suspense>
			</div>
		</ErrorBoundary>
	);
};
ReactDOM.render(<App />, document.getElementById("app"));
