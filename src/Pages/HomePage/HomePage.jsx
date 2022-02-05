import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notebooks from '../../Components/Notebooks/Notebooks';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './HomePage.css';

export default function HomePage() {
	const [search, setSearch] = useState('');
	const [notes, setNotes] = useState(0);
	const [notebooks, setNotebooks] = useState([]);

	function countNotes() {
		let count = 0;
		notebooks.map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			notebookProvider.get().map(category => {
				count += category.notes.length;
			});
		});
		return count;
	}

	return (
		<div>
			<AppNavbar notebooks={notebooks} search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notebooks notebooks={notebooks} setNotebooks={setNotebooks} search={search} />
						</Col>
						<Col md={4} lg={3} xl={3} xxl={2} className="order-first order-md-last">
							<Container fluid id="HomePage-Stats" className="app-container rounded-3">
								<h2>Stats</h2>
								<hr />
								<p>Number of notebooks : {notebooks.length}</p>
								<p>Number of notes : {countNotes()}</p>
							</Container>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
