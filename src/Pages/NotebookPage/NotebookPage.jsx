import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notes from '../../Components/Notes/Notes';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './NotebookPage.css';

export default function NotebookPage() {
	const [search, setSearch] = useState('');
	const [notes, setNotes] = useState([]);

	const notebookProvider = new NotebookProvider(localStorage.getItem('currentNotebook'));

	useEffect(() => {
		setNotes(notebookProvider.get());
	}, []);

	return (
		<div>
			<AppNavbar search={search} setSearch={setSearch} />
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
