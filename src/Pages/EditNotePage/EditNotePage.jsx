import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import NoteActionForm from '../../Components/NoteActionForm/NoteActionForm';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './EditNotePage.css';

export default function EditNotePage() {
	const [editForm, setEditForm] = useState({ title: '', content: '' });
	const navigate = useNavigate();

	const currentProvider = new CurrentProvider();
	const notebookID = currentProvider.get().notebook;
	const notebookProvider = new NotebookProvider(notebookID);

	function edit(e) {
		e.preventDefault();

		notebookProvider.edit(notebookID, editForm);

		navigate('./..');
	}

	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<NoteActionForm action={edit} form={editForm} setForm={setEditForm} />
					</Row>
				</Container>
			</main>
		</div>
	);
}
