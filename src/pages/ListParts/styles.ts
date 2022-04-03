import styled from "styled-components";

export const FiltersContainer = styled.div`
	margin: 0 auto;
	margin-top: -5rem;
	padding: 1rem;
	max-width: 1080px;
`;

export const Content = styled.div`
	padding: 4rem 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: var(--shape);

	position: relative;

	@media (max-width: 512px) {
		flex-direction: column;
	}

	table {
		@media (max-width: 512px) {
			overflow-x: scroll;
		}
	}

	p {
		position: absolute;
		top: 1.5rem;
		color: var(--text-body);
		font-weight: 700;
	}

	input,
	select,
	button {
		flex: 1;
		border: none;
		padding: 1rem;
		margin: 0.5rem;
		border-radius: 0.5rem;
		background: var(--background);
		color: var(--text-body);
	}

	button {
		&:hover {
			filter: brightness(0.9);
		}
	}

	option {
		background: var(--shape);
	}
`;
