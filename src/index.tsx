import ReactDOM from "react-dom";

import React from "react";
import { App } from "./App";

// import "./i18n";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);


// type Props = {
//   widget: "stats" | "head-to-head";
//   entity: "teams" | "player";
//   selector: any;
// }

// const app = {
//   render: ({selector, entity, widget}: Props) => {
//     ReactDOM.render(<App />, document.querySelector(selector));
//   },
//   unmount: (selector: any) => {
//     ReactDOM.unmountComponentAtNode(document.querySelector(selector)); 
//   }
// }

// export default app;