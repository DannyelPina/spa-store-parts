import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import { PartsProvider } from "./Hooks";
import { Router } from "./routes";

export function App() {
	return (
		<PartsProvider>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
			<GlobalStyle />
		</PartsProvider>
	);
}
