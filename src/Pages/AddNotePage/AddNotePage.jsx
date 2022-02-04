import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import NoteActionForm from '../../Components/NoteActionForm/NoteActionForm';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './AddNotePage.css';

export default function AddNotePage() {
	const [addForm, setAddForm] = useState({ title: '', content: '' });
	const navigate = useNavigate();

	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);

	function add(e) {
		e.preventDefault();

		notebookProvider.add(addForm);

		navigate('./..');
	}

	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<NoteActionForm type="add" action={add} form={addForm} setForm={setAddForm} />
					</Row>
				</Container>
			</main>
		</div>
	);
}
