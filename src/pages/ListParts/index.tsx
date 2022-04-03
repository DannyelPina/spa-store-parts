import { useEffect, useState } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { useParts } from "../../Hooks";
import { BASE_URL } from "../../utils/constants";
import { Content, FiltersContainer } from "./styles";

export function ListParts() {
	const [partTypes, setPartTypes] = useState<string[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

	const { fetchData } = useParts();

	const handleSearch = (event: any) => {
		const searchText: string = event.target.value;

		if (!searchText || searchText.length < 3) {
			setSearchText("");
			return;
		}

		setSearchText(searchText);
	};

	const handleSortData = () => {
		setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
	};

	const handleTypeChange = (value: string) => {
		if (value && value !== "-Type-") {
			fetchData({ endPoint: `store/parts?type=${value}` });
		} else {
			fetchData({ endPoint: "store/parts" });
		}
	};

	useEffect(() => {
		fetchData({ endPoint: "store/parts" });
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const fetchPartTypes = async () => {
			try {
				const response = await fetch(`${BASE_URL}/store/part-types`);
				const data = await response.json();
				setPartTypes(data);
			} catch (error: any) {
				console.log(error);
			}
		};

		fetchPartTypes();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Header>
				<h1>Store parts</h1>
			</Header>

			<FiltersContainer>
				<Content>
					<p>Filters options</p>
					<input
						type="search"
						placeholder="Search"
						onChange={handleSearch}
					/>
					<select
						name="cars"
						id="cars"
						onChange={(e) => handleTypeChange(e.target.value)}
					>
						{["-Type-", ...partTypes].map(
							(type: string, index: number) => (
								<option key={`${index}${type}`} value={type}>
									{type}
								</option>
							)
						)}
					</select>

					<button onClick={handleSortData}>
						Order by price{" "}
						{sortDirection === "ASC" ? (
							<FiArrowDown />
						) : (
							<FiArrowUp />
						)}
					</button>
				</Content>
			</FiltersContainer>

			<Table searchText={searchText} sortDirection={sortDirection} />
		</>
	);
}
