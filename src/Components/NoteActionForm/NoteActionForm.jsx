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
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';

export default function NoteActionForm(props) {
	const form = props.form;
	const setForm = props.setForm;
	const isAdd = props.type === 'add';
	const [isPreview, setIsPreview] = useState(false);
	const action = props.action;

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	const navigate = useNavigate();
	const currentProvider = new CurrentProvider();
	const origin = currentProvider.get().lastpath;

	const categoriesProvider = new CategoriesProvider();
	const categories = categoriesProvider.get();

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
		<Card
			id="NoteActionForm-card"
			style={{ width: isPreview ? '70%' : '90%' }}
			bg={display.theme}
			text={display.theme === 'dark' ? 'light' : 'dark'}
			border={'secondary'}
		>
			<Form onSubmit={e => preventXSS(e)}>
				<Card.Header>
					<Card.Title id="NoteActionForm-title">{isAdd ? 'Add' : 'Edit'} note</Card.Title>
					<span id="NoteActionForm-Back" onClick={() => navigate(origin)}>
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
												<Col xs={12} md={7} id="NoteActionForm-note-title">
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
												<Col xs={12} md={5}>
													<InputGroup className="mb-3">
														<InputGroup.Text>Category</InputGroup.Text>
														<Form.Select value={form.category} onChange={e => changeValue('category', e)}>
															{categories
																.sort((a, b) => b.id === '0' || a.name.localeCompare(b.name))
																.map(categ => (
																	<option key={categ.id} value={categ.id}>
																		{categ.name}
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
							<Button variant="secondary" id="NoteActionForm-Cancel" onClick={() => navigate(origin)}>
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
