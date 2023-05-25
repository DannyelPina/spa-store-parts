type CardProps = {
	teamOrPlayer: { id: string; name: string; image: string };
	handleClickAddTeamOrPlayer: Function;
	disabled:boolean;
};

export function Card({teamOrPlayer, handleClickAddTeamOrPlayer, disabled }: CardProps) {
	return (
		<>
			<div
				className={`${disabled ? 'bg-[#dddddd] ':''}flex flex-row items-center gap-[14px] w-[190px] h-[97px] px-[16px] py-[20px] rounded-[6px] border border-[#D8D8D8] cursor-pointer`}
				onClick={() => handleClickAddTeamOrPlayer(teamOrPlayer.id)}
			>
				<picture className="flex-none">
					<img
						className="h-[57px] w-[57px] object-cover object-center rounded-full"
						src={teamOrPlayer.image}
						alt="team or player"
						title={teamOrPlayer.image}
					/>
				</picture>
				<p
					className="line-clamp-2 break-all text-[14px]"
					title={teamOrPlayer.name}
				>
					{teamOrPlayer.name}
				</p>
			</div>
		</>
	);
}
