import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notebooks from '../../Components/Notebooks/Notebooks';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './HomePage.css';
import { CurrentProvider } from '../../Providers/CurrentProvider';

export default function HomePage() {
	const [search, setSearch] = useState('');
	const [notes, setNotes] = useState(0);
	const [notebooks, setNotebooks] = useState([]);

	const currentProvider = new CurrentProvider();

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	useEffect(() => {
		currentProvider.del('note');
		currentProvider.del('notebook');
	}, []);

	function countNotes() {
		let count = 0;
		notebooks.map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			count += notebookProvider.get().length;
		});
		return count;
	}

	return (
		<>
			<AppNavbar notebooks={notebooks} search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notebooks notebooks={notebooks} setNotebooks={setNotebooks} search={search} />
						</Col>
						<Col md={4} lg={3} xl={3} xxl={2} className="order-first order-md-last">
							<Card
								id="HomePage-Stats"
								className="app-container rounded-3"
								bg={display.theme}
								text={display.theme === 'dark' ? 'light' : 'dark'}
								border={'secondary'}
							>
								<Card.Header>Stats</Card.Header>
								<Card.Body id="HomePage-stats-text">
									<p>Number of notebooks : {notebooks.length}</p>
									<p>Number of notes : {countNotes()}</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
