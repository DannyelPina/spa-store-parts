/* eslint-disable react-hooks/exhaustive-deps */



import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { TeamOrPlayerProps } from '../../App';
import { useFilters } from '../../Hooks/useFilters';
import { API_KEY, ENDPOINT, PAGINATION, fetcher } from '../../api';
import { Alert } from "../Alert";
import { Comparation } from "../HeadToHead/Comparation/index";
import { Loading } from "../Loading";
import { Pagination } from "../Pagination";
import { Card } from "./Card/index";
import { Stats } from "./Comparation/Stats";

type StatsProps = {
	indicator: string;
	value: string;
};

type TeamOrPlayer = {
	id: string;
	name: string;
	image: string;
	stats: StatsProps[]
};

function HeadToHead({ widgetToBeRendered }: TeamOrPlayerProps) {
	
	const { t } = useTranslation()
	
	const { selectedCompetition } = useFilters()

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [totalRecord, setTotalRecord] = useState<number>(0);

	const endpointHeadToHead = widgetToBeRendered === "Player" ? ENDPOINT.PLAYER_HEAD_TO_HEAD : ENDPOINT.TEAM_HEAD_TO_HEAD;

	const endpointList = widgetToBeRendered === "Player" ? ENDPOINT.GET_PLAYERS : ENDPOINT.GET_TEAMS;

	const [teamOrPlayer1, setTeamOrPlayer1] = useState<TeamOrPlayer>({id: "", name: "", image: "", stats: []});

	const [teamOrPlayer2, setTeamOrPlayer2] = useState<TeamOrPlayer>({id: "", name: "", image: "", stats: []});

	const [teamsOrPlayers, setTeamsOrPlayers] = useState<TeamOrPlayer[]>([]);

	const [headToHeadIsLoading, setHeadToHeadIsLoading] = useState<boolean>(false);

	const [teamsOrPlayersCommonStats, setTeamsOrPlayersCommonStats] = useState<string[]>();
    
	const parameter = [`${endpointList}?type=team&competition=${selectedCompetition}&includeImage=true&page=${currentPage}&pageSize=${PAGINATION.RECORD_PER_PAGE}`, API_KEY]

	const { data, isLoading } = useSWR(selectedCompetition !== "" ? parameter : null, ([url, apiKey]) => fetcher(url, apiKey));

	useMemo(() => {
		setTotalRecord(data?.pagination?.totalRecords ?? 0)
		setTeamsOrPlayers(data?.data?.map((item: any) => (
			{
				id: item.id, 
				name: item.name, 
				image: item.image !== '' ? item.image : 'https://placehold.co/600x400?text=image', 
				stats: [], })))
	}, [data]);


	useEffect(() => {
		if (teamOrPlayer1.id !== "" && teamOrPlayer2.id !== "") {
			setHeadToHeadIsLoading(true);
			const queryparameter = `?competition=${selectedCompetition}&id1=${teamOrPlayer1.id}&id2=${teamOrPlayer2.id}`;
			const url = endpointHeadToHead + queryparameter;
			fetcher(url, API_KEY).then((data) => {
				const item1 = data.item1;
				const item2 = data.item2;

				const item1Stats:StatsProps[] = item1.stats;
				const item2Stats:StatsProps[] = item2.stats;
				
				const commonStatsTemp:string[] = item1Stats.filter(o => item2Stats.some(({indicator}) => o.indicator === indicator)).map(x=>x.indicator);
				setTeamsOrPlayersCommonStats(commonStatsTemp)
				
				setTeamOrPlayer1(
					{ 
						id: item1.item.id, 
						name: item1.item.name, 
						image: item1.item.image !== '' ? item1.item.image : 'https://placehold.co/600x400?text=image', 
						stats: item1.stats
					});
				
				setTeamOrPlayer2(
					{
						id: item2.item.id, 
						name: item2.item.name, 
						image: item2.item.image !== '' ? item2.item.image : 'https://placehold.co/600x400?text=image', 
						stats: item2.stats,
					});

				setHeadToHeadIsLoading(false);
			});
		}
	}, [teamOrPlayer1.id, teamOrPlayer2.id]);


	useEffect(()=>{
		setTeamOrPlayer1({id: "", name: "", image: "", stats: []});
		setTeamOrPlayer2({id: "", name: "", image: "", stats: []});
		setCurrentPage(1);
	},[selectedCompetition])
	
	const handleRemoveTeamOrPlayer = useCallback((teamOrPlayerId: string) => {
		if (teamOrPlayer1.id === teamOrPlayerId) {
			setTeamOrPlayer1({id: "", name: "", image: "", stats: []});
		}
		if (teamOrPlayer2.id === teamOrPlayerId) {
			setTeamOrPlayer2({id: "", name: "", image: "", stats: []});
		}
	}, [teamOrPlayer1, teamOrPlayer2]);


	const handleAddTeamOrPlayer = useCallback((teamOrPlayerId: string) => {
		
		if(teamOrPlayer1.id === teamOrPlayerId || teamOrPlayer2.id === teamOrPlayerId){
			return
		}

		var current = teamsOrPlayers?.find((x) => x.id === teamOrPlayerId);
		
		if (teamOrPlayer1.id === "") {
			setTeamOrPlayer1({ id: current?.id!, name: current?.name!, image: current?.image!, stats: []});
			return;
		}
		
		if (teamOrPlayer2.id === "") {
			setTeamOrPlayer2({id: current?.id!, name: current?.name!, image: current?.image!, stats: []});
			return;
		}
	}, [teamsOrPlayers, teamOrPlayer1, teamOrPlayer2]);

	
	const handleChangePage = useCallback((pageNumber: any) => {setCurrentPage(pageNumber);}, [currentPage]);


	return (
		<div className="bg-white w-full">
			
			<div className="flex flex-col text-[#242529] font-[500] mt-[43px]">
				<header className="text-[30px] mb-[45px] uppercase">{t("head-To-Head")}</header>

				<div className="teamOrPlayerComparation">
					<Comparation
						key={teamOrPlayer1.id + "_" + teamOrPlayer2.id}
						handleClickRemoveTeamOrPlayer={handleRemoveTeamOrPlayer}
						teamOrPlayer1={teamOrPlayer1}
						teamOrPlayer2={teamOrPlayer2}
						widgetToBeRendered={widgetToBeRendered}
					/>
				</div>
				{ isLoading || headToHeadIsLoading ?
					<Loading/> :
					<>
						{teamOrPlayer1.id !== "" && teamOrPlayer2.id !== "" ? (
							<div className="teamOrPlayerStats">
								{
									teamsOrPlayersCommonStats?.length !== 0 ?
										<ul>
											{
												teamsOrPlayersCommonStats?.map((item, index) =>  (
													<li key={index}>
														<Stats
															title={item}
															teamOrPlayer1Info={teamOrPlayer1.stats.find(x=>x.indicator === item)?.value!}
															teamOrPlayer2Info={teamOrPlayer2?.stats.find(x=>x.indicator === item)?.value!}
														/>
													</li>
												))
											}
										</ul>
								:
									<Alert text="noCommonStats"/>
								}
							</div>
						) : (
							<>
								<div className="teamsOrPlayers">
									{
										teamsOrPlayers?.length !== 0 ?
											<ul className="grid grid-cols-[repeat(auto-fit,_minmax(190px,_max-content))] justify-center gap-[15px]">
												{teamsOrPlayers?.map((teamOrPlayer) => (
														<li key={teamOrPlayer.id}>
															<Card teamOrPlayer={teamOrPlayer} handleClickAddTeamOrPlayer={ handleAddTeamOrPlayer} 
															disabled={teamOrPlayer.id === teamOrPlayer1.id || teamOrPlayer.id === teamOrPlayer2.id}/>
														</li>
													))}
											</ul>
									:
										<Alert/>
									}
								</div>
								<Pagination currentPage={currentPage} recordPerPage={PAGINATION.RECORD_PER_PAGE} totalRecors={totalRecord} handleChangeCurrentPage={handleChangePage} />
							</>
						)}
					</>
				}
			</div>
		</div>
	);
}

export const MemoizedHeadToHead = memo(HeadToHead);
