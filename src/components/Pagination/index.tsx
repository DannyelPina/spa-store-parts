type Props = {
	currentPage: number;
	recordPerPage: number;
	totalRecors: number;
	handleChangeCurrentPage: Function;
};

export function Pagination({
	currentPage,
	recordPerPage,
	totalRecors,
	handleChangeCurrentPage,
}: Props) {
	var maxPagesListedBySide = 2;
	var totalPage = Math.ceil(totalRecors / recordPerPage);
	var hasNext = currentPage + 1 <= totalPage;
	var hasPrevious = currentPage - 1 >= 1;
	var hasNextDouble = currentPage + maxPagesListedBySide <= totalPage;
	var hasPreviousDouble = currentPage - maxPagesListedBySide >= 1;

	const listItemTemp: number[] = [currentPage];
	const listItem: any[] = [];

	Array.from(Array(maxPagesListedBySide).keys()).forEach((x) => {
		if (currentPage - maxPagesListedBySide + x > 0) {
			listItemTemp.push(currentPage - maxPagesListedBySide + x);
		}
		if (currentPage + x + 1 <= totalPage) {
			listItemTemp.push(currentPage + x + 1);
		}
	});

	listItemTemp.sort((a, b) => a - b).forEach((x) => {
			listItem.push(
				<li key={x}>
					<button
						className={
							x === currentPage
								? "active px-[10px] py-[5px] rounded-[2px] bg-[#D8B97D]"
								: "px-[10px] py-[5px] rounded-[2px]"
						}
						onClick={() => handleChangeCurrentPage(x)}
					>
						{x}
					</button>
				</li>
			);
		});

	return (
		<ul className="flex flex-row gap-[4px] justify-center mt-[32px] flex-wrap">
			{/* Previous button */}
			<>
				<li>
					<button
						disabled={!hasPreviousDouble}
						className="h-full px-[10px] py-[5px] rounded-[2px] flex flex-row items-center cursor-pointer"
						onClick={() =>handleChangeCurrentPage(currentPage - maxPagesListedBySide)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M7 13L1 7L7 1"
								stroke={hasPreviousDouble ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M7 13L1 7L7 1"
								stroke={hasPreviousDouble ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
					</button>
				</li>

				<li>
					<button
						disabled={!hasPrevious}
						className="h-full px-[10px] py-[5px] rounded-[2px] flex flex-row items-center cursor-pointer"
						onClick={() => handleChangeCurrentPage(currentPage - 1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M7 13L1 7L7 1"
								stroke={hasPrevious ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
					</button>
				</li>
			</>

			{/* Number */}
			<>
			{listItemTemp.find(x=>x===1) ? `` :
				<>
					<li key={1}>
						<button className="px-[10px] py-[5px] rounded-[2px]" onClick={() => handleChangeCurrentPage(1)}>
							1
						</button>
					</li>
					<li>
						<div className="py-[5px] rounded-[2px] cursor-default">
							...
						</div>
					</li>
				</>
			}
			{listItem}
			
			{totalPage !==0 ? 
				listItemTemp.find(x=>x===totalPage) ? ``:
					<>
						<li key={totalPage}>
							<div className="py-[5px] rounded-[2px] cursor-default">
								...
							</div>
						</li>
						<li>
							<button className="px-[10px] py-[5px] rounded-[2px]" onClick={() => handleChangeCurrentPage(totalPage)}>
							{totalPage}
							</button>
						</li>
					</> 
				: ``
			}

			</>

			{/* Next button */}
			<>
				<li>
					<button
						disabled={!hasNext}
						className="h-full px-[10px] py-[5px] rounded-[2px] flex flex-row items-center cursor-pointer"
						onClick={() => handleChangeCurrentPage(currentPage + 1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M1 0.999999L7 7L1 13"
								stroke={hasNext ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
					</button>
				</li>
				<li>
					<button
						disabled={!hasNextDouble}
						className="h-full px-[10px] py-[5px] rounded-[2px] flex flex-row items-center cursor-pointer"
						onClick={() =>handleChangeCurrentPage(currentPage + maxPagesListedBySide)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M1 0.999999L7 7L1 13"
								stroke={hasNextDouble ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
						>
							<path
								d="M1 0.999999L7 7L1 13"
								stroke={hasNextDouble ? "#28282a" : "#757575"}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="#ffffff"
							/>
						</svg>
					</button>
				</li>
			</>
		</ul>
	);
}
