

import { useTranslation } from "react-i18next";

import { ReactElement, memo } from "react";

import { TeamOrPlayerProps } from "../../App";
import { useFilters } from "../../Hooks/useFilters";
import TopPlayerBackground from "../../assets/img/TopPlayerBackground.png";
import { Alert } from "../Alert";

export type TableColumnProps = {
	title: string;
	dataIndex: string;
	key: string | number;
	hiddenOnSmallScreen?: boolean;
	centerItem?: boolean;
	render?: (row: any, dataIndex: string, centerItem?: boolean) => ReactElement;
	[key: string]: any;
};

type TableProps = TeamOrPlayerProps & {
	columns: TableColumnProps[];
	data: TableDataProps[];
	loading?: boolean;
	widgetToBeRendered: string | undefined;
	handleTableRowClick?: (row: any) => void;
};

export type TableDataProps = {	
	[key: string]: any;
};

function Table({ columns, data, widgetToBeRendered }: TableProps) {
	const { currentPage } = useFilters();
	const { t } = useTranslation()

	const dataIndexs = columns.map((col) => col.dataIndex);

	return (
		<>
			{ data?.length ?
				<table className="table-auto w-full border-b">
					<thead>
						<tr className="border-t h-12">
							{columns.map((column) => (
								<th
									className={`mr-4 ${column.centerItem ? "text-center" : "text-start"} ${column.hiddenOnSmallScreen ? "hidden lg:table-cell" : ""}`}
									key={column.key}
								>
									{t(column.title)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data?.map((row, i) => {
							
							if(i === 0 && widgetToBeRendered !== "Teams" && currentPage === 1) {
								return(	
									<tr key={row.id} className="border-t h-12">
										<td colSpan={3} className="h-full w-full rounded-md lg:hidden">
											<div className="w-full flex flex-row justify-between items-end p-4 pb-0 bg-center bg-no-repeat bg-cover rounded-md" style={{ backgroundImage: `url(${TopPlayerBackground})` }}>
												<div className="flex flex-col text-white flex-1">
													<span className="text-base font-normal">
														{row.rank}
													</span>
													<span className="text-2xl font-bold">
														{row.player}
													</span>
													<span className="text-sm font-normal mb-4">
														{row.team}
													</span>
													<img src={row.teamImg} width={40} height={40} alt="Team" className="pb-4" />
												</div>
												<div className="flex flex-row items-end">
													<img src={row.playerImg} width={170} height={300} alt="Player" />
													<span className="text-2xl font-bold text-[#D8B97D] mb-4">
														{row.goals}
													</span>
												</div>
											</div>
										</td>

										{dataIndexs.map((dataIndex) => {
											const foundedColumn = columns.find(column => column.dataIndex === dataIndex);
			
											if (foundedColumn?.render) {
												return (
													<td className={`hidden lg:table-cell ${foundedColumn?.centerItem && "text-center"}`} key={`${row.key}-${dataIndex}`}>
														{foundedColumn.render(row, dataIndex, foundedColumn?.centerItem)}
													</td>
												);
											}
			
											return (
												<td className={`hidden lg:table-cell ${foundedColumn?.centerItem && "text-center"}`} key={`${row.key}-${dataIndex}`}>
													{row?.[dataIndex] ?? ""}
												</td>
											);
										})}

									</tr>
								)
							}

							return(
								<tr key={i} className="border-t h-12">
									{dataIndexs.map((dataIndex) => {
										const foundedColumn = columns.find(column => column.dataIndex === dataIndex);
										
										if (foundedColumn?.render) {
											return (
												<td className={foundedColumn.hiddenOnSmallScreen ? "hidden lg:table-cell" : ""} key={`${row.key}-${dataIndex}`}>
													{foundedColumn.render(row, dataIndex, foundedColumn?.centerItem)}
												</td>
											);
										}

										return (
											<td className={foundedColumn && foundedColumn.hiddenOnSmallScreen ? "hidden lg:table-cell" : ""} key={`${row.key}-${dataIndex}`}>
												{row?.[dataIndex] ?? ""}
											</td>
										);
									})}
								</tr>
							)
								
						})}									
					</tbody>
				</table> 
				: <Alert/>
			}
		</>
	);
}

export const MemoizedTable = memo(Table);
