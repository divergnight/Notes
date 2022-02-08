import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notes from '../../Components/Notes/Notes';
import StatisticsNotesPanel from '../../Components/StatisticsNotesPanel/StatisticsNotesPanel';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './NotebookPage.css';

export default function NotebookPage() {
	const [search, setSearch] = useState('');
	const [notes, setNotes] = useState([]);

	const currentProvider = new CurrentProvider();
	const [notebookID, setNotebookID] = useState(currentProvider.get().notebook);

	const notebookProvider = new NotebookProvider(notebookID);

	useEffect(() => {
		currentProvider.del('note');
	}, []);

	useEffect(() => {
		setNotes(notebookProvider.get());
	}, [, notebookID]);

	return (
		<>
			<AppNavbar search={search} setSearch={setSearch} setNotebookID={setNotebookID} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notes notes={notes} setNotes={setNotes} search={search} />
						</Col>
						<Col md={4} lg={3} xl={3} xxl={2} className="order-first order-md-last">
							<StatisticsNotesPanel notes={notes} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
