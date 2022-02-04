import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import Note from '../Note/Note';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './Notes.css';
import IconListMode from '../Icons/IconListMode';
import IconGridMode from '../Icons/IconGridMode';
import { useNavigate } from 'react-router-dom';
import IconBack from '../Icons/IconBack';
import { CurrentProvider } from '../../Providers/CurrentProvider';

export default function Notes(props) {
	const notes = props.notes;
	const setNotes = props.setNotes;
	const search = props.search;

	const [filterNotes, setFilterNotes] = useState([]);
	const [display, setDisplay] = useState(false);

	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);
	const displayProvider = new DisplayProvider();

	const navigate = useNavigate();

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
		setFilterNotes(notes.filter(a => a.title.indexOf(search) != -1));
	}, [notes, search]);

	function add() {
		navigate('./add');
	}

	function changeDisplayMode() {
		let tmp = { ...display };
		tmp.mode = !tmp.mode;
		displayProvider.edit('mode', tmp.mode);
		setDisplay(tmp);
	}

	return (
		<Container fluid id="Notes" className="app-container rounded-3">
			<Row>
				<div>
					<span id="Notes-DisplayMode" onClick={changeDisplayMode}>
						{display.mode ? <IconGridMode /> : <IconListMode />}
					</span>
					<span id="Notes-Back" onClick={() => navigate('./..')}>
						<IconBack />
					</span>
					<Button variant="secondary" onClick={add} id="Notes-Add">
						Add a note
					</Button>
				</div>
			</Row>
			<Row>
				<h1>Notes</h1>
				<hr />
				{notes
					.sort((a, b) => a.title.localeCompare(b.title))
					.map((note, catIdx) => (
						<Col key={note.id} xs={12} md={display.mode ? 6 : 12} lg={display.mode ? 4 : 12} xl={display.mode ? 3 : 12} xxl={display.mode ? 2 : 12}>
							<Note setNotes={setNotes} note={note} display={display}></Note>
						</Col>
					))}
			</Row>
		</Container>
	);
}
