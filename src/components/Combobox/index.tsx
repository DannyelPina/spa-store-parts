import { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useSWR from 'swr';
import { useFilters } from "../../Hooks/useFilters";
import { API_KEY, SWRThirdParams, fetcher } from "../../api";
import { Loading } from "../Loading";

type Props = {
	defaultMarginX?: boolean;
	endpoint: string;
	identifier: "indicator" | "edition" | "team" | "player",
	shouldRequestData: boolean;
};

function Combobox({ defaultMarginX, endpoint, identifier, shouldRequestData }: Props) {
	const { t } = useTranslation()

	const options = {
		edition: <option className="text-gray-300" value="" >{t('editions')}</option>,
		team: <option className="text-gray-300" value="" >{t('teams')}</option>,
		player: <option className="text-gray-300" value="" >{t('players')}</option>,
	}

	const { handleSetSelectedItem, selectedIndicator, selectedEdition, selectedPlayer, selectedTeam } = useFilters()
	
	const {data: response, error, isLoading} = useSWR(() => shouldRequestData ? [endpoint, API_KEY] : null, ([url, apiKey]) => fetcher(url, apiKey), SWRThirdParams);

	const defaultValue = useMemo(() => {
		return { indicator: selectedIndicator, edition: selectedEdition, team: selectedTeam, player: selectedPlayer }
	}, [selectedIndicator, selectedEdition, selectedTeam, selectedPlayer]);

	useEffect(() => {
		if(response?.data && identifier === "indicator") {
			handleSetSelectedItem(response?.data?.[0]?.id, identifier)
		}
	}, [response?.data, identifier, handleSetSelectedItem])

	return (
		<div className={`flex flex-row flex-1 items-center border px-2 bg-white ${defaultMarginX && "mx-4"}`}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
			
			<select
				aria-label={identifier}
				className="w-full py-2" 
				onChange={(e) => handleSetSelectedItem(e.target.value, identifier)} 
				value={defaultValue[identifier]}
			>
					
				{ identifier !== "indicator" && (options[identifier]) }
				{ 
					isLoading ? <Loading isText/> :
					error ? <option>{t('errorWhileLoadingData')}</option> :
					response?.data?.map((item: any) => <option key={item.id} value={item.id}>{t(item.name)}</option>) 
				}
			</select>
		</div>
	);
}

export const MemoizedCombobox = memo(Combobox);
