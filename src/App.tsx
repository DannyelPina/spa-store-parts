import './globalStyle.js';
import './i18n/config';
import "./styles/custom.css";

import { FiltersProvider } from "./Hooks/useFilters";
import { MemoizedCompetition } from "./components/Competition";
import { MemoizedHeadToHead } from "./components/HeadToHead";
import { MemoizedTeamOrPlayerStats } from "./components/TeamOrPlayerStats";

export type TeamOrPlayerProps = {
	widgetToBeRendered?: "Teams" | "Player";
};

type AppProps = {
	widget: "stats" | "head-to-head";
  	entity: "teams" | "player";
}

export function App({widget, entity} : AppProps) {
	return (
		<FiltersProvider>
			<div className="bg-white">
				<div className="lg:container mx-auto lg:px-4 py-4">
					<MemoizedCompetition />

					{widget === "stats" ? <MemoizedTeamOrPlayerStats widgetToBeRendered = {entity === "player" ? "Player" : "Teams"} /> : <MemoizedHeadToHead widgetToBeRendered = {entity === "player" ? "Player" : "Teams"} />}					
					
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
