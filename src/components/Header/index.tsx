import { Container, Content } from "./styles";

interface IHeaderProps {
	children: React.ReactNode;
}

export function Header({ children }: IHeaderProps) {
	return (
		<Container>
			<Content>{children}</Content>
		</Container>
	);
}
