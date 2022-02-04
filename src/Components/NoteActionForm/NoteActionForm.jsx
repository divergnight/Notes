import { useState } from 'react';
import { Card, Form, InputGroup, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './NoteActionForm.css';
import { Converter } from 'showdown';
import IconBack from '../Icons/IconBack';
import IconShow from '../Icons/IconShow';
import IconHide from '../Icons/IconHide';
import PreviewMarkdown from '../PreviewMarkdown/PreviewMarkdown';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';

export default function NoteActionForm(props) {
	const form = props.form;
	const setForm = props.setForm;
	const isAdd = props.type === 'add';
	const [isPreview, setIsPreview] = useState(false);
	const action = props.action;

	const navigate = useNavigate();

	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);
	const categories = notebookProvider.get();

	const converter = new Converter();
	const DOMPurify = require('dompurify')(window);

	function changeValue(key, e) {
		let tmp = { ...form };
		tmp[key] = e.target.value;
		setForm(tmp);
	}
	function preventXSS(e) {
		props.form.content = DOMPurify.sanitize(converter.makeHtml(form.content));
		action(e);
	}

	return (
		<Card id="NoteActionForm-card" style={{ width: isPreview ? '70%' : '90%' }}>
			<Form onSubmit={e => preventXSS(e)}>
				<Card.Header>
					<Card.Title id="NoteActionForm-title">{isAdd ? 'Add' : 'Edit'} note</Card.Title>
					<span id="NoteActionForm-Back" onClick={() => navigate('./..')}>
						<IconBack />
					</span>
					<span id="NoteActionForm-See-Preview" onClick={() => setIsPreview(!isPreview)}>
						{isPreview ? <IconHide /> : <IconShow />}
					</span>
				</Card.Header>
				{!isPreview && (
					<>
						<Card.Body>
							<Container fluid>
								<Row>
									<Col xxl={6}>
										<Container fluid className="mb-3" id="NoteActionForm-Form">
											<Row>
												<Col xs={7}>
													<InputGroup>
														<InputGroup.Text>Title</InputGroup.Text>
														<FormControl
															placeholder="Enter note title"
															value={form.title}
															onChange={e => changeValue('title', e)}
															required
														/>
													</InputGroup>
												</Col>
												<Col xs={5}>
													<InputGroup className="mb-3">
														<InputGroup.Text>Category</InputGroup.Text>
														<Form.Select aria-label="Default select example">
															{categories
																.sort((a, b) => a.name.localeCompare(b.name))
																.map(category => (
																	<option key={category.id} value={category.id}>
																		{category.name}
																	</option>
																))}
														</Form.Select>
													</InputGroup>
												</Col>
											</Row>
										</Container>
										<InputGroup id="NoteActionForm-TextArea">
											<InputGroup.Text>Text</InputGroup.Text>
											<FormControl
												as="textarea"
												placeholder="Your Markdown code"
												value={form.content}
												onChange={e => changeValue('content', e)}
												rows="20"
											/>
										</InputGroup>
									</Col>
									<Col xs={12} xxl={6}>
										<div id="NoteActionForm-Live-Preview">
											<PreviewMarkdown value={form.content} />
										</div>
									</Col>
								</Row>
							</Container>
						</Card.Body>
						<Card.Footer>
							<Button id="NoteActionForm-Save" type="submit">
								Save
							</Button>
							<Button variant="secondary" id="NoteActionForm-Cancel" as={Link} to="./..">
								Cancel
							</Button>
						</Card.Footer>
					</>
				)}
				{isPreview && (
					<div id="NoteActionForm-Preview">
						<PreviewMarkdown value={form.content} />
					</div>
				)}
			</Form>
		</Card>
	);
}
