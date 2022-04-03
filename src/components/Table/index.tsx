import { useNavigate } from "react-router-dom";

import { useParts } from "../../Hooks";
import { Container } from "./styles";

interface ITableProps {
	searchText: string;
	sortDirection: "ASC" | "DESC";
}

export function Table({ searchText, sortDirection }: ITableProps) {
	const { status, partsData, sortParts } = useParts();
	const navigate = useNavigate();

	const filteredDataIfNeed = (
		searchText: string,
		sortDirection: "ASC" | "DESC"
	) => {
		let filteredParts = sortParts(sortDirection, partsData);

		if (searchText) {
			filteredParts = partsData.filter(({ name }) =>
				name.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		return filteredParts;
	};

	const handleDetails = (partName: string) => {
		navigate(`/${partName}`);
	};

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{status === "FETCHING" && (
						<tr>
							<td colSpan={3}>Loading...</td>
						</tr>
					)}

					{filteredDataIfNeed(searchText, sortDirection).map(
						(part, index) => (
							<tr
								key={`${index}${part.name}`}
								onClick={() => handleDetails(part.name)}
							>
								<td>{part.name}</td>
								<td>{part.type}</td>
								<td>{part.price}</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</Container>
	);
}
