import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import Note from '../Note/Note';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './Notes.css';
import IconListMode from '../Icons/IconListMode';
import IconGridMode from '../Icons/IconGridMode';
import { useLocation, useNavigate } from 'react-router-dom';
import IconBack from '../Icons/IconBack';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import IconSettings from '../Icons/IconSettings';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';

export default function Notes(props) {
	const notes = props.notes;
	const setNotes = props.setNotes;
	const search = props.search;

	const [filterNotes, setFilterNotes] = useState([]);
	const [display, setDisplay] = useState(false);

	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);
	const displayProvider = new DisplayProvider();

	const notebooksProvider = new NotebooksProvider();

	let title;
	notebooksProvider.get().map(notebook => {
		if (notebook.id === currentProvider.get().notebook) title = notebook.title;
	});

	const categoriesProvider = new CategoriesProvider();
	const categories = [...categoriesProvider.get()];

	const navigate = useNavigate();
	const location = useLocation();

	function load() {
		let datas = notebookProvider.get();
		setNotes(datas);
		datas = displayProvider.get();
		setDisplay(datas);
	}

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		let tmp = notes.filter(a => a.title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) != -1);
		setFilterNotes(tmp);
	}, [notes, search]);

	function changeDisplayMode() {
		let tmp = { ...display };
		tmp.mode = !tmp.mode;
		displayProvider.edit('mode', tmp.mode);
		setDisplay(tmp);
	}

	function redirect(path) {
		let currentProvider = new CurrentProvider();
		currentProvider.set('lastpath', location.pathname);
		navigate(path);
	}

	return (
		<Container fluid id="Notes" className="app-container rounded-3">
			<Row>
				<div>
					<span id="Notes-Settings" onClick={() => redirect('/settings')}>
						<IconSettings />
					</span>
					<span id="Notes-DisplayMode" onClick={changeDisplayMode}>
						{display.mode ? <IconGridMode /> : <IconListMode />}
					</span>
					<span id="Notes-Back" onClick={() => navigate('./..')}>
						<IconBack />
					</span>
					<Button variant="primary" onClick={() => redirect('./add')} id="Notes-Add">
						Add a note
					</Button>
				</div>
			</Row>
			<Row>
				<h1>{title}</h1>
				<hr />
				<div id="Notes-Result">
					{categories
						.filter(category => filterNotes.some(note => note.category === category.id))
						.sort((a, b) => b.id === '0' || a.name.localeCompare(b.name))

						.map((category, catIdx) => (
							<Container fluid key={category.id}>
								<Row>
									{!(category.id === '0' && catIdx === 0) && (
										<>
											<h2>{category.name[0].toUpperCase() + category.name.substring(1)}</h2>
											<hr />
										</>
									)}
									{filterNotes
										.sort((a, b) => a.title.localeCompare(b.title))
										.filter(a => a.category === category.id)
										.map(note => (
											<Col
												key={note.id}
												xs={12}
												md={display.mode ? 6 : 12}
												lg={display.mode ? 4 : 12}
												xl={display.mode ? 3 : 12}
												xxl={display.mode ? 2 : 12}
											>
												<Note setNotes={setNotes} note={note} display={display}></Note>
											</Col>
										))}
								</Row>
							</Container>
						))}
				</div>
			</Row>
		</Container>
	);
}
