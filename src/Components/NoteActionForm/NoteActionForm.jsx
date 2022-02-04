import { useEffect, useState } from 'react';
import { Card, Form, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './NoteActionForm.css';
import { Converter } from 'showdown';

export default function NoteActionForm(props) {
	const [addForm, setAddForm] = useState({ title: '', content: '' });
	const action = props.action;

	const navigate = useNavigate();

	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);

	const converter = new Converter();

	function changeValue(key, e) {
		let tmp = { ...addForm };
		tmp[key] = e.target.value;
		setAddForm(tmp);

		let result = document.getElementById('NoteActionForm-Result');
		//result.innerHTML = converter.makeHtml(addForm.content);
	}

	return (
		<Card id="NoteActionForm-card">
			<Form>
				<Card.Header>
					<Card.Title>Add note</Card.Title>
				</Card.Header>
				<Card.Body>
					<Container fluid>
						<Row>
							<Col xxl={6}>
								<InputGroup className="mb-3">
									<InputGroup.Text>Title</InputGroup.Text>
									<FormControl placeholder="Enter note title" value={addForm.title} onChange={e => changeValue('title', e)} />
								</InputGroup>
								<InputGroup id="NoteActionForm-TextArea">
									<InputGroup.Text>Text</InputGroup.Text>
									<FormControl
										as="textarea"
										placeholder="Your Markdown code"
										value={addForm.content}
										onChange={e => changeValue('content', e)}
									/>
								</InputGroup>
							</Col>
							<Col xs={12} xxl={6}>
								<div id="NoteActionForm-Result">converter.makeHtml(addForm.content)</div>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Form>
		</Card>
	);
}
