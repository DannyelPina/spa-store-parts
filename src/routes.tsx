import { Routes, Route } from "react-router-dom";
import { ListParts } from "./pages/ListParts";
import { PartDetails } from "./pages/PartDetails";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<ListParts />} />
			<Route path="/:partName" element={<PartDetails />} />
		</Routes>
	);
}
