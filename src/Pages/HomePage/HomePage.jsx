import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notebooks from '../../Components/Notebooks/Notebooks';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './HomePage.css';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';

export default function HomePage() {
	const [search, setSearch] = useState('');
	const [notebooks, setNotebooks] = useState([]);

	const currentProvider = new CurrentProvider();

	const categoriesProvider = new CategoriesProvider();
	const categories = categoriesProvider.get();

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

	function countNotesCategory(category) {
		let count = 0;
		notebooks.map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			notebookProvider.get().map(note => {
				if (note.category === category.id) count += 1;
			});
		});
		return count;
	}

	function listNotesCategory() {
		let nb = 0;
		return categories
			.sort((a, b) => a.name.localeCompare(b.name))
			.map(category => {
				let count = countNotesCategory(category);
				if (count === 0) return;
				nb++;
				return (
					<span key={category.id}>
						{(nb === 1 || category.id === '0') && nb-- && <hr />}
						<Card.Text>{(category.id === '0' ? 'Uncategorized' : category.name) + ' : ' + count}</Card.Text>
					</span>
				);
			});
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
									<Card.Text>Number of notebooks : {notebooks.length}</Card.Text>
									<Card.Text>All notes : {countNotes()}</Card.Text>
									{listNotesCategory()}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
