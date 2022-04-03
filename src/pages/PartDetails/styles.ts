import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	button {
		border: none;
		margin-right: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;

		background: var(--green);

		display: flex;

		justify-content: center;
		align-items: center;

		&:first-child {
			color: var(--shape);
			font-size: 2rem;
		}

		&:hover {
			filter: brightness(0.9);
		}
	}
`;

export const Content = styled.div`
	margin: 0 auto;
	margin-top: -5rem;
	padding: 1rem;
	max-width: 1080px;

	div {
		background: var(--shape);
		padding: 1rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			color: var(--text-body);
			font-weight: 700;
			font-size: 3rem;
			margin: 1rem;
		}

		p {
			color: var(--text-body);
			font-weight: 400;
			font-size: 1.5rem;
			margin-top: 0.5rem;
		}
	}
`;
