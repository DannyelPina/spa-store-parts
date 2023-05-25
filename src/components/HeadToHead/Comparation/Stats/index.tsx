import { useTranslation } from "react-i18next";

type StatsProps = {
	title: string;
	teamOrPlayer1Info: string;
	teamOrPlayer2Info: string;
};

export function Stats({title, teamOrPlayer1Info, teamOrPlayer2Info}: StatsProps) {
	const { t } = useTranslation()

	return (
		<>
			<div>
				<div className="grid grid-cols-5 justify-items-center group py-[17px] cursor-pointer">
					<div className="col-span-2">
						<span className="group-hover:text-[#FF6060]"> {teamOrPlayer1Info} </span>
					</div>
					<div className="col-span-1">
						<span>
							<span className="">{t(title)}</span>
						</span>
					</div>
					<div className="col-span-2">
						<span className="group-hover:text-[#D8B97D]"> {teamOrPlayer2Info} </span>
					</div>
				</div>
				<hr className="border" />
			</div>
		</>
	);
}
