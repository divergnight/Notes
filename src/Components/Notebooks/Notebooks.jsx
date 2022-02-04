import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import Notebook from '../Notebook/Notebook';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './Notebooks.css';
import IconListMode from '../Icons/IconListMode';
import IconGridMode from '../Icons/IconGridMode';

export default function Notebooks(props) {
	const notebooks = props.notebooks;
	const setNotebooks = props.setNotebooks;
	const search = props.search;

	const [filterNotebooks, setFilterNotebooks] = useState([]);
	const [display, setDisplay] = useState(false);

	const notebooksProvider = new NotebooksProvider();
	const displayProvider = new DisplayProvider();

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
		let tmp = notebooks.map(category => category.notebooks.filter(a => a.title.indexOf(search) != -1));
		setFilterNotebooks(tmp);
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

	return (
		<Container fluid id="Notebooks" className="app-container rounded-3">
			<Row>
				<div>
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
				{notebooks.map((category, catIdx) => (
					<Container key={category.id}>
						<Row>
							{!(category.name === 'any' && catIdx === 0) && (
								<>
									<h2>{category.name[0].toUpperCase() + category.name.substring(1)}</h2>
									<hr />
								</>
							)}
							{category.notebooks
								.sort((a, b) => a.title.localeCompare(b.title))
								.map(notebook => (
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
				))}
			</Row>
		</Container>
	);
}
