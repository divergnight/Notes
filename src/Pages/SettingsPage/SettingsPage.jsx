import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import './SettingsPage.css';

export default function SettingsPage() {
	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<Col>Hello world !</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
