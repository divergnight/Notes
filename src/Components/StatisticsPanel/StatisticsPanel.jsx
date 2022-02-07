import { Card } from 'react-bootstrap';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import './StatisticsPanel.css';

export default function StatisticsPanel(props) {
	const notebooks = props.notebooks;

	const categoriesProvider = new CategoriesProvider();
	const categories = categoriesProvider.get();

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	function countNotes() {
		let count = 0;
		notebooks.map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			count += notebookProvider.get().length;
		});
		return count;
	}

	function countNotesCategory(category) {
		let count = 0;
		notebooks.map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			notebookProvider.get().map(note => {
				if (note.category === category.id) count += 1;
			});
		});
		return count;
	}

	function listNotesCategory() {
		let nb = 0;
		return categories
			.sort((a, b) => b.id === '0' || a.name.localeCompare(b.name))
			.map(category => {
				let count = countNotesCategory(category);
				if (count === 0) return;
				nb++;
				return (
					<span key={category.id}>
						{((category.id === '0' && nb--) || nb === 1) && <hr />}
						<Card.Text>{(category.id === '0' ? 'Uncategorized' : category.name) + ' : ' + count}</Card.Text>
					</span>
				);
			});
	}

	return (
		<Card
			id="StatisticsPanel"
			className="app-container rounded-3"
			bg={display.theme}
			text={display.theme === 'dark' ? 'light' : 'dark'}
			border={'secondary'}
		>
			<Card.Header>Stats</Card.Header>
			<Card.Body id="StatisticsPanel-text">
				<Card.Text>Number of notebooks : {notebooks.length}</Card.Text>
				<Card.Text>All notes : {countNotes()}</Card.Text>
				<div id="StatisticsPanel-Categories">{listNotesCategory()}</div>
			</Card.Body>
		</Card>
	);
}
