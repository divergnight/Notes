import { Card, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import IconBack from '../../Components/Icons/IconBack';
import IconEdit from '../../Components/Icons/IconEdit';
import PreviewMarkdown from '../../Components/PreviewMarkdown/PreviewMarkdown';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './PreviewNotePage.css';

export default function PreviewNotePage() {
	const navigate = useNavigate();
	const location = useLocation();
	var content;
	var title;

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	const currentProvider = new CurrentProvider();
	const currentID = currentProvider.get();
	const notebookProvider = new NotebookProvider(currentID.notebook);
	notebookProvider.get().map(note => {
		if (note.id === currentID.note) {
			content = note.content;
			title = note.title;
		}
	});

	function redirect(path) {
		let currentProvider = new CurrentProvider();
		currentProvider.set('lastpath', location.pathname);
		navigate(path);
	}

	return (
		<>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<Card id="PreviewNotePage-card" bg={display.theme} text={display.theme === 'dark' ? 'light' : 'dark'} border={display.theme}>
							<Card.Header>
								<Card.Title id="PreviewNotePage-title">{title}</Card.Title>
								<span id="PreviewNotePage-Back" onClick={() => navigate('./..')}>
									<IconBack />
								</span>
								<span id="PreviewNotePage-Edit" onClick={() => redirect('./../edit')}>
									<IconEdit />
								</span>
							</Card.Header>
							<div id="PreviewNotePage-Preview">
								<PreviewMarkdown value={content} />
							</div>
						</Card>
					</Row>
				</Container>
			</main>
		</>
	);
}
