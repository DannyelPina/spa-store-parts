
import { useTranslation } from "react-i18next";
import { TeamOrPlayerProps } from '../../../App';

type ComparationProps  = TeamOrPlayerProps & {
	handleClickRemoveTeamOrPlayer: Function;
	teamOrPlayer1: { id: string; name: string; image: string };
	teamOrPlayer2: { id: string; name: string; image: string };
};

export function Comparation({handleClickRemoveTeamOrPlayer, teamOrPlayer1, teamOrPlayer2, widgetToBeRendered }: ComparationProps) {
	return (
		<div className="mb-[31px] flex flex-row justify-center">
			<TeamOrPlayerInfo key={teamOrPlayer1.id + "1"} teamPlayer={teamOrPlayer1} handleClickRemoveTeamOrPlayer={handleClickRemoveTeamOrPlayer} widgetToBeRendered={widgetToBeRendered}/>

			<div className="flex items-center h-[110px] lg:h-[147px]">
				<hr className="w-[40px] border  border-[#D8B97D]" />
				<div className="border-2 border-white rounded-full p-2 bg-[#D8B97D] w-[35px] h-[35px] lg:w-[46px] lg:h-[46px] flex items-center justify-center font-[700] select-none">
					VS
				</div>
				<hr className="w-[40px] border border-[#D8B97D]" />
			</div>

			<TeamOrPlayerInfo key={teamOrPlayer2.id + "2"} teamPlayer={teamOrPlayer2} handleClickRemoveTeamOrPlayer={handleClickRemoveTeamOrPlayer} widgetToBeRendered={widgetToBeRendered}/>
		</div>
	);
}

type TeamOrPlayerInfoProps = TeamOrPlayerProps & {
	handleClickRemoveTeamOrPlayer: Function;
	teamPlayer: { id: string; name: string; image: string };
};

export function TeamOrPlayerInfo({teamPlayer, handleClickRemoveTeamOrPlayer, widgetToBeRendered }: TeamOrPlayerInfoProps) {
	const { t } = useTranslation()
	
	return (
		<div className="flex flex-col gap-[11px] w-[110px] lg:w-[147px]">
			{teamPlayer.id !== "" ? (
				<>
					<picture>
						<img
							className="h-[110px] lg:h-[147px] object-cover object-center rounded-full border-2 p-6 border-[#D8B97D]"
							src={teamPlayer.image}
							alt="team or player"
							title={teamPlayer.name}
						/>
					</picture>
					<div>
						<p title={teamPlayer.name} className="break-all text-[14px] lg:text-[16px] font-[700] flex justify-center">{teamPlayer.name}</p>
						<p className="leading-6 text-[10px] lg:text-[12px] font-[500] flex justify-center"
							onClick={() => handleClickRemoveTeamOrPlayer(teamPlayer.id)}>
							{t('clickTo')}&nbsp;
							<span className="text-[#D8B97D] underline underline-offset-4 cursor-pointer">
								{ widgetToBeRendered === "Player" ? t("changePlayer").toLowerCase() : t("changeClub").toLowerCase() }
							</span>
						</p>
					</div>
				</>
			) : (
				<div className="flex justify-center items-center h-[110px] w-[110px] lg:h-[147px] lg:w-[147px] border-2 border-[#D8D8D8] rounded-full cursor-default select-none">
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 11.7V18.24H11.34V30H18.06V18.24H29.46V11.7H18.06V0H11.34V11.7H0Z" fill="#D8B97D"/>
					</svg>
				</div>
			)}
		</div>
	);
}
