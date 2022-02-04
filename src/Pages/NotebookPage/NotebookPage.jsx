import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notes from '../../Components/Notes/Notes';
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
		setNotes(notebookProvider.get());
	}, [, notebookID]);

	return (
		<div>
			<AppNavbar search={search} setSearch={setSearch} setNotebookID={setNotebookID} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notes notes={notes} setNotes={setNotes} search={search} />
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
