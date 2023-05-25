import './i18n/config';

import { FiltersProvider } from "./Hooks/useFilters";
import { MemoizedCompetition } from "./components/Competition";
import { MemoizedHeadToHead } from "./components/HeadToHead";
import { MemoizedTeamOrPlayerStats } from "./components/TeamOrPlayerStats";
import "./styles/index.css";

export type TeamOrPlayerProps = {
	widgetToBeRendered?: "Teams" | "Player";
};

export function App() {
	return (
		<FiltersProvider>
			<div className="bg-white">
				<div className="lg:container mx-auto lg:px-4 py-4">
					<MemoizedCompetition />

					<MemoizedTeamOrPlayerStats widgetToBeRendered = "Player" />
					<MemoizedHeadToHead widgetToBeRendered = "Player" />
				</div>
			</div>
		</FiltersProvider>
	);
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
// 	props: {
// 		...(await serverSideTranslations(locale ?? "en", ["common"])),
// 	},
// });
