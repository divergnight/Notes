import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Converter } from 'showdown';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import NoteActionForm from '../../Components/NoteActionForm/NoteActionForm';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './EditNotePage.css';

export default function EditNotePage() {
	const [editForm, setEditForm] = useState({ id: '', title: '', content: '', created: '' });
	const navigate = useNavigate();

	const converter = new Converter();

	const currentProvider = new CurrentProvider();
	const currentID = currentProvider.get();
	const notebookProvider = new NotebookProvider(currentID.notebook);

	useEffect(() => {
		notebookProvider.get().map(category => {
			category.notes.map(note => {
				if (note.id === currentID.note)
					setEditForm({ id: note.id, title: note.title, content: converter.makeMarkdown(note.content ? note.content : ''), created: note.created });
			});
		});
	}, []);

	function edit(e) {
		e.preventDefault();

		notebookProvider.edit(currentID.note, editForm);

		navigate('./..');
	}

	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<NoteActionForm type="edit" action={edit} form={editForm} setForm={setEditForm} />
					</Row>
				</Container>
			</main>
		</div>
	);
}
