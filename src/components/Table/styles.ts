import styled from "styled-components";

export const Container = styled.div`
	margin: 0 auto;
	max-width: 1080px;

	padding: 1rem;

	@media (max-width: 512px) {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-spacing: 0 0.5rem;

		th {
			color: var(--text-body);
			font-weight: 700;

			padding: 1rem 2rem;

			text-align: left;

			line-height: 1.5rem;
		}

		td {
			padding: 1rem 2rem;
			border: 0;
			background: var(--shape);

			color: var(--text-body);

			cursor: pointer;
		}
	}
`;
