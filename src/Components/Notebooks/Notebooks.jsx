import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import Notebook from '../Notebook/Notebook';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import './Notebooks.css';

export default function Notebooks(props) {
	const notebooks = props.notebooks;
	const setNotebooks = props.setNotebooks;
	const search = props.search;

	const [filterNotebooks, setFilterNotebooks] = useState([]);

	const notebooksProvider = new NotebooksProvider();

	function load() {
		let datas = notebooksProvider.get();
		setNotebooks(datas);
	}

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		setFilterNotebooks(notebooks.filter(a => a.title.indexOf(search) != -1));
	}, [notebooks, search]);

	function add(e) {
		e.preventDefault();
		let input = document.getElementById('Notebooks-Add-Input');
		notebooksProvider.add({ title: input.value });
		input.value = '';
		input.focus();
		load();
	}

	return (
		<Container fluid id="Notebooks" className="app-container rounded-3">
			<Row>
				<Form onSubmit={e => add(e)}>
					<InputGroup id="Notebooks-Add">
						<FormControl id="Notebooks-Add-Input" placeholder="Add a notebook" />
						<Button type="submit">+</Button>
					</InputGroup>
				</Form>
			</Row>
			<Row>
				<h1>Notebooks</h1>
				<hr />
				{filterNotebooks
					.sort((a, b) => a.title.localeCompare(b.title))
					.map(notebook => (
						<Col key={notebook.id} xs={12} md={6} lg={4} xl={3} xxl={2}>
							<Notebook setNotebooks={setNotebooks} notebook={notebook}></Notebook>
						</Col>
					))}
			</Row>
		</Container>
	);
}
