import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Container, Content } from "./styles";
import { IDataSource, useParts } from "../../Hooks";
import { useEffect, useState } from "react";

export function PartDetails() {
	const { partName } = useParams();
	const { singlePartDetails } = useParts();
	const navigate = useNavigate();

	const [part, setPart] = useState<IDataSource | undefined>(undefined);

	const handleGoBack = () => navigate("/");
	useEffect(() => {
		if (partName) {
			// eslint-disable-next-line
			const partDetails = singlePartDetails(partName);
			setPart(partDetails);
		}
		// eslint-disable-next-line
	}, [partName]);

	return (
		<>
			<Header>
				<Container>
					<button onClick={handleGoBack}>
						<FiArrowLeft />
					</button>
					<h1>{partName} details</h1>
				</Container>
			</Header>

			<Content>
				<div>
					{part ? (
						<>
							<h1>{part.name}</h1>
							<p>{part.type}</p>
							<p>{part.price}</p>
						</>
					) : (
						<p></p>
					)}
				</div>
			</Content>
		</>
	);
}
