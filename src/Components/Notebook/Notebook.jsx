import { Card, Row } from 'react-bootstrap';
import { DateConverter } from '../../Providers/DateConverter';
import './Notebook.css';

export default function Notebook(props) {
	let title = props.notebook.title;
	let created = props.notebook.created;
	const dateConverter = new DateConverter(created);

	return (
		<Card className="Notebook-card">
			<Card.Body>
				<Card.Title className="Notebook-title">{title}</Card.Title>
				<Card.Text className="Notebook-date text-muted">{dateConverter.get()}</Card.Text>
			</Card.Body>
		</Card>
	);
}
