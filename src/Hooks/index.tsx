import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/constants";

type IStatus = "FETCHING" | "FETCHED" | "FETCH_ERROR" | "IDLE";

interface IFetchData {
	endPoint: string;
}

export interface IDataSource {
	name: string;
	type: string;
	price: string;
}

interface IPartsContext {
	status: IStatus;
	partsData: IDataSource[];
	fetchData: (props: IFetchData) => void;
	sortParts: (
		sortOrder: "ASC" | "DESC",
		data: IDataSource[]
	) => IDataSource[];

	singlePartDetails: (partName: string) => IDataSource | undefined;
}

const PartsContext = createContext({} as IPartsContext);

const PartsProvider: React.FC = ({ children }) => {
	const [status, setStatus] = useState<IStatus>("IDLE");
	const [partsData, setPartsData] = useState<IDataSource[]>([]);

	const sortParts = (sortOrder: "ASC" | "DESC", data: IDataSource[]) => {
		const sortedData = data.sort((a, b) => {
			const priceA = parseFloat(a.price);
			const priceB = parseFloat(b.price);

			if (priceA < priceB) {
				return sortOrder === "ASC" ? -1 : 1;
			}

			if (priceA > priceB) {
				return sortOrder === "ASC" ? 1 : -1;
			}

			return 0;
		});

		return sortedData;
	};

	const singlePartDetails = (partName: string) => {
		return partsData.find(({ name }) => name === partName);
	};

	const fetchData = async ({ endPoint }: IFetchData) => {
		try {
			setStatus("FETCHING");

			const response = await fetch(`${BASE_URL}/${endPoint}`);
			const data: IDataSource[] = await response.json();

			setPartsData(data);
			setStatus("FETCHED");
		} catch (error: any) {
			setStatus("FETCH_ERROR");
		}
	};

	return (
		<PartsContext.Provider
			value={{
				status,
				partsData,
				fetchData,
				sortParts,
				singlePartDetails,
			}}
		>
			{children}
		</PartsContext.Provider>
	);
};

const useParts = () => {
	const partsContext = useContext(PartsContext);

	return partsContext;
};

export { useParts, PartsProvider };
