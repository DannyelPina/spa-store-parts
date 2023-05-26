import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from 'swr';
import { TeamOrPlayerProps } from "../../App";
import { useFilters } from "../../Hooks/useFilters";
import { API_KEY, ENDPOINT, PAGINATION, SWRThirdParams, fetcher } from "../../api";
import { MemoizedButton } from "../Button";
import { MemoizedCombobox } from "../Combobox";
import { Loading } from "../Loading";
import { Pagination } from "../Pagination";
import { MemoizedTable, TableColumnProps, TableDataProps } from "../Table";


function TeamOrPlayerStats({widgetToBeRendered}: TeamOrPlayerProps) {	
	const { t } = useTranslation()

	const [showMoreFilters, setShowMoreFilters] = useState(false);
	const { selectedCompetition, selectedEdition, selectedIndicator, selectedTeam, handleResetFilters, selectedPlayer, handleSetCurrentPage, currentPage } = useFilters()

	const requestParam = [
		`${ widgetToBeRendered !== "Teams" ? ENDPOINT.PLAYER_STATS : ENDPOINT.TEAM_STATS}?competition=${selectedCompetition}&indicator=${selectedIndicator}
		${ selectedEdition ? `&edition=${ selectedEdition }` : "" }
		${ selectedTeam ? `&team=${ selectedTeam }` : "" }
		${ selectedPlayer ? `&player=${selectedPlayer}` : "" }
		&ascending=false&page=${currentPage}&pageSize=${PAGINATION.RECORD_PER_PAGE}`,
		API_KEY
	]
	const { data: reponse, error, isLoading  } = useSWR(() => (selectedCompetition !== "" && selectedIndicator !== "") ? requestParam : null, ([url, apiKey]) => fetcher(url, apiKey), SWRThirdParams);	

	const responseDataKey = widgetToBeRendered !== "Teams" ? "playerStats" : "teamStats";

	const tableData: TableDataProps[] = useMemo(() => reponse?.data?.[responseDataKey]?.map((item: any) => {

		if(widgetToBeRendered !== "Teams") {
			return { id: item.player.id, rank: item.rank, player: item.player.name, team: item?.team?.name, goals: item.value, teamImg: item?.team?.image }
		}

		return { id: item.team.id, rank: item.rank, team: item.team.name, stat: item.value, image: item.team.image }
		
	}), [reponse, widgetToBeRendered, responseDataKey]);
	
	if(widgetToBeRendered !== "Teams" && tableData?.length && currentPage === 1) {
		tableData.shift()
		tableData.unshift({ 
			id: reponse?.data?.topPlayer?.player?.id, 
			rank: reponse?.data?.topPlayer?.rank, 
			player: reponse?.data?.topPlayer?.player?.name, 
			team: reponse?.data?.topPlayer?.team?.name, 
			goals: reponse?.data?.topPlayer?.value, 
			playerImg: reponse?.data?.topPlayer?.image, 
			teamImg: reponse?.data?.topPlayer?.team?.image, 
		})
	}

	const handleShowMoreFilters = useCallback(() => setShowMoreFilters(previousValue => previousValue ? false : true), []);

	// INIT TABLE COLUMNS WIHT PLAYERS PROPERTIES
	let tableColumns: TableColumnProps[] = [
		{key: 1, dataIndex: "rank", title: "Rank"},
		{key: 2, dataIndex: "player", title: "Player"},
		{key: 4, dataIndex: "team", title: "Team", hiddenOnSmallScreen: true, render: (row, dataIndex) => (
			<div className="flex flex-row">
				<div 
					className={`w-6 h-6 bg-center bg-no-repeat bg-cover mr-2`}							
					style={{ backgroundImage: `url(${row?.teamImg})` }}
				></div>
				<span>{row?.[dataIndex]}</span>
			</div>
		)},
		{key: 5, dataIndex: "goals", title: selectedIndicator.replaceAll("_", " "), centerItem: true, render: (row, dataIndex, centerItem) => <p className={centerItem ? "text-center" : ""}>{row?.[dataIndex]}</p>},
	];

	if(widgetToBeRendered === "Teams") {
		tableColumns = [
			{key: 1, dataIndex: "rank", title: "Rank"},
			{key: 2, dataIndex: "team", title: "Team", render: (row, dataIndex) => (
				<div className="flex flex-row">
					<div 
						className={`w-6 h-6 bg-center bg-no-repeat bg-cover mr-2`}							
						style={{ backgroundImage: `url(${row?.image})` }}
					></div>
					<span>{row?.[dataIndex]}</span>
				</div>
			)},
			{key: 3, dataIndex: "stat", title: selectedIndicator.replaceAll("_", " "), centerItem: true}
		]
	}
	
	if(error) {
		return <p className="w-full text-center">{t('error')}</p>
	}	

	return (
		<div className="bg-white w-full h-full text-black p-4 relative">		

			<div className="grid grid-cols-2 lg:grid-cols-3 justify-between mt-16 mb-4 gap-4">
				<span className="col-span-2 uppercase text-3xl font-medium hidden lg:flex">
					{widgetToBeRendered === "Teams" ? t('teamStats') : t('playerStats')}
				</span>
				
				<MemoizedCombobox endpoint={`${ENDPOINT.INDICATORS}?type=${widgetToBeRendered === "Teams" ? "team" : "player"}`} shouldRequestData={true} identifier="indicator"/>

				<div className="flex lg:hidden">
					<MemoizedButton label="More filters" withIcon handleClick={handleShowMoreFilters}/>
				</div>
				
			</div>

			<div className="p-4 bg-[#F6F6F6] hidden lg:flex flex-row">
				<MemoizedCombobox endpoint={`${ENDPOINT.EDITIONS}?type=${widgetToBeRendered === "Teams" ? "team" : "player"}&competition=${selectedCompetition}`} shouldRequestData={selectedCompetition !== "" ? true : false} identifier="edition"/>
				<MemoizedCombobox defaultMarginX endpoint={`${ENDPOINT.TEAMS}?type=${widgetToBeRendered === "Teams" ? "team" : "player"}&competition=${selectedCompetition}&edition=${selectedEdition}`} shouldRequestData={(selectedCompetition !== "" && selectedEdition !== "") ? true : false} identifier="team"/>

				{widgetToBeRendered !== "Teams" && (
					<MemoizedCombobox endpoint={`${ENDPOINT.PLAYERS}?competition=${selectedCompetition}&edition=${selectedEdition}&team=${selectedTeam}`} shouldRequestData={(selectedCompetition !== "" && selectedEdition !== "" && selectedTeam !== "") ? true : false} identifier="player"/>
				)}
				

				<div className="ml-4 flex justify-center">
					<MemoizedButton label="Reset filters" type="link" handleClick={handleResetFilters} />
				</div>
			</div>
			
			{ isLoading ? <Loading /> : (
				<>
					<MemoizedTable columns={tableColumns} data={tableData} widgetToBeRendered={widgetToBeRendered} /> 
					<Pagination currentPage={currentPage} recordPerPage={PAGINATION.RECORD_PER_PAGE} totalRecors={reponse?.pagination?.totalRecords || 0} handleChangeCurrentPage={handleSetCurrentPage} />
				</>				
			)}
			
						

			<div onClick={handleShowMoreFilters} className={`fixed flex items-end bottom-0 left-0 right-0 z-40 w-full bg-black/75 transition-all transform duration-300 ease-in-out h-full ${showMoreFilters ? "translate-y-0" : "translate-y-full"}`}>

				<div className="bg-[#F6F6F6] p-4 w-full flex flex-col gap-4">

					<div className="flex flex-row justify-between">
						<span className="text-[#242529] text-lg font-bold">Apply filters</span>

						<button onClick={() => setShowMoreFilters(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>						
					</div>

					<MemoizedCombobox endpoint={`${ENDPOINT.EDITIONS}?type=${widgetToBeRendered === "Teams" ? "team" : "player"}&competition=${selectedCompetition}`} shouldRequestData={selectedCompetition !== "" ? true : false} identifier="edition"/>
					<MemoizedCombobox endpoint={`${ENDPOINT.TEAMS}?type=${widgetToBeRendered === "Teams" ? "team" : "player"}&competition=${selectedCompetition}&edition=${selectedEdition}`} shouldRequestData={(selectedCompetition !== "" && selectedEdition !== "") ? true : false} identifier="team"/>

					{widgetToBeRendered !== "Teams" && (
						<MemoizedCombobox endpoint={`${ENDPOINT.PLAYERS}?competition=${selectedCompetition}&edition=${selectedEdition}&team=${selectedTeam}`} shouldRequestData={(selectedCompetition !== "" && selectedEdition !== "" && selectedTeam !== "") ? true : false} identifier="player"/>
					)}

					<div className="flex justify-end mt-4">
						<MemoizedButton label="resetFilters" type="link" handleClick={handleResetFilters} />
					</div>

					{/* <div className="flex my-4">
						<MemoizedButton label='applyFilters' handleClick={handleShowMoreFilters} />
					</div> */}
				</div>
			</div>
		</div>
	);
}

export const MemoizedTeamOrPlayerStats = memo(TeamOrPlayerStats)
