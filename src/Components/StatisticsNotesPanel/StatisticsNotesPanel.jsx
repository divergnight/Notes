import { Card } from 'react-bootstrap';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import './StatisticsNotesPanel.css';

export default function StatisticsNotesPanel(props) {
	const notes = props.notes;

	const categoriesProvider = new CategoriesProvider();
	const categories = categoriesProvider.get();

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	function countNotesCategory(category) {
		let count = 0;
		notes.forEach(note => {
			if (note.category === category.id) count += 1;
		});
		return count;
	}

	function listNotesCategory() {
		let nb = 0;
		return categories
			.sort((a, b) => b.id === '0' || a.name.localeCompare(b.name))
			.map(category => {
				let count = countNotesCategory(category);
				if (count === 0) return null;
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
			id="StatisticsNotesPanel"
			className="app-container rounded-3"
			bg={display.theme}
			text={display.theme === 'dark' ? 'light' : 'dark'}
			border={'secondary'}
		>
			<Card.Header>Stats</Card.Header>
			<Card.Body id="StatisticsNotesPanel-text">
				<Card.Text>Number of notes : {notes.length}</Card.Text>
				<div id="StatisticsNotesPanel-Categories">{listNotesCategory()}</div>
			</Card.Body>
		</Card>
	);
}
