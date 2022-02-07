import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import Notebook from '../Notebook/Notebook';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './Notebooks.css';
import IconListMode from '../Icons/IconListMode';
import IconGridMode from '../Icons/IconGridMode';
import IconSettings from '../Icons/IconSettings';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentProvider } from '../../Providers/CurrentProvider';

export default function Notebooks(props) {
	const notebooks = props.notebooks;
	const setNotebooks = props.setNotebooks;
	const search = props.search;

	const [filterNotebooks, setFilterNotebooks] = useState([]);
	const [display, setDisplay] = useState(false);

	const notebooksProvider = new NotebooksProvider();
	const displayProvider = new DisplayProvider();

	const navigate = useNavigate();
	const location = useLocation();

	function load() {
		let datas = notebooksProvider.get();
		setNotebooks(datas);
		datas = displayProvider.get();
		setDisplay(datas);
	}

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		setFilterNotebooks(notebooks.filter(a => a.title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) != -1));
	}, [notebooks, search]);

	function add(e) {
		e.preventDefault();
		let input = document.getElementById('Notebooks-Add-Input');
		if (input.value.trim().length === 0) return;
		notebooksProvider.add({ title: input.value.trim() });
		input.value = '';
		input.focus();
		load();
	}

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
		<Container fluid id="Notebooks" className="app-container rounded-3">
			<Row>
				<div>
					<span id="Notebooks-Settings" onClick={() => redirect('/settings')}>
						<IconSettings />
					</span>
					<span id="Notebooks-DisplayMode" onClick={changeDisplayMode}>
						{display.mode ? <IconGridMode /> : <IconListMode />}
					</span>
					<Form onSubmit={e => add(e)} id="Notebooks-Add">
						<InputGroup>
							<FormControl id="Notebooks-Add-Input" placeholder="Add a notebook" maxLength="30" required />
							<Button type="submit">+</Button>
						</InputGroup>
					</Form>
				</div>
			</Row>
			<Row>
				<h1>Notebooks</h1>
				<hr />
				<Container fluid id="Notebooks-Result">
					<Row>
						{filterNotebooks
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((notebook, catIdx) => (
								<Col
									key={notebook.id}
									xs={12}
									md={display.mode ? 6 : 12}
									lg={display.mode ? 4 : 12}
									xl={display.mode ? 3 : 12}
									xxl={display.mode ? 2 : 12}
								>
									<Notebook setNotebooks={setNotebooks} notebook={notebook} display={display}></Notebook>
								</Col>
							))}
					</Row>
				</Container>
			</Row>
		</Container>
	);
}
