import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import IconBack from '../../Components/Icons/IconBack';
import IconEdit from '../../Components/Icons/IconEdit';
import PreviewMarkdown from '../../Components/PreviewMarkdown/PreviewMarkdown';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './PreviewNotePage.css';

export default function PreviewNotePage() {
	const navigate = useNavigate();
	var content;
	var title;

	const currentProvider = new CurrentProvider();
	const currentID = currentProvider.get();
	const notebookProvider = new NotebookProvider(currentID.notebook);
	notebookProvider.get().map(note => {
		if (note.id === currentID.note) {
			content = note.content;
			title = note.title;
		}
	});

	return (
		<div>
			<AppNavbar />
			<main>
				<Card id="PreviewNotePage-card">
					<Card.Header>
						<Card.Title id="PreviewNotePage-title">{title}</Card.Title>
						<span id="PreviewNotePage-Back" onClick={() => navigate('./..')}>
							<IconBack />
						</span>
						<span id="PreviewNotePage-Edit" onClick={() => navigate('./../edit')}>
							<IconEdit />
						</span>
					</Card.Header>
					<div id="PreviewNotePage-Preview">
						<PreviewMarkdown value={content} />
					</div>
				</Card>
			</main>
		</div>
	);
}